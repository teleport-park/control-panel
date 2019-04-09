import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HardwareItem } from './control-panel-ui-hardware-item';

@Component({
  selector: 'control-panel-ui-hardware-item',
  templateUrl: './control-panel-ui-hardware-item.component.html',
  styleUrls: ['./control-panel-ui-hardware-item.component.scss']
})
export class ControlPanelUiHardwareItemComponent implements OnInit, OnDestroy {

  /**
   * items
   */
  @Input() item: HardwareItem;

  cpuBusy: number = Math.floor(Math.random() * 100) + 1;

  lanBusy: number = Math.floor(Math.random() * 100) + 1;




  private intervalCPU;
  private intervalLAN;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.intervalCPU = setInterval(() => {
      this.cpuBusy =  Math.floor(Math.random() * 100) + 1;
      this.cd.markForCheck();
    }, 6000);

    this.intervalLAN = setInterval(() => {
      this.lanBusy =  Math.floor(Math.random() * 100) + 1;
      this.cd.markForCheck();
    }, 6000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalCPU);
    clearInterval(this.intervalLAN);
  }
}
