import { ETH_CHAIN, POLYGON_CHAIN, SelectItemModel } from "@tetu_io/tetu-ui";

export const NETWORKS: SelectItemModel[] = [
  {
    id: POLYGON_CHAIN.id.toString(),
    label: POLYGON_CHAIN.name,
    icon: 'polygon',
    rpcUrl: 'https://polygon-rpc.com',
  },
  {
    id: ETH_CHAIN.id.toString(),
    label: ETH_CHAIN.name,
    icon: 'weth',
    rpcUrl: 'https://rpc.ankr.com/eth',
  }
]
