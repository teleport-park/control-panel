import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HardwareService } from './services/hardware.service';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HardwareComponent implements OnInit {

  constructor(public service: HardwareService) { }

  ngOnInit() {
  }

}
