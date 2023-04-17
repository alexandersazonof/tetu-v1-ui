import { Injectable } from '@angular/core';
import { ON_CHAIN_CALL_RETRY } from '@constants';
import { getCoreAddresses } from '@constants/addresses';
import { PriceCalculator__factory } from '@generated/abi';
import { ProviderService } from '@tetu_io/tetu-ui';
import { BigNumber, providers } from 'ethers';
import { NGXLogger } from 'ngx-logger';
import { from, mergeMap, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  constructor(private providerService: ProviderService, private logger: NGXLogger) {}

  createPriceCalculator(provider: providers.Web3Provider, chainId: number) {
    return PriceCalculator__factory.connect(getCoreAddresses(chainId)?.priceCalculator ?? '', provider);
  }

  getPriceFromPriceCalculator$(chainId: number, token: string) {
    if (!getCoreAddresses(chainId)?.priceCalculator || getCoreAddresses(chainId)?.priceCalculator.trim() === '') {
      return of(BigNumber.from(0));
    }
    return this.providerService.getProvider$().pipe(
      mergeMap(provider => {
        return from(this.createPriceCalculator(provider, chainId).getPriceWithDefaultOutput(token));
      }),
      retry(ON_CHAIN_CALL_RETRY),
    );
  }
}
