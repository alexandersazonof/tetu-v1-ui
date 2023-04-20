import { CoreVaults } from "@constants/vaults/core-vaults";

export class PolygonVaults {
  public static VAULTS = new CoreVaults(
    '0x225084D30cc297F3b177d9f93f5C3Ab8fb6a1454'.toLowerCase(), // tetu
    '0xacee7bd17e7b04f7e48b29c0c91af67758394f0f'.toLowerCase(), // dxTet
    '0x4Cd44ced63d9a6FEF595f6AD3F7CED13fCEAc768'.toLowerCase(), // tetuqi
    '0x8f1505C8F3B45Cb839D09c607939095a4195738e'.toLowerCase(), // xtetuqi
    '0xADC56043BFf96e2F3394bFd5719cd6De0a734257'.toLowerCase(), // meshTetuMesh
    '0xbd06685a0e7ebd7c92fc84274b297791f3997ed3'.toLowerCase(), //
    '0x7fc9e0aa043787bfad28e29632ada302c790ce33'.toLowerCase(), // tetuBal
    '0xa8fab27b7d41ff354f0034addc2d6a53b5e31356'.toLowerCase(), // stMatic
    '0x7fc9e0aa043787bfad28e29632ada302c790ce33'.toLowerCase(),
    '0xff0c285e1b6b8e7da72950d7879b2d06ea084445'.toLowerCase(),
    '0x598f3647a586be31fb9a6942c1f18ed44d5f8b0d'.toLowerCase(),
  );

  public static SYMBOL_NAME = {
    '0x8f1505c8f3b45cb839d09c607939095a4195738e': "xtetuQi", // xtetuQi
    '0xa8fab27b7d41ff354f0034addc2d6a53b5e31356': "stMATIC-WMATIC BPT", // stMATIC-WMATIC BPT
    '0xf2fb1979c4bed7e71e6ac829801e0a8a4efa8513': "amUSD BPT", // bbamUSD BPT
    '0x4028cba3965e8aea7320e9ea50914861a14dc724': "bb-t-USD BPT",
    '0x677b5f4e26c8ae790647b633d803e53fe363140c': "bb-t-MATIC BPT",
    '0x1e8a077d43a963504260281e73efca6292d48a2f': "MATICX-WMATIC BPT", // bbamUSD BPT
    '0x190ca39f86ea92eaaf19cb2acca17f8b2718ed58': "tetuQI-QI BPT", // bbamUSD BPT
    '0x08d88dd2bba2898c72a180bd8023fec9f0cb9799': "USDC-wUSDR BPT", // bbamUSD BPT
    '0x873b46600f660dddd81b84aea655919717afb81b': 'SPHERE-WMATIC BPT',

    '0xcdf69bd9aff6f0a87c6c79ca07a357b465e165ba' : 'IS3USD',
    '0x96afb62d057f7e0dca987c503812b12bee14f5e5': 'aTricrypto3',
    '0xb760f7162e865946598228b29a3fc6804de65449': 'crvAAVE',
    '0xacee7bd17e7b04f7e48b29c0c91af67758394f0f': 'dxTETU',
    '0x4cd44ced63d9a6fef595f6ad3f7ced13fceac768': 'tetuQi',
    '0xbd06685a0e7ebd7c92fc84274b297791f3997ed3': 'B-80BAL-20WETH - tetuBAL',
    '0xdcb8f34a3ceb48782c9f3f98df6c12119c8d168a': 'tetuMESH',
    '0xe2ebfd67ed292bace45bf93bb3d828bbaa5a59de': 'miMatic (MAI)',

    '0x7fc9e0aa043787bfad28e29632ada302c790ce33': 'tetuBAL',

    '0x225084d30cc297f3b177d9f93f5c3ab8fb6a1454': 'xTETU (PS)',
  };
}
