import { ChainData } from "@services/web3modal-ts/helpers/types";
import { CHAIN_DATA_LIST } from "@services/web3modal-ts/constants/chains";

export function getNetwork(chainId: number): string {
  const chains: ChainData[] = Object.values(CHAIN_DATA_LIST);
  const matches = filterMatches<ChainData>(chains, x => x.chainId == chainId, undefined)

  if (!matches) {
    throw new Error(`Chain ${chainId} not found`)
  }
  return matches.network
}

export function getChainId(network: string): number {
  const chains: ChainData[] = Object.values(CHAIN_DATA_LIST);
  const match = filterMatches<ChainData>(chains, x => x.network === network, undefined);
  if (!match) {
    throw new Error(`No chainId found match ${network}`);
  }
  return match.chainId;
}

export function filterMatches<T>(array: T[], condition: (x: T) => boolean, fallback: T | undefined): T | undefined {
  let result = fallback;
  const matches = array.filter(condition);

  if (!!matches && matches.length) {
    result = matches[0];
  }

  return result;
}
