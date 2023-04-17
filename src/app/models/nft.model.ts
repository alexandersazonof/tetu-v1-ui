export class NftModel {
  readonly address: string;
  readonly id: number;

  constructor(address: string, id: number) {
    this.address = address;
    this.id = id;
  }
}
