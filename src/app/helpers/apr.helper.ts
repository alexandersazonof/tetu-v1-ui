import { VaultModel } from "@models";
import { ApyDetailsModel, ApyModel } from "@models/apy.model";

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
