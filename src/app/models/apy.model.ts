
export class ApyDetailsModel {
  rewards: ApyModel[] = [];

  autoCompound: ApyModel | undefined;
  underlying: ApyModel | undefined;
  tradingFee: ApyModel | undefined;

  constructor(rewards: ApyModel[], autoCompound: ApyModel | undefined, underlying: ApyModel | undefined, tradingFee: ApyModel | undefined) {
    this.rewards = rewards;
    this.autoCompound = autoCompound;
    this.underlying = underlying;
    this.tradingFee = tradingFee;
  }


  getSumApy(): number {
    let total = 0;
    if (this.autoCompound) {
      total += this.autoCompound.apy;
    }

    if (this.underlying) {
      total += this.underlying.apy;
    }

    if (this.tradingFee) {
      total += this.tradingFee.apy;
    }

    if (this.rewards.length > 0) {
      this.rewards.forEach(i => total += i.apy)
    }
    return total
  }

  getSumApr(): number {
    let total = 0;
    if (this.autoCompound) {
      total = this.autoCompound.apr;
    }

    if (this.underlying) {
      total = Number(total) + Number(this.underlying.apr);
    }

    if (this.tradingFee) {
      total = Number(this.tradingFee.apr) + Number(total);
    }

    if (this.rewards.length > 0) {
      this.rewards.forEach(i => total = Number(i.apr) + Number(total))
    }

    return total
  }
}

export class ApyModel {
  apr: number = 0;
  apy: number = 0;

  constructor(apr: number,apy: number) {
    this.apy = apy;
    this.apr = apr
  }
}


export class ApyFullDetailsModel {
  autoCompound: ApyFullDetailsInfoModel;
  underlying: ApyFullDetailsInfoModel[] = [];
  tradingFee: ApyFullDetailsInfoModel;

  constructor(autoCompound: ApyFullDetailsInfoModel, underlying: ApyFullDetailsInfoModel[], tradingFee: ApyFullDetailsInfoModel) {
    this.autoCompound = autoCompound;
    this.underlying = underlying;
    this.tradingFee = tradingFee;
  }
}

export class ApyFullDetailsInfoModel {
  current: ApyModel;
  month: ApyModel;
  year: ApyModel;

  constructor(current: ApyModel, month: ApyModel, year: ApyModel) {
    this.current = current;
    this.month = month;
    this.year = year;
  }
}
