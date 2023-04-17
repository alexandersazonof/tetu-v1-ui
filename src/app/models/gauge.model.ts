import { GaugeVaultEntity } from '@generated/gql';

import { AmountModel } from './amount.model';

export class GaugeModel {
  gaugeEntity: GaugeVaultEntity;
  rewards: AmountModel[];

  constructor(gaugeEntity: GaugeVaultEntity, rewards: AmountModel[]) {
    this.gaugeEntity = gaugeEntity;
    this.rewards = rewards;
  }
}
