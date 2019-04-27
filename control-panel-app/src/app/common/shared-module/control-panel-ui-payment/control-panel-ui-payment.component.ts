import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Payment } from './control-panel-ui-paymnet.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'control-panel-ui-payment',
  templateUrl: './control-panel-ui-payment.component.html',
  styleUrls: ['./control-panel-ui-payment.component.scss']
})
export class ControlPanelUiPaymentComponent implements OnInit {

  @HostBinding('class')
  hostClass = 'control-panel-ui-payment';

  @Input() payment: Payment;

  @Input() expanded = false;

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.payment.children, event.previousIndex, event.currentIndex);
  }

}
