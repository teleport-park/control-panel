import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'control-panel-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  /**
   * component title
   */
  TITLE: string = 'ADMIN_MENU_ROLES';

  constructor() { }

  ngOnInit() {
  }

}
