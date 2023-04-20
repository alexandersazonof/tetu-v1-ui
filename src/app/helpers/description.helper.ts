import { VaultModel } from "@models";
import { getVaults, getVaultSymbols } from "@constants/vaults/vaults";
import {
  AAVE_PLATFORM,
  BALANCER_PLATFORM, CONE_PLATFORM,
  CURVE_PLATFORM,
  DINO_PLATFORM,
  IRON_SWAP_PLATFORM,
  KLIMA_PLATFORM,
  QUICK_SWAP_PLATFORM,
  SCREAM_PLATFORM,
  SPOOKY_SWAP_PLATFORM,
  SUSHI_SWAP_PLATFORM,
  TETU_PLATFORM,
  TETU_SWAP_PLATFORM,
  VESQ_PLATFORM
} from "@constants/platform.constant";
import { ETH_CHAIN_ID, POLYGON_CHAIN_ID } from "@constants/network.constant";

export function getDescriptionByVault(vault: VaultModel, chainId: number): string | null {
  const vaultAddresses = getVaults(chainId)
  const assets =
    formatVaultManageName(vault.addr, chainId) ||
    getVaultSymbolName(vault.addr, chainId) ||
    // TODO add caches and fetch from ContractUtils names, in the future we will parse data from graph, where will symbols
    vault.assets.map(asset => 'ETH')

  switch (vault.addr.toLowerCase()) {
    case vaultAddresses.PS:
      return 'Tetu (PS) - Profit Sharing Vault, the profits of the entire platform are distributed to the TETU deposited in this vault.'
    case vaultAddresses.dxTETU:
      return 'Tetu (dxTETU) - deprecated solution for locking TETU. Please migrate to veTETU. Any Withdraw penalties were disabled.';
    case vaultAddresses.tetuqi:
      return 'tetuQi - Liquid eQi (stake locked Qi), deposit QI into tetuQi vault or buy from tetuQi-Qi LP and tetu will continously lock it forever for max rewards/vote power, giving liquid tetuQi in return. After 10% is sold as performance fee, weekly Qi staking rewards are wrapped as tetuQi and distributed along with TETU rewards. dxTETU holders will control the voting rights that tetuQi\'s eQi position provides.';
    case vaultAddresses.xtetuQi:
      return 'Earn auto-compound income in tetuQi without any fees or vesting period.';
    case vaultAddresses.meshTetuMesh:
      return 'You can create MSLP (liquidity tokens) on the MeshSwap.fi page.';
    case vaultAddresses.tetuBalBpt3:
      return 'This vault is a destination of all possible rewards from tetuBAL and tetuBAL-ETH/BAL gauge.';
    case vaultAddresses.tetuBal:
      return 'You can create B-80BAL-20WETH (LP tokens) on the Balancer.fi page';
    case vaultAddresses.stMatic:
      return 'Strategy wrap 92% of the profit to xbb-am-usd vault and provide it as rewards for this vault.';
    case vaultAddresses.balTetuBal:
      if (chainId == ETH_CHAIN_ID && vault.platform == BALANCER_PLATFORM) {
        return 'Strategy deposit BPT to Balancer gauge with a boost from tetuBAL. Periodically autocompound the profit to the underlying asset.';
      }
  }

  switch (vault.platform) {
    case AAVE_PLATFORM:
      return `AAVE - This vault uses a folding strategy that Supplies and borrows ${assets} on AAVE simultaneously to earn rewards. Earned rewards are harvested, sold for tetu and bought back to be distributed to the users`
    case TETU_PLATFORM:
      return 'This vault is deposit assets to similar Tetu vault and claim periodically rewards for autocompound to the underlying asset. APR suppose to be ~70% of the linked Tetu vault but can fluctuate.'
    case CURVE_PLATFORM:
      if (chainId == POLYGON_CHAIN_ID) {
        return 'This vault is deposit assets to similar Tetu vault and claim periodically rewards for autocompound to the underlying asset. APR suppose to be ~70% of the linked Tetu vault but can fluctuate.'
      }
      break;
    case DINO_PLATFORM:
      if ([vaultAddresses.wethDino, vaultAddresses.usdcDino].includes(vault.addr.toLowerCase())) {
        return 'Dino - 99% compound vault , 1% of  fees are used to buyback tetu'
      }
      break;
    case IRON_SWAP_PLATFORM:
      return 'Iron Swap - This vault works in a classic way, following the current PS ratio';
    case KLIMA_PLATFORM:
      return 'Klima – Strategy deposits klima into KlimaDAO and sells rebase for tetu'
    case QUICK_SWAP_PLATFORM:
      return 'Quickswap - This vault has 99% autocompound, 1% of fees are used to buyback tetu from the market'
    case SUSHI_SWAP_PLATFORM:
      return 'Sushi Swap - This vault has 99% autocompound, 1% of fees are used to buyback tetu from the market and distribute it to the PS(profit sharing) vault'
    case TETU_SWAP_PLATFORM:
      return 'Tetu Swap - TetuSwap Strategies deposit LP assets into Tetu yield farming vaults and earns rewards for users . When a swap occours , its withdraws the sufficient amount of assets to execute the swap'
    case VESQ_PLATFORM:
      return 'VESQ – Deposits VSQ into VESQ and sells rebase for tetu'
    case SCREAM_PLATFORM:
      return `SCREAM - This vault uses a folding strategy that Supplies and borrows ${assets} on SCREAM simultaneously to earn rewards. Earned rewards are harvested, sold for more ${assets} and deposits it into the strategy.this vault has 90% auto-compound and 10% fees is used to buyback tetu and build protocol owned liquidity`
    case SPOOKY_SWAP_PLATFORM:
      return 'Spooky Swap - This vault has 99% autocompound, 1% of fees are used to buyback tetu from the market'
  }

  return null
}

