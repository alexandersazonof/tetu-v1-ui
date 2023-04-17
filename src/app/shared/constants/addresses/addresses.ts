import { PolygonAddresses } from '@constants/addresses/polygon';
import { SepoliaCoreAddresses } from '@constants/addresses/sepolia';
import { CoreAddresses } from '@shared/constants/addresses/core-addresses';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const CORE = new Map<number, CoreAddresses>([
  [11155111, SepoliaCoreAddresses.ADDRESSES],
  [137, PolygonAddresses.ADDRESSES],
]);

const BLOCK_EXPLORERS = new Map<number, string>([
  [11155111, 'https://sepolia.etherscan.io/'],
  [137, 'https://polygonscan.com/'],
]);

export function getCoreAddresses(chainId: number) {
  return CORE.get(chainId);
}

export function blockExplorerLink(chainId: number): string {
  return BLOCK_EXPLORERS.get(chainId) ?? '';
}
