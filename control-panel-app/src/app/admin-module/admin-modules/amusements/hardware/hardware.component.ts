import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HardwareService } from './services/hardware.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HardwareComponent implements OnInit {

  constructor(public service: HardwareService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * select id
   * @param deviceId
   */
  selectDevice(deviceId: string) {
    this.router.navigate(['admin', 'amusements', 'hardware', deviceId]);
  }

}