export function formatVaultManageName(address: string, chainId: number): string | null {
  const vaultAddresses = getVaults(chainId)

  if (vaultAddresses.tetuBal == address.toLowerCase()) {
    return '20WETH-80BAL'
  }

  return null;
}

export function getAdditionalDescription(vault: VaultModel, chainId: number): string | null {
  const autoCompoundValue = 100 - vault.buyBackRatio / 100
  const vaultAddresses = getVaults(chainId)

  if (autoCompoundValue != 100 && chainId != ETH_CHAIN_ID && vaultAddresses.tetuBal != vault.addr.toLowerCase()) {
    return `${autoCompoundValue} % of profit is auto-compounding to underlying asset. Another part can be used in buybacks, Profit Sharing or gas fees compensation.`
  }

  if (vault.platform == CONE_PLATFORM) {
    return 'The assets will be deposited to Cone using veCONE to maximize your profit.\n' +
      '            <br />\n' +
      '            A part of the income will be reinvested to the veCONE to keep the profit at the maximum\n' +
      '            possible level.\n' +
      '            <br />\n' +
      '            The proportion for reinvesting in the veCONE is recalculating periodically and could be\n' +
      '            in a range of 50-10%\n' +
      '            <br />\n' +
      '            Another part (50-90%) will increase your LP position (compounding).\n' +
      '            <br />\n' +
      '            No claimable rewards assumed\n' +
      '            <br />';
  }

  if (chainId == ETH_CHAIN_ID && vault.platform == BALANCER_PLATFORM) {
    return `${autoCompoundValue}% of profit is auto-compounding to underlying asset.` +
            '<br />\n' +
      '            Assets deposited to Balancer gauge with boost from tetuBAL.\n' +
      '            <br />\n' +
      '            Boost depends on this vault TVL, other participants in farmed gauge and amount of veBAL\n' +
      '            under Tetu control.\n' +
      '            <br />\n' +
      '            <br />' +
      `Current rewards boost: <b>x${vault.balancerBoost}</b>`
  }

  if (chainId == ETH_CHAIN_ID && vault.platform == BALANCER_PLATFORM && vault.ableToBoostUsd != 0) {
    return `
            Full boost is supported for up to <b>${vault.ableToBoostUsd}</b> of additional deposits.
    `
  }

  return null;
}

export function getVaultSymbolName (addr: string, chainId): string | null {
  const symbols = getVaultSymbols(chainId);
  const key = Object.keys(symbols).find(a => {
    return a.toLowerCase() === addr?.toLowerCase();
  })

  if (key) {
    return symbols[key];
  }

  return null;
}
