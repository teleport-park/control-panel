import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'control-panel-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  /**
   * columns
   */
  columns: string[] = ['name', 'permissions'];
  /**
   * mock object
   */
  data = [
    {name: 'Administrator', permissions: ['read', 'write', 'delete']},
    {name: 'Manager', permissions: ['read', 'write']},
    {name: 'Worker', permissions: ['read']},
    {name: 'Office manager', permissions: []}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
