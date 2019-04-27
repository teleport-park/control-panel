import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Package } from './control-panel-ui-package.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'control-panel-ui-package',
  templateUrl: './control-panel-ui-package.component.html',
  styleUrls: ['./control-panel-ui-package.component.scss']
})
export class ControlPanelUiPackageComponent implements OnInit {

  @HostBinding('class')
  hostClass = 'control-panel-ui-package';

  @Input() package: Package;

  @Input() expanded = false;

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.package.payments, event.previousIndex, event.currentIndex);
  }

}
