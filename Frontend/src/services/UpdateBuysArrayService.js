class UpdateBuysArrayService {
  static updateBuysArray (oldBuys, activityObj) {
    let newBuys = oldBuys;
    if (activityObj.type === "buy") {
      newBuys = UpdateBuysArrayService.addToBuysArray(oldBuys, activityObj);
    } else if (activityObj.type === "sell") {
      newBuys = UpdateBuysArrayService.deleteFromBuysArray(oldBuys, activityObj.quantity);
    }
    console.log("newBuys", newBuys)
    return newBuys;
  }

  static addToBuysArray (buys, activityObj) {
    buys.push({id: activityObj.id, date: activityObj.date, price: activityObj.value, quantity: activityObj.quantity});
    buys.sort((buy1, buy2) => new Date(buy1.date) - new Date(buy2.date));
    return buys;
  }

  static deleteFromBuysArray (buys, quantity) {
    const buysInitialLength = buys.length;
    for (let index = 0; index < buysInitialLength; index++) {
      //we work with the first buy in every iteration (because we only get to the next iteration when the original first buy in the array is deleted)
      const buy = buys[0];
      if (buy.quantity <= quantity) {
        quantity -= buy.quantity;
        buys.shift();
        if(quantity === 0) {
          return buys;
        }
      } else {
        buys[0].quantity = buys[0].quantity - quantity;
        return buys;
      }
    }
  }
}

export default UpdateBuysArrayService;