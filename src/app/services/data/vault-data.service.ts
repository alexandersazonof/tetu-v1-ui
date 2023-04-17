import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { VaultModel } from "@models";

@Injectable({
  providedIn: 'root',
})
export class VaultDataService {

  private activeVaultSubject = new BehaviorSubject<VaultModel | undefined>(undefined);
  activeVaultObservable: Observable<VaultModel | undefined> = this.activeVaultSubject.asObservable();

  private vaultsSubject = new BehaviorSubject<VaultModel[]>([])
  vaultsObservable: Observable<VaultModel[]> = this.vaultsSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  getVaultsByNetwork(network: string): Observable<VaultModel[]> {
    const url = `${environment.SERVER_URL}/reader/vaultInfos?network=${network}`;
    return this.http.get<VaultModel[]>(url);
  }

  setActiveVault(vault: VaultModel | undefined): void {
    this.activeVaultSubject.next(vault);
  }

  setVaults(vaults: VaultModel[]): void {
    this.vaultsSubject.next(vaults);
  }
}
