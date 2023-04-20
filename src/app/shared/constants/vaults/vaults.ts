import { CoreVaults } from "@constants/vaults/core-vaults";
import { PolygonVaults } from "@constants/vaults/polygon";
import { EthereumVaults } from "@constants/vaults/ethereum";


const CORE = new Map<number, CoreVaults>([
  [11155111, PolygonVaults.VAULTS],
  [137, PolygonVaults.VAULTS],
  [1, EthereumVaults.VAULTS],
]);

const SYMBOLS = new Map<number, any>([
  [11155111, PolygonVaults.SYMBOL_NAME],
  [137, PolygonVaults.SYMBOL_NAME],
  [1, EthereumVaults.SYMBOL_NAME],
]);

export function getVaults(chainId: number) {
  return CORE.get(chainId) || PolygonVaults.VAULTS;
}

export function getVaultSymbols(chainId) {
  return SYMBOLS.get(chainId) || PolygonVaults.SYMBOL_NAME;
}
