class UpdateDepositsArrayService {
  static updateDepositsArray (oldDeposits, activityObj) {
    let newDeposits = oldDeposits;
    if (activityObj.type === "deposit") {
      newDeposits = UpdateDepositsArrayService.addToDepositsArray(oldDeposits, activityObj);
    } else if (activityObj.type === "payout") {
      newDeposits = UpdateDepositsArrayService.deleteFromDepositsArray(oldDeposits, activityObj.sum);
    }
    console.log("newDeposits", newDeposits)
    return newDeposits;
  }

  static addToDepositsArray (deposits, activityObj) {
    deposits.push({id: activityObj.id, date: activityObj.date, sum: activityObj.sum});
    deposits.sort((deposit1, deposit2) => new Date(deposit1.date) - new Date(deposit2.date));
    return deposits;
  }

  static deleteFromDepositsArray (deposits, sum) {
    const depositsInitialLength = deposits.length;
    for (let index = 0; index < depositsInitialLength; index++) {
      //we work with the first buy in every iteration (because we only get to the next iteration when the original first buy in the array is deleted)
      const deposit = deposits[0];
      if (deposit.sum <= sum) {
        sum -= deposit.sum;
        deposits.shift();
        if(sum === 0) {
          return deposits;
        }
      } else {
        deposits[0].sum = deposits[0].sum - sum;
        return deposits;
      }
    }
  }
}

export default UpdateDepositsArrayService;