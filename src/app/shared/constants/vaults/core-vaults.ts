export class CoreVaults {
  public readonly PS: string;
  public readonly dxTETU: string;
  public readonly tetuqi: string;
  public readonly xtetuQi: string;
  public readonly meshTetuMesh: string;
  public readonly tetuBalBpt3: string;
  public readonly tetuBal: string;
  public readonly stMatic: string;
  public readonly balTetuBal: string;
  public readonly wethDino: string;
  public readonly usdcDino: string;


  constructor(PS: string, dxTETU: string, tetuqi: string, xtetuQi: string, meshTetuMesh: string, tetuBalBpt3: string, tetuBal: string, stMatic: string, balTetuBal: string, wethDino: string, usdcDino: string) {
    this.PS = PS;
    this.dxTETU = dxTETU;
    this.tetuqi = tetuqi;
    this.xtetuQi = xtetuQi;
    this.meshTetuMesh = meshTetuMesh;
    this.tetuBalBpt3 = tetuBalBpt3;
    this.tetuBal = tetuBal;
    this.stMatic = stMatic;
    this.balTetuBal = balTetuBal;
    this.wethDino = wethDino;
    this.usdcDino = usdcDino;
  }
}
