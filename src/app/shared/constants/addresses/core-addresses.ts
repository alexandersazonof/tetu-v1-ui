export class CoreAddresses {
  public readonly tetu: string;
  public readonly controller: string;
  public readonly ve: string;
  public readonly veDist: string;
  public readonly gauge: string;
  public readonly bribe: string;
  public readonly tetuVoter: string;
  public readonly platformVoter: string;
  public readonly forwarder: string;
  public readonly vaultFactory: string;
  public readonly veUnderlying: string[];
  public readonly depositHelper: string;
  public readonly priceCalculator: string;
  public readonly oldController: string;
  public readonly investFundV2: string;

  constructor(
    tetu: string,
    controller: string,
    ve: string,
    veDist: string,
    gauge: string,
    bribe: string,
    tetuVoter: string,
    platformVoter: string,
    forwarder: string,
    vaultFactory: string,
    veUnderlying: string[],
    depositHelper: string,
    priceCalculator: string,
    oldController: string,
    investFundV2: string,
  ) {
    this.tetu = tetu;
    this.controller = controller;
    this.ve = ve;
    this.veDist = veDist;
    this.gauge = gauge;
    this.bribe = bribe;
    this.tetuVoter = tetuVoter;
    this.platformVoter = platformVoter;
    this.forwarder = forwarder;
    this.vaultFactory = vaultFactory;
    this.veUnderlying = veUnderlying;
    this.depositHelper = depositHelper;
    this.priceCalculator = priceCalculator;
    this.oldController = oldController;
    this.investFundV2 = investFundV2;
  }

  public static empty() {
    return new CoreAddresses('', '', '', '', '', '', '', '', '', '', [''], '', '', '', '');
  }
}
