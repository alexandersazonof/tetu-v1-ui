import { VaultModel } from "@models";
import { ApyDetailsModel, ApyFullDetailsInfoModel, ApyFullDetailsModel, ApyModel } from "@models/apy.model";

export function calculateApyByVault(vault: VaultModel): ApyDetailsModel {

  const rewards = vault.rewardsApr.map(reward => calculateApy(reward / 10 ** 18))
  const autoCompound = vault.fullApr != 0 ? calculateApy(vault.fullApr) : undefined
  const tradingFee = vault.swapFeesAprDaily != 0 ? calculateApy(vault.swapFeesAprDaily) : undefined
  const underlying =
    vault.tokenUnderlyingApr && vault.tokenUnderlyingApr.total != 0
      ? calculateApy(vault.tokenUnderlyingApr.total)
      : undefined


  return new ApyDetailsModel(rewards, autoCompound, underlying, tradingFee)
}

export function calculateApy(apr: number, period = 12): ApyModel {
  if (apr == 0) {
    return new ApyModel(0, 0);
  }

  const apy = (Math.pow(1 + apr / 100 / period, period) - 1) * 100

  return new ApyModel(apr, apy);
}

export function calculateDetailsApy(vault: VaultModel): ApyFullDetailsModel {

  const autoCompound = calculateForPeriodApy(vault.ppfsAprYear / 10 ** 18, vault.ppfsAprMonth / 10 ** 18, vault.fullApr / 10 ** 18)
  const underlying = vault.underlyingVaults.map(underlying => calculateForPeriodApy(underlying.ppfsAprYear, underlying.ppfsAprMonth, underlying.fullApr))
  const tradingFee = calculateForPeriodApy(vault.swapFeesAprYearly, vault.swapFeesAprMonthly, vault.swapFeesAprDaily)

  return new ApyFullDetailsModel(autoCompound, underlying, tradingFee);
}

export function calculateForPeriodApy(year: number, month: number, current: number): ApyFullDetailsInfoModel {
  const yearApy = calculateApy(year, 365)
  const monthApy = calculateApy(month, 365)
  const currentApy = calculateApy(current, 365)

  return new ApyFullDetailsInfoModel(currentApy, monthApy, yearApy);
}
