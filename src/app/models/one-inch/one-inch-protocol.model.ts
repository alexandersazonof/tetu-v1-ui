export class OneInchProtocolModel {
  id?: string;
  title: string = '';
  img?: string;
  img_color?: string;

  constructor(data: Partial<OneInchProtocolModel> = {}) {
    Object.assign(this, data);
  }
}
