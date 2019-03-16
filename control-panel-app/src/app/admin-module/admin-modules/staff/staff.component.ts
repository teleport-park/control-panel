import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'control-panel-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  /**
   * component title
   */
  TITLE: string = 'ADMIN_MENU_STAFF';

  constructor() { }

  ngOnInit() {
  }

}
