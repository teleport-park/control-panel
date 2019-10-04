import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { ControllerType } from '../../../models/types';

@Component({
  selector: 'control-panel-ui-hardware-item',
  templateUrl: './control-panel-ui-hardware-item.component.html',
  styleUrls: ['./control-panel-ui-hardware-item.component.scss']
})
export class ControlPanelUiHardwareItemComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'light-theme';

  readonly MINUTE: number = 60 * 1000;

  objectKeys = Object.keys;

  date: number = Date.now();

  /**
   * items
   */
  @Input() item: ControllerType;

  /**
   * emit selected device id
   */
  @Output() selectDevice: EventEmitter<string> = new EventEmitter();

  @Output() grant: EventEmitter<ControllerType> = new EventEmitter();

  @Output() revoke: EventEmitter<ControllerType> = new EventEmitter();

  constructor(public translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  /**
   * go to device
   */
  goToDevice() {
    this.selectDevice.emit(this.item.id);
  }

  ngOnDestroy(): void {
  }

  getDate(value) {
    return new Date(value).getTime();
  }

  hasStatus() {
    return typeof this.item.authorized === 'boolean';
  }

  isObject(value: any) {
    return typeof value === 'object' && value !== null;
  }
}
