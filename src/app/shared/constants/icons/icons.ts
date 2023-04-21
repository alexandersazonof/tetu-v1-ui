import { CoreIcons } from "@constants/icons/core-icon";
import { PolygonIcons } from "@constants/icons/polygon";

const CORE = new Map<number, CoreIcons>([
  [11155111, PolygonIcons.ICONS],
  [137, PolygonIcons.ICONS],
  [1, PolygonIcons.ICONS],
]);

export const DEFAULT_ICON = 'unknown-icon';

export const EXCLUDE_VAULT_ICON = [
  // Balancer stMATIC Stable Pool
  '0x8159462d255c1d24915cb51ec361f700174cd994'.toLowerCase(),
  // Balancer MaticX Stable Pool
  '0xb20fc01d21a50d2c734c4a1262b4404d41fa7bf0'.toLowerCase(),
  // Balancer tetuQi StablePool
  '0x05f21bacc4fd8590d1eaca9830a64b66a733316c'.toLowerCase(),

]

export function getIcon(chainId: number, address: string): string {
  const icon = CORE.get(chainId);
  if (!icon) {
    return 'unknown-icon';
  }

  switch (address.toLowerCase()) {
    case icon.tetu:
      return 'tetu-icon';
    case icon.dxTetu:
      return 'xtetu-icon';
    case icon.tetuBal:
      return 'tetu-bal-icon';
    case icon.xbbAmUsd:
      return 'bb-am-usd-icon';
    case icon.bbAmUsd:
      return 'bb-am-usd-icon';
    case icon.lido:
      return 'lido-icon';
    case icon.tetuQi:
      return 'tetu-qi-icon';
    case icon.tetuMesh:
      return 'tetu-mesh-icon';
    case icon.usdc:
      return 'usdc-icon';
    case icon.usdt:
      return 'usdt-icon';
    case icon.dai:
      return 'dai-icon';
    case icon.wmatic:
      return 'wmatic-icon';
    case icon.wbtc:
      return 'wbtc-icon';
    case icon.weth:
      return 'weth-icon';
    case icon.link:
      return 'link-icon';
    case icon.bbTUsd:
      return 'bb-t-usd-icon'
    case icon.qi :
      return 'qi-icon';
    case icon.mesh:
      return 'mesh-icon';
    case icon.stMatic:
      return 'st-matic-icon';
    case icon.balancer:
      return 'bal-icon';
    case icon.liquidMatic:
      return 'lq-matic-icon';
    case icon.sphere:
      return 'sphere-icon';
    case icon.usdr:
      return 'usdr-icon';
    case icon.tetuBal80weth20bal:
      return 'tetu-bal-icon';
    case icon.tngbl:
      return 'tngbl-icon';
    case icon.uma:
      return 'uma-icon';
  }

  return DEFAULT_ICON;
}
