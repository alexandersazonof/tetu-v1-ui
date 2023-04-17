import { BigNumber } from 'ethers';

export const ON_CHAIN_CALL_RETRY = 10;
export const BN_ZERO = BigNumber.from(0);
export const BN_MAX_UINT = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const DAY = 60 * 60 * 24;
export const WEEK = DAY * 7;
export const YEAR = DAY * 365;
export const MAX_VE_LOCK = YEAR;
