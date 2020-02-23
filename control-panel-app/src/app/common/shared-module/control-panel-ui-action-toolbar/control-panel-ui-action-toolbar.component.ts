import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'control-panel-ui-action-toolbar',
   templateUrl: './control-panel-ui-action-toolbar.component.html',
   styleUrls: ['./control-panel-ui-action-toolbar.component.scss']
})
export class ControlPanelUiActionToolbarComponent {

   @Input() mode: 'add' | 'edit' = 'add';

   @Input() confirmLabel: string;


   @Output() confirm: EventEmitter<void> = new EventEmitter();
   @Output() cancel: EventEmitter<void> = new EventEmitter();

   constructor() {
   }

}
