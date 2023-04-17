import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WalletDataService {

  private activeWalletSubject = new BehaviorSubject<string | undefined>(undefined);
  activeWalletObservable = this.activeWalletSubject.asObservable();

  constructor() { }

  setActiveWallet(wallet: string): void {
    this.activeWalletSubject.next(wallet);
  }
}
