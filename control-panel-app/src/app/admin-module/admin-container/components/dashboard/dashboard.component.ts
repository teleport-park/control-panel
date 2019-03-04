import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  TITLE: string = 'ADMIN_MENU_DASHBOARD';

  constructor() { }

  ngOnInit() {
  }

}
