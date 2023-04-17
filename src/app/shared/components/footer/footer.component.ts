import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeviceService } from '@tetu_io/tetu-ui';

@Component({
  selector: 'tetu-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(public device: DeviceService) {}
}
