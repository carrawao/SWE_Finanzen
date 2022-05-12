class DailyDataArraysService {
	static async updateDailyDataArrays (assetData, stateChanges, newStateIndex, activityObj) {
    const stateChangesForUpdate = stateChanges.slice(newStateIndex);
    const dailyValues = await this.fetchDailyValues(activityObj.asset, activityObj.assetType);
    let dailyDataForValueDevelopment = {...assetData.dailyDataForValueDevelopment}
    await stateChangesForUpdate.forEach((state, index) => {
      const cutOffDate = stateChangesForUpdate[index+1] ? stateChangesForUpdate[index+1].date : undefined;
      const stateDailyData = this.createDailyDataForValueDevelopment(dailyValues, state, cutOffDate);
      dailyDataForValueDevelopment = {...dailyDataForValueDevelopment, ...stateDailyData};
    });
    const dailyDataForPerformanceGraph = this.createDailyDataForPerformanceGraph(dailyDataForValueDevelopment);
    const dailyDataArrays = {
      dailyDataForValueDevelopment: dailyDataForValueDevelopment,
      dailyDataForPerformanceGraph: dailyDataForPerformanceGraph
    }
    return dailyDataArrays;
  }

  static updateDailyDataForValueDevelopmentCash (assetData, stateChanges, newStateIndex) {
    const stateChangesForUpdate = stateChanges.slice(newStateIndex);
    let dailyDataForValueDevelopment = {...assetData.dailyDataForValueDevelopment};
    for (let index = 0; index < stateChangesForUpdate.length; index++) {
      const state = stateChangesForUpdate[index];
      const cutOffDate = stateChangesForUpdate[index+1] ? stateChangesForUpdate[index+1].date : undefined;
      const stateDailyData = this.createDailyDataForValueDevelopment({'1900-01-01': {value: state.sum}}, state, cutOffDate);
      dailyDataForValueDevelopment = {...dailyDataForValueDevelopment, ...stateDailyData};
    }
    return dailyDataForValueDevelopment;
  }

  static async createDailyDataArrays (activityObj) {
    const dailyValues = await this.fetchDailyValues(activityObj.asset, activityObj.assetType);
    const dailyDataForValueDevelopment = this.createDailyDataForValueDevelopment(dailyValues, activityObj);
    const dailyDataForPerformanceGraph = this.createDailyDataForPerformanceGraph(dailyDataForValueDevelopment);
    const dailyDataArrays = {
      dailyDataForValueDevelopment: dailyDataForValueDevelopment,
      dailyDataForPerformanceGraph: dailyDataForPerformanceGraph
    }
    return dailyDataArrays;
  }
  
  static createDailyDataForValueDevelopment(dailyValues, state, cutOffDate) {
    if (cutOffDate === undefined) {
      const today = new Date();
      cutOffDate = today.getFormattedString();
    }

    let dailyValueKeys = Object.keys(dailyValues);
    let startDate = state.date;

    //check if state.date is smaller than smallest dailyValue from api
    if (new Date(dailyValueKeys[dailyValueKeys.length-1]) > new Date(state.date)) {
      startDate = dailyValueKeys[dailyValueKeys.length-1];
    }

    let dailyDataKeys = this.createDailyKeys(startDate, cutOffDate);
    
    let dailyDataForValueDevelopment = {};
    dailyDataKeys.forEach((key, index) => {
      let dateData = dailyValues[key];
      if (dateData === undefined) {
        //take data from most previous date with data to key
        for (let i = 0; i < dailyValueKeys.length; i++) {
          if (new Date(key) > new Date(dailyValueKeys[i])) {
            dateData = dailyValues[dailyValueKeys[i]];
            break;
          }
        }
      }
      const value = dateData[state.assetType === 'crypto' ? '4a. close (EUR)' : state.assetType === 'share' ? '4. close' : 'value']*state.quantity;
      const invested = state.sum;
      const gains = value - invested;
      const realisedGains = state.realisedGains ? -state.fees + state.realisedGains : -state.fees;
      const dividends = state.dividends ? state.dividends : 0;
      
      dailyDataForValueDevelopment[key] = {
        value: value,
        quantity: state.quantity,
        invested: invested,
        gains: gains,
        realisedGains: realisedGains,
        totalGains: gains+realisedGains,
        taxes: state.taxes,
        fees: state.fees,
        dividends: dividends
      }
    });
    return dailyDataForValueDevelopment;
  }

  static createDailyKeys (startDateString, cutOffDateString) {
    let dailyKeys = [];
    let currentDate = new Date(startDateString);
    const cutOffDate = new Date(cutOffDateString);
    if (currentDate.getTime() === cutOffDate.getTime()) {
      currentDate = currentDate.addDays(-1);
    }
    while (currentDate < cutOffDate) {
      dailyKeys.push(currentDate.getFormattedString());
      currentDate = currentDate.addDays(1);
    }
    return dailyKeys.reverse();
  }

  static createDailyDataForPerformanceGraph (dailyDataForValueDevelopment) {
    const dailyDataKeys = Object.keys(dailyDataForValueDevelopment);
    const dailyDataForPerformanceGraph = {};
    dailyDataKeys.forEach((key) => {
      const dailyDataFVD = dailyDataForValueDevelopment[key];
      const performanceWithRealisedGains = dailyDataFVD.invested !== 0 ? (dailyDataFVD.gains/dailyDataFVD.invested)*100 : 0;
      const performanceWithoutRealisedGains = dailyDataFVD.invested !== 0 ? (dailyDataFVD.gains/dailyDataFVD.invested)*100 : 0;
      dailyDataForPerformanceGraph[key] = {
        performanceWithRealisedGains: performanceWithRealisedGains,
        performanceWithoutRealisedGains: performanceWithoutRealisedGains
      }
    });
    return dailyDataForPerformanceGraph;
  }

  /**
   * Retrieves daily values of assets
   * @param symbol
   * @param assetType
   * @returns {Promise<any>}
   */
   static async fetchDailyValues (symbol, assetType){
    const fetchFunc = assetType === 'crypto' ? 'dailyCrypto' : 'dailyShare';
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/${fetchFunc}?symbol=${symbol}`, {mode:'cors'})
        const json = await response.json();
        let results = json[assetType === 'crypto' ? 'Time Series (Digital Currency Daily)' : 'Time Series (Daily)'];
        return results;
    } catch (e) {
      console.log('fetching failed === ', e);
    }
  }
}

Date.prototype.getFormattedString = function() {
  const date = new Date(this.valueOf());
  const year = date.getFullYear();
  let month = `${date.getMonth()+1}`;
  if (month.length === 1) {
    month = `0${month}`;
  }
  let day = `${date.getDate()}`;
  if (day.length === 1) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export default DailyDataArraysService;
