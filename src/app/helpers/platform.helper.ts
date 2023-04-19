import { VaultModel } from "@models";
import { PLATFORM } from "@constants/platform.constant";

export function getPlatformByVault(vault: VaultModel): string {
  if (vault.platform == 24) {
    return getPlatformForStrategySplitter(vault);
  }
  return PLATFORM[vault.platform]
}

function getPlatformForStrategySplitter(vault: VaultModel): string {
  return vault.subStrategies.map(i => PLATFORM[i.platform]).join(' / ')
}
