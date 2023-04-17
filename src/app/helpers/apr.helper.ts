import { GaugeVaultEntity, GaugeVaultReward, UserGauge, VaultEntity, VaultHistory, VeNftEntity } from '@generated/gql';
import { VaultActualInfoModel } from '@models/vault-actual-info.model';
import { DAY, YEAR } from '@shared/constants/number.constant';

const DEFAULT_VAULT_PERIOD = 3;

export function calculateVaultApr(vault: VaultEntity, info: VaultActualInfoModel): number {
  return calculateAutocompoundApr(vault.history, DEFAULT_VAULT_PERIOD, +info.sharePrice) + calculateRewardApr(vault);
}

export function calculateRewardApr(vault: VaultEntity) {
  let gaugeApr = 0;
  if (vault.gauges.length > 1) {
    throw new Error('MORE THAN 1 GAUGE FOR VAULT');
  }
  if (vault.gauges.length === 1) {
    gaugeApr = calculateGaugeApr(vault.gauges[0]);
  }
  return gaugeApr;
}

export function calculateAutocompoundAprDefault(vault: VaultEntity, info: VaultActualInfoModel): number {
  return calculateAutocompoundApr(vault.history, DEFAULT_VAULT_PERIOD, +info.sharePrice);
}

export function calculateAutocompoundApr(
  historyArray: readonly VaultHistory[],
  periodDays: number,
  actualSharePrice: number,
): number {
  if (historyArray.length < 2) {
    return 0;
  }

  const h = (historyArray as VaultHistory[]).sort((a, b) => b.time - a.time);

  const currentSharePrice = actualSharePrice;
  const currentTime = Math.floor(Date.now() / 1000);
  const timeEnd = getCurrentTime() - DAY * periodDays;
  let prevSharePrice = 0;
  let prevTime = 0;

  // find the most early data
  for (let i = 0; i < h.length; i++) {
    const history = h[i];
    prevSharePrice = parseFloat(history.sharePrice);
    prevTime = history.time;
    // console.log('HISTORY prevSharePrice', prevSharePrice, new Date(prevTime * 1000));
    if (history.time < timeEnd) {
      break;
    }
  }
  const timeDiff = currentTime - prevTime;
  const sharePriceDiff = currentSharePrice - prevSharePrice;

  if (timeDiff === 0) {
    return 0;
  }

  // console.log('HISTORY timeDiff', timeDiff / 60 / 60);
  // console.log('HISTORY sharePriceDiff', sharePriceDiff);

  return ((sharePriceDiff / prevSharePrice) * YEAR * 100) / timeDiff;
}

export function calculateGaugeApr(gauge: GaugeVaultEntity): number {
  let aprSum = 0;
  for (let i = 0; i < gauge.rewards.length; i++) {
    const rt = gauge.rewards[i];
    const startTime = Math.floor(Date.now() / 1000);
    const profit = +rt.left * +rt.rewardTokenPrice;
    const apr = calculateApr(startTime, rt.periodFinish, profit, +gauge.totalDerivedSupply * +gauge.asset.usdPrice);
    aprSum += apr;
  }
  return aprSum;
}

export function calculateApr(timeStart: number, timeEnd: number, profit: number, positionAmount: number) {
  const period = timeEnd - timeStart;
  if (period <= 0 || positionAmount === 0) {
    return 0;
  }
  return (profit / positionAmount / (period / (60 * 60 * 24))) * 36500;
}

export function calculateBribeApr(vault: VaultEntity): number {
  return vault.bribes.length === 1 ? vault.bribes[0].rewards.reduce((a, b) => a + parseFloat(b.apr), 0) : 0;
}

export function calculateBribeAmount(vault: VaultEntity): number {
  return vault.bribes.length === 1 ? vault.bribes[0].rewards.reduce((a, b) => a + parseFloat(b.left), 0) : 0;
}

export function getCurrentTime(): number {
  return Math.floor(new Date().getTime() / 1000);
}

export function calculateBoostedAprDataForVault(
  veNFTEntity: VeNftEntity,
  vault: VaultEntity,
  userGauge: UserGauge,
  vePower: number,
) {
  if (vault && veNFTEntity && userGauge) {
    const veRatio = vePower / parseFloat(veNFTEntity.ve.totalSupply);
    const userGaugeBalance = parseFloat(userGauge.stakedBalance);
    const assetPrice = parseFloat(vault.assetPrice);
    const gaugeTotalSupply = parseFloat(userGauge.gaugeVault.totalSupply);
    const gaugeTotalDerivedSupply = parseFloat(userGauge.gaugeVault.totalDerivedSupply);

    return calculateBoostedAprData(
      vault.gauges[0]?.rewards ?? [],
      veRatio,
      userGaugeBalance,
      assetPrice,
      gaugeTotalSupply,
      gaugeTotalDerivedSupply,
    );
  } else {
    return { personalAPR: 0, aprWithoutBoost: 0 };
  }
}

export function calculateBoostedAprData(
  rts: readonly GaugeVaultReward[],
  veRatio: number,
  userGaugeBalance: number,
  assetPrice: number,
  gaugeTotalSupply: number,
  gaugeTotalDerivedSupply: number,
) {
  const userGaugeBalanceUsd = userGaugeBalance * assetPrice;
  const userGaugeBaseBalance = userGaugeBalance * 0.4;
  const totalSupplyBase = gaugeTotalSupply * 0.6;
  const userGaugeBonusBalance = totalSupplyBase * veRatio;
  const userFullDerivedBalance = userGaugeBonusBalance + userGaugeBaseBalance;
  const userGaugeDerivedBalance = userFullDerivedBalance > userGaugeBalance ? userGaugeBalance : userFullDerivedBalance;
  const userGaugeDerivedBalanceUSD = userGaugeDerivedBalance * assetPrice;
  const totalDerivedSupplyUsd = gaugeTotalDerivedSupply * assetPrice;
  let personalAPR = 0;
  let aprWithoutBoost = 0;
  for (const rt of rts) {
    const startTime = Math.floor(Date.now() / 1000);
    const rewardsLeftUSD = parseFloat(rt.leftUSD);

    const userPartOfRewards = (rewardsLeftUSD * userGaugeDerivedBalanceUSD) / totalDerivedSupplyUsd;
    const _personalAPR = calculateApr(startTime, rt.periodFinish, userPartOfRewards, userGaugeBalanceUsd);

    const baseBalanceUSD = userGaugeBaseBalance * assetPrice;
    const userPartOfRewardsWithoutBoost = (rewardsLeftUSD * baseBalanceUSD) / totalDerivedSupplyUsd;
    const _aprWithoutBoost = calculateApr(
      startTime,
      rt.periodFinish,
      userPartOfRewardsWithoutBoost,
      userGaugeBalanceUsd,
    );

    personalAPR += _personalAPR;
    aprWithoutBoost += _aprWithoutBoost;
  }
  return { personalAPR, aprWithoutBoost };
}
