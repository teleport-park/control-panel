import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { TNGController, TVRController } from '../../../models';

@Component({
  selector: 'control-panel-ui-hardware-item',
  templateUrl: './control-panel-ui-hardware-item.component.html',
  styleUrls: ['./control-panel-ui-hardware-item.component.scss']
})
export class ControlPanelUiHardwareItemComponent implements OnInit, OnDestroy {

  payload = null;

  /**
   * TODO remove this later
   */
  activeGame;

  /**
   * items
   */
  @Input() item: TNGController | TVRController;

  /**
   * metrics
   * @param payload
   */
  @Input() set metrics(payload: any[]) {
    if (payload && this.item) {
      this.payload = payload.find(item => item.id === this.item.id) || null;
    }
  }

  /**
   * emit selected device id
   */
  @Output() selectDevice: EventEmitter<string> = new EventEmitter();

  constructor(public translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.activeGame = Math.floor(Math.random() * this.item.amusements.length);
  }

  /**
   * go to device
   */
  goToDevice() {
    this.selectDevice.emit(this.item.id);
  }

  ngOnDestroy(): void {
  }
}
