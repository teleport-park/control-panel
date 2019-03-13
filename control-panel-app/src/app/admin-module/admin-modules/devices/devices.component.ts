import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevicesComponent implements OnInit {
  /**
   * component title
   */
  TITLE: string = 'ADMIN_MENU_DEVICES';

  constructor() { }

  ngOnInit() {
  }

}