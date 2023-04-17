import { StrategyEntity } from '@generated/gql';
import { formatAddress, prettyNumber } from '@helpers';

export class StrategyModel {
  strategyEntity: StrategyEntity;
  tvlAllocationPercentFormatted: string;
  compoundRatioFormatted: string;
  tvlFormatted: string;
  tvlFormattedUSD: string;
  aprFormatted: string;
  aprAvgFormatted: string;
  profitFormatted: string;
  lossFormatted: string;
  strategyAddressFormatted: string;
  vaultAddressFormatted: string;
  splitterAddressFormatted: string;
  lastHWAgo: string;

  constructor(strategyEntity: StrategyEntity) {
    this.strategyEntity = strategyEntity;
    this.tvlAllocationPercentFormatted = prettyNumber(
      Number((+strategyEntity.tvl / +strategyEntity.splitter.vault.totalAssets) * 100),
    );
    this.compoundRatioFormatted = prettyNumber(Number(strategyEntity.compoundRatio));
    this.tvlFormatted = prettyNumber(Number(strategyEntity.tvl));
    this.tvlFormattedUSD = prettyNumber(Number(strategyEntity.tvl) * Number(strategyEntity.asset.usdPrice));
    this.aprFormatted = prettyNumber(Number(strategyEntity.apr));
    this.aprAvgFormatted = prettyNumber(Number(strategyEntity.averageApr));
    this.profitFormatted = prettyNumber(Number(strategyEntity.profit));
    this.lossFormatted = prettyNumber(Number(strategyEntity.loss));
    this.strategyAddressFormatted = formatAddress(strategyEntity.id);
    this.vaultAddressFormatted = formatAddress(strategyEntity.splitter.vault.id);
    this.splitterAddressFormatted = formatAddress(strategyEntity.splitter.id);
    this.lastHWAgo =
      strategyEntity.lastHardWork === 0
        ? 'Never'
        : ((Date.now() / 1000 - strategyEntity.lastHardWork) / 60 / 60 / 24).toFixed(1) + ' days ago';
  }
}
