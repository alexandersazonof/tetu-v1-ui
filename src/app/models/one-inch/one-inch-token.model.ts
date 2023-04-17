export class OneInchTokenModel {
  symbol?: string;
  name?: string;
  decimals?: number;
  address?: string;
  logoURI?: string;
  tags?: string[];

  constructor(data: Partial<OneInchTokenModel> = {}) {
    Object.assign(this, data);
  }
}
