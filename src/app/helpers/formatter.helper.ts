import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { NGXLogger } from 'ngx-logger';

export function currencyFormatter(currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
}

export function numberFormatter(fractionDigits: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: fractionDigits, minimumFractionDigits: 2 });
}

export function prettyCurrency(balance: number, currency: string = 'USD', exchangeRate: number = 1) {
  return currencyFormatter(currency).format(balance * exchangeRate);
}

/**
 * @deprecated Use numberToCompact
 */
export function prettyNumber(number: number, fractionDigits = 2) {
  return numberToCompact(number, fractionDigits);
  // return numberFormatter(fractionDigits).format(number).replace(/,/g, ' ');
}

export function prettyBigNumber(number: BigNumber, decimals = 18, fractionDigits = 2) {
  const value = parseFloat(formatUnits(number, decimals));
  return numberFormatter(fractionDigits).format(value);
}

export function formatAddress(address: string, length = 'short'): string {
  if (address && length === 'short') {
    address = address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length);
    return address;
  } else if (address && length === 'long') {
    address = address.substring(0, 12) + '...' + address.substring(address.length - 8, address.length);
    return address;
  } else {
    return '';
  }
}

export function formatRpcError(
  functionName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  logger: NGXLogger,
) {
  // probably we will need to format errors from different RPC providers
  logger.info('RPC Error:', functionName, error);
  let msg = 'Unknown error';
  if (error) {
    if (error.reason) {
      msg = error.reason;
    } else if (error.message) {
      msg = error.message;
    }
  }
  if (msg.indexOf('User denied transaction signature.') !== -1) {
    return '';
  }
  return functionName + ': ' + msg;
}

export const numberToCompact = (value: number, fractionDigits = 2) => {
  // if (value > 1_000_000_000_000) {
  //   return '∞';
  // }
  return Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
};


export class Formatters {
  private _value: string;

  constructor(value = '') {
    this._value = value;
  }

  removeSpaces(value: string) {
    this._value = value.replace(/ /g, '');

    return this;
  }

  replaceCommaToDot(value: string) {
    this._value = value.replace(/,/g, '.');

    return this;
  }

  value() {
    return this._value;
  }
}
