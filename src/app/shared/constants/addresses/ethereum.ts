import { CoreAddresses } from '@constants/addresses/core-addresses';

export class EthereumAddresses {
  // TODO change addresses
  public static ADDRESSES = new CoreAddresses(
    '0x255707B70BF90aa112006E1b07B9AeA6De021424', // tetu
    '0x33b27e0A2506a4A2FBc213a01C51d0451745343a', // controller
    '0x6FB29DD17fa6E27BD112Bc3A2D0b8dae597AeDA4', // ve
    '0xf8d97eC3a778028E84D4364bCd72bb3E2fb5D18e', // veDist
    '0x4ED1dD7838dE3ec37a2b30902D3c3BE9B50C94a0', // gauge
    '0xAB45D768Ebca054861cEccbd2982F09C4076C4b4', // bribe
    '0x4cdF28d6244c6B0560aa3eBcFB326e0C24fe8218', // tetuVoter
    '0x5576Fe01a9e6e0346c97E546919F5d15937Be92D', // platformVoter
    '0x88115b5eA38AF3ED6357a26D161307D7F28D2EC9', // forwarder
    '0xaAd7a2517b0d0d15E3Da5C37C5371F7283cCc074', // vaultFactory
    [
      '0x255707B70BF90aa112006E1b07B9AeA6De021424', // tetu
      '0xE2f706EF1f7240b803AAe877C9C762644bb808d8', // tetu-usdc bpt
    ],
    '0x42D0d8e434aEc1f91c0E681179e1d1c9FEFB9b6D', // deposit helper
    '0x0B62ad43837A69Ad60289EEea7C6e907e759F6E8', // price calculator
    '0x6678814c273d5088114B6E40cC49C8DB04F9bC29', // old controller
    '0x51c9A17660fC74a44A4aEf1474f100AdB789eeA5', // investFundV2
    '',
  );
}
