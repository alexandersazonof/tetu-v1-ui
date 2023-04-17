import { formatUnits } from 'ethers/lib/utils';
import { VeModel } from '@models';

export function isZeroOrEmpty(value: string) {
  return !value || value.trim() === '' || (Number(value) && Number(value) === 0);
}

export function isVeBetter(current: VeModel, newVe: VeModel) {
  return +formatUnits(current.power) < +formatUnits(newVe.power);
}
