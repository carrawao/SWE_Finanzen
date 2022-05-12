class UpdateStateChangesService {
  static updateStateChanges (assetData, activityObj) {
    let stateChanges = assetData.stateChanges;
    const previousStateObj = UpdateStateChangesService.findPreviousState(stateChanges, activityObj);
    //no previousState
    if (previousStateObj.index === -1) {
      //can only be a buy
      const stateChange = {quantity: activityObj.quantity, sum: activityObj.sum, realisedGains: 0, dividends: 0, taxes: activityObj.taxes, fees: activityObj.fees};
      stateChanges.unshift({date: activityObj.date, assetType: activityObj.assetType, quantity: 0, sum: 0, realisedGains: 0, dividends: 0, taxes: 0, fees: 0});
      stateChanges = UpdateStateChangesService.addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, 0);
      return [stateChanges, 0];
    }
    const quantityChange = activityObj.type === 'buy' ? activityObj.quantity : activityObj.type === 'sell' ? -activityObj.quantity : 0;
    let investedChange = activityObj.type === 'buy' ? activityObj.sum : 0;
    let realisedGains = activityObj.type === 'dividend' ? activityObj.sum : 0;
    let dividends = activityObj.type === 'dividend' ? activityObj.sum : 0;
    if (activityObj.type === 'sell') {
      investedChange = UpdateStateChangesService.calculateInvestedChange(assetData.buys, activityObj.quantity);
      realisedGains = (activityObj.sum + investedChange);
    }
    const stateChange = {quantity: quantityChange, sum: investedChange, realisedGains: realisedGains, dividends: dividends, taxes: activityObj.taxes, fees: activityObj.fees};
    //previous State is on the same date
    if (previousStateObj.overwrite) {
      stateChanges = UpdateStateChangesService.addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index);
      return [stateChanges, previousStateObj.index];
    } else {
      const newState = {...stateChanges[previousStateObj.index], date: activityObj.date};
      stateChanges.splice(previousStateObj.index+1, 0, newState);
      stateChanges = UpdateStateChangesService.addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index+1);
      return [stateChanges, previousStateObj.index+1];
    }
  }

  static updateStateChangesCash (assetData, activityObj) {
    let stateChanges = assetData.stateChanges;
    const previousStateObj = UpdateStateChangesService.findPreviousState(stateChanges, activityObj);
    //no previousState
    if (previousStateObj.index === -1) {
      //can only be a deposit
      const stateChange = {sum: activityObj.sum, quantity: 0, realisedGains: 0, taxes: activityObj.taxes, fees: activityObj.fees, dividends: 0};
      stateChanges.unshift({date: activityObj.date, assetType: activityObj.assetType, quantity: 1, sum: 0, realisedGains: 0, taxes: 0, fees: 0, dividends: 0});
      stateChanges = UpdateStateChangesService.addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, 0);
      return [stateChanges, 0];
    }
    const sumChange = activityObj.type === 'deposit' ? activityObj.sum : -activityObj.sum;
    const stateChange = {sum: sumChange, quantity: 0, realisedGains: 0, taxes: activityObj.taxes, fees: activityObj.fees, dividends: 0};
    //previous State is on the same date
    if (previousStateObj.overwrite) {
      stateChanges = UpdateStateChangesService.addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index);
      return [stateChanges, previousStateObj.index];
    } else {
      const newState = {...stateChanges[previousStateObj.index], date: activityObj.date};
      stateChanges.splice(previousStateObj.index+1, 0, newState);
      stateChanges = UpdateStateChangesService.addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index+1);
      return [stateChanges, previousStateObj.index+1];
    }
  }

  static findPreviousState (stateChanges, activityObj) {
    if (stateChanges.length === 0) {
      const returnObj = {index: -1, overwrite: false};
      return returnObj;
    }
    for (let index = 0; index < stateChanges.length; index++) {
      const state = stateChanges[index];
      const activityDate = new Date(activityObj.date);
      const stateDate = new Date(state.date);
      if (activityDate < stateDate) {
        //state before this state is the previous state
        const returnObj = {index: index-1, overwrite: false};
        return returnObj;
      } else if (activityDate.valueOf() === stateDate.valueOf()) {
        //this state is the previous state
        const returnObj = {index: index, overwrite: true};
        return returnObj;
      }
      if (index === (stateChanges.length-1)) {
        //if previous state wasn't found until the last state is reached then it must be the previous state
        const returnObj = {index: index, overwrite: false};
        return returnObj;
      }
    }
  }

  static addStateChangeToEachStateFromIndexOn (stateChange, stateChanges, index) {
    for (let i = index; i < stateChanges.length; i++) {
      let state = stateChanges[i];
      Object.keys(state).forEach(attribute => {
        if (attribute==='date' || attribute==='assetType') return; //equal to continue in forEach
        stateChanges[i][attribute] = state[attribute] + stateChange[attribute];
      });
    }
    return stateChanges;
  }

  static calculateInvestedChange (buys, quantity) {
    let investedChange = 0;
    for (let i = 0; i < buys.length; i++) {
      const buy = buys[i];
      let newQuantity = quantity - buy.quantity;
      if (newQuantity <= 0) {
        investedChange = investedChange - buy.price*quantity;
        return investedChange;
      } else {
        investedChange = investedChange - buy.price*buy.quantity;
        quantity = newQuantity;
      }
    }
  }
}

export default UpdateStateChangesService;
