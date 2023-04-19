import { CoreIcons } from "@constants/icons/core-icon";
import { PolygonIcons } from "@constants/icons/polygon";

const CORE = new Map<number, CoreIcons>([
  [11155111, PolygonIcons.ICONS],
  [137, PolygonIcons.ICONS],
  [1, PolygonIcons.ICONS],
]);

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
  }

  return 'unknown-icon';
}
