import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ApyFullDetailsInfoModel } from "@models/apy.model";
import { numberToCompact } from "@helpers";

@Component({
  selector: 'tetu-apy-details',
  templateUrl: './apy-details.component.html',
  styleUrls: ['./apy-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApyDetailsComponent implements OnInit {

  @Input() type;
  @Input() data: ApyFullDetailsInfoModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  formatNumber(value: number | undefined): string {
    if (value) {
      return numberToCompact(value, 2)
    }
    return '0';
  }
}
