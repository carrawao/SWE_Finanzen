class FindDependsOnService {
  static findDependsOn (buys, quantity) {
    let dependsOn = [];
    for (let index = 0; index < buys.length; index++) {
      const buy = buys[index];
      quantity -= buy.quantity;
      dependsOn.push(buy.id);
      if (quantity <= 0) {
        return dependsOn;
      }
    }
  }

  static findDependsOnCash (deposits, sum) {
    let dependsOn = [];
    for (let index = 0; index < deposits.length; index++) {
      const deposit = deposits[index];
      sum -= deposit.sum;
      dependsOn.push(deposit.id);
      if (sum <= 0) {
        return dependsOn;
      }
    }
  }
}

export default FindDependsOnService;