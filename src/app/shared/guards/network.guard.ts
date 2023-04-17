import { Injectable } from '@angular/core';
import { UrlTree, Router, CanLoad } from '@angular/router';
import { ProviderService } from '@tetu_io/tetu-ui';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkGuard implements CanLoad {
  account?: string;

  constructor(protected readonly router: Router, protected providerService: ProviderService) {}

  canLoad(): Observable<boolean | UrlTree> {
    // todo fix
    // this.web3Service.connect$().subscribe();
    //
    // return merge(
    //   this.providerService.accounts$(),
    //   this.web3Service.connect$().pipe(
    //     mergeMap(web3 => {
    //       return web3.eth.getAccounts();
    //     }),
    //   ),
    // ).pipe(map(([account]) => !!account));
    return of(true);
  }
}
