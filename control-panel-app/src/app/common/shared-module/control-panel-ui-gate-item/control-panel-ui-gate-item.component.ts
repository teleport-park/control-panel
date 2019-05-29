import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { GateController } from '../../../models';

@Component({
  selector: 'control-panel-ui-gate-item',
  templateUrl: './control-panel-ui-gate-item.component.html',
  styleUrls: ['./control-panel-ui-gate-item.component.scss']
})
export class ControlPanelUiGateItemComponent implements OnInit, OnChanges {

  status: string;

  @Input() item: GateController;

  @Input() set metrics(data: any[]) {
    if (data && this.item) {
      this.item.status = data.find(item => item.id === this.item.id).status;
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.status = this.item.status;
    }
  }

  getIcon() {
    switch (true) {
      case this.item.isOpen():
        return 'gate-open';
      case this.item.isClosed():
        return 'gate-closed';
      case this.item.isBlocked():
        return 'gate-blocked';
      default:
        return '';
    }
  }

}
