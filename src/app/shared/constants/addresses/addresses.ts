import { PolygonAddresses } from '@constants/addresses/polygon';
import { SepoliaCoreAddresses } from '@constants/addresses/sepolia';
import { CoreAddresses } from '@shared/constants/addresses/core-addresses';
import { EthereumAddresses } from "@constants/addresses/ethereum";

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const CORE = new Map<number, CoreAddresses>([
  [11155111, SepoliaCoreAddresses.ADDRESSES],
  [137, PolygonAddresses.ADDRESSES],
  [1, EthereumAddresses.ADDRESSES],
]);

const BLOCK_EXPLORERS = new Map<number, string>([
  [11155111, 'https://sepolia.etherscan.io/'],
  [137, 'https://polygonscan.com/'],
  [1, 'https://etherscan.io/']
]);

export function getCoreAddresses(chainId: number) {
  return CORE.get(chainId) || PolygonAddresses.ADDRESSES;
}

export function blockExplorerLink(chainId: number): string {
  return BLOCK_EXPLORERS.get(chainId) ?? '';
}
