import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VaultDataService } from "@services/data/vault-data.service";
import { VaultModel } from "@models";
import { BN_ZERO, DestroyService, ProviderService } from "@tetu_io/tetu-ui";
import { takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { TokenService } from "@services/onchain/token.service";
import { BN_MAX_UINT } from "@constants";
import { formatUnits } from "ethers/lib/utils";
import { prettyNumber } from "@helpers";
import { FormControl } from "@angular/forms";
import { DepositService } from '@services/onchain/deposit.service';
import { BigNumber } from "ethers";
import { VaultService } from '@services/onchain/vault.service';
import { getCoreAddresses } from "@constants/addresses";

@Component({
  selector: 'tetu-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class VaultComponent implements OnInit {

  vault: VaultModel | undefined;
  account: string | undefined;
  isApproved = false;
  chainId = 0;
  underlyingBalance = 0;
  vaultBalance = 0;
  inputDepositControl = new FormControl(0);
  inputWithdrawControl = new FormControl(0);
  rewardsUsdc = 0;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private destroy$: DestroyService,
    private vaultDataService: VaultDataService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private providerService: ProviderService,
    private depositService: DepositService,
    private vaultService: VaultService,
  ) {
  }

  ngOnInit(): void {
    this.providerService.subscribeOnAccountAndNetwork(
      this.destroy$ as never,
      this.changeDetectorRef,
      account => {
        this.account = account;
        this.loadInitData();
      },
      chainId => {
        this.chainId = chainId;
        this.loadInitData();
      }
    )
  }

  loadInitData(): void {
    this.vaultDataService.activeVaultObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe(vault => {
        if (vault) {
          this.vault = vault;
          this.getUnderlyingBalance()
          this.getUnderlyingDecimals()
          this.getVaultBalance()
          this.getRewards()
          this.checkIsApproved()
        } else {
          const address = this.route.snapshot.paramMap.get('vault')
          this.vaultDataService.vaultsObservable
            .pipe(takeUntil(this.destroy$))
            .subscribe(vaults => {
              if (vaults.length != 0 && !this.vault && address != null) {
                this.vault = vaults.find(vault => vault.addr.toLowerCase() == address?.toLowerCase())
                this.checkIsApproved()
                this.getUnderlyingBalance()
                this.getUnderlyingDecimals()
                this.getVaultBalance()
                this.getRewards()
                this.changeDetectorRef.detectChanges();
              }
            });
        }
        this.changeDetectorRef.detectChanges();
      })
  }

  getUnderlyingBalance(): void {
    if (this.vault && this.account) {
      this.tokenService.balanceOf$(this.account, this.vault.underlying, this.account)
        .pipe(takeUntil(this.destroy$))
        .subscribe(underlyingBalance => {
          // TODO can switch to numberToCompact
          this.underlyingBalance = +prettyNumber(+formatUnits(underlyingBalance, this.vault?.decimals));
          this.changeDetectorRef.detectChanges();
        })
    }
  }

  getVaultBalance(): void {
    if (this.vault && this.account) {
      this.tokenService.balanceOf$(this.account, this.vault.addr, this.account)
        .pipe(takeUntil(this.destroy$))
        .subscribe(balance => {
          if (this.vault && balance) {
            this.vault.userBalance = +balance.toString()
            this.vaultBalance = this.vault?.userBalance / 10 ** this.vault?.decimals
          }
        })
    }
  }

  getUnderlyingDecimals(): void {
    if (this.vault && this.account) {
      this.tokenService.decimals$(this.account, this.vault.underlying)
        .pipe(takeUntil(this.destroy$))
        .subscribe(decimals => {
          if (decimals && this.vault) {
            this.vault.underlyingDecimals = decimals
          }
        })
    }
  }

  getRewards(): void {
    if (this.vault && this.account) {
      this.vaultService.userRewardsBoostUsdc$(this.account, this.vault.addr, this.chainId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          if (result) {
            this.rewardsUsdc = 0
            result.forEach(reward => {
              this.rewardsUsdc += +reward.toString() / 10 ** (18)
            })
            this.rewardsUsdc = +this.rewardsUsdc.toFixed(2)
            this.changeDetectorRef.detectChanges();
          }
        })
    }
  }

  checkIsApproved(): void {
    if (this.vault && this.account) {
      this.tokenService.allowance$(this.vault.underlying, this.account, getCoreAddresses(this.chainId).depositHelper)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.isApproved = !result.isZero();
          this.changeDetectorRef.detectChanges();
        })
    }
  }

  onApprove(): void {
    if (this.vault && this.account) {
      const amount = BN_MAX_UINT
      this.tokenService.approve$(this.account, this.vault.underlying, getCoreAddresses(this.chainId).depositHelper, amount)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.changeDetectorRef.detectChanges();
          }
          // TODO error
        )
    }
  }

  onDeposit(): void {
    if (this.vault && this.account && this.isApproved) {
      const amount = this.inputDepositControl.value
      if (amount && amount > 0 && amount <= this.underlyingBalance) {
        this.depositService.depositToVault$(this.account, this.vault, BigNumber.from(amount).mul(BigNumber.from(10).pow(this.vault.underlyingDecimals)), this.chainId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this.changeDetectorRef.detectChanges();
          })
      }
    }
  }

  onWithdraw(): void {
    if (this.vault && this.account) {
      const amount = this.inputWithdrawControl.value
      if (amount && amount > 0 && amount <= this.vaultBalance) {
        this.vaultService.withdraw$(this.account, this.vault, BigNumber.from(amount).mul(BigNumber.from(10).pow(this.vault.decimals)), this.chainId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this.changeDetectorRef.detectChanges();
          })
      }
    }
  }

  onExit(): void {
    if (this.vault && this.account) {
      this.vaultService.exit$(this.account, this.vault, this.chainId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.changeDetectorRef.detectChanges();
        })
    }
  }

  onClaim(): void {
    if (this.vault && this.account) {
      this.vaultService.getAllRewards$(this.account, this.vault, this.chainId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.changeDetectorRef.detectChanges();
        })
    }
  }
}
