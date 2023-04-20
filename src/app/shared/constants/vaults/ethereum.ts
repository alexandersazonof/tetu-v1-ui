import { CoreVaults } from "@constants/vaults/core-vaults";

export class EthereumVaults {
  public static VAULTS = new CoreVaults(
    '', // tetu
    '', // dxTet
    '', // tetuqi
    '', // xtetuqi
    '', // meshTetuMesh
    '', //
    '', // tetuBal
    '', // stMatic
    '0xBD06685a0e7eBd7c92fc84274b297791F3997ed3'.toLowerCase(), // balTetuBal
    '',
    ''
  );

  public static SYMBOL_NAME = {
    '0xfe700d523094cc6c673d78f1446ae0743c89586e': 'tetuBAL',
    '0x0000000000000000000000000000000000000000': 'xTETU (PS)',
    '0x7f52d49c8a9779e93613fb14cf07be1500ab9c3a': 'wstETH-WETH',
    '0x8a571137da0d66c2528da3a83f097fba10d28540': 'wstETH-bbaUSD',
    '0x46e8e75484ee655c374b608842acd41b2ec3f11c': 'BADGER-rETH',
    '0xc6f6e9772361a75988c6cc248a3945a870fb1272': 'rETH-WETH',
    '0x5dc1c173587aa562179b03db9d643ff5ff2e4660': 'bbaUSD',
    '0x65be5bd1745a9871a5f042385db869e78e9a1693': 'wUSDR-USDC',
  }
}
