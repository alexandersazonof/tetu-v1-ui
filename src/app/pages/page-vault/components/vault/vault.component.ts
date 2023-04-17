import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VaultDataService } from "@services/data/vault-data.service";
import { VaultModel } from "@models";
import { DestroyService, ProviderService } from "@tetu_io/tetu-ui";
import { takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { TokenService } from "@services/onchain/token.service";
import { BN_MAX_UINT } from "@constants";

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

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private destroy$: DestroyService,
    private vaultDataService: VaultDataService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private providerService: ProviderService
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
          this.checkIsApproved()
        } else {
          const address = this.route.snapshot.paramMap.get('vault')
          this.vaultDataService.vaultsObservable
            .pipe(takeUntil(this.destroy$))
            .subscribe(vaults => {
              if (vaults.length != 0 && !this.vault && address != null) {
                this.vault = vaults.find(vault => vault.addr.toLowerCase() == address?.toLowerCase())
                this.checkIsApproved()
                this.changeDetectorRef.detectChanges();
              }
            });
        }
        this.changeDetectorRef.detectChanges();
      })
  }

  checkIsApproved(): void {
    if (this.vault && this.account) {
      this.tokenService.allowance$(this.vault.underlying, this.account, this.vault.addr)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.isApproved = !result.isZero();
          this.changeDetectorRef.detectChanges();
        })
    }
  }

  onApprove(): void {
    if (this.vault && this.account) {
      // TODO amount
      const amount = BN_MAX_UINT
      this.tokenService.approve$(this.account, this.vault.underlying, this.vault.addr, amount)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.changeDetectorRef.detectChanges();
          }
          // TODO error
        )
    }
  }
}
