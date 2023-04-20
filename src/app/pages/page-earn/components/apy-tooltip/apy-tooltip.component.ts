import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApyDetailsModel } from "@models/apy.model";
import { VaultModel } from "@models";
import { calculateApy, calculateApyByVault } from "@helpers/apr.helper";
import { getAdditionalDescription, numberToCompact } from "@helpers";
import { getIcon } from "@constants/icons/icons";
import { TokenService } from "@services/onchain/token.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@tetu_io/tetu-ui";
import { getDescriptionByVault } from "@helpers/description.helper";

@Component({
  selector: 'tetu-apy-tooltip',
  templateUrl: './apy-tooltip.component.html',
  styleUrls: ['./apy-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ApyTooltipComponent implements OnInit {
  @Input() vault: VaultModel | undefined;
  @Input() chainId = 137;
  @Input() account = '';

  apy: ApyDetailsModel | undefined;
  rewardTokenNames: string[] = []

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private destroy$: DestroyService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getApy();
    this.getRewardTokeName();
  }

  getRewardTokeName(): void {
    if (this.vault) {
      this.vault.rewardTokens.forEach(reward => {
        this.tokenService.name$(this.account, reward)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this.rewardTokenNames.push(result);
            this.changeDetectorRef.detectChanges();
          })
      })
    }
  }

  getApy(): void {
    if (this.vault) {
      this.apy = calculateApyByVault(this.vault)
    }
  }

  canShowApyAutoCompound(): boolean {
    if (this.apy && this.apy.autoCompound) {
      return this.apy.autoCompound.apy > 0
    }
    return false
  }

  canShowUnderlyingApy(): boolean {
    if (this.apy && this.apy.underlying) {
      return this.apy.underlying.apy > 0
    }
    return false
  }

  canShowTradingFeeApy(): boolean {
    if (this.apy && this.apy.tradingFee) {
      return this.apy.tradingFee.apy > 0
    }
    return false
  }

  canShowApyReward(): boolean {
    if (this.apy) {
      return this.apy.rewards.filter(i => i.apy > 0).length > 0
    }
    return false;
  }

  formatNumber(value: number | undefined): string {
    if (value) {
      return numberToCompact(value, 2)
    }
    return '0';
  }

  getTotalApy(): string {
    if (this.apy) {
      return numberToCompact(this.apy.getSumApy(), 2)
    }
    return '0';
  }

  getTotalApr(): string {
    if (this.apy) {
      return numberToCompact(this.apy.getSumApr(), 2)
    }
    return '0';
  }

  getIcon(address: string): string {
    return getIcon(this.chainId, address)
  }

  canShowRewardIcon(index: number): boolean {
    if (this.vault && this.vault.rewardsApr[index] > 0) {
      return true;
    }
    return false;
  }

  getAprForRewardToken(index: number): string {
    if (this.vault && this.vault.rewardsApr[index] > 0) {
      return numberToCompact(this.vault.rewardsApr[index] / 10 ** 18, 2)
    }

    return '0;'
  }

  getApyForRewardToken(index: number): string {
    if (this.vault && this.vault.rewardsApr[index] > 0) {
      return numberToCompact(calculateApy(this.vault.rewardsApr[index] / 10 ** 18).apy, 2)
    }

    return '0;'
  }

  getDescription(): string | null {
    if (this.vault) {
      return getDescriptionByVault(this.vault, this.chainId);
    }
    return null;
  }

  getAdditionalDescription(): string | null {
    if (this.vault) {
      return  getAdditionalDescription(this.vault, this.chainId);
    }
    return null;
  }
}
