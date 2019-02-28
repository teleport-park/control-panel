import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material";

@Component({
  selector: 'app-admin-contaner',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss']
})
export class AdminContainerComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  sidenavOpen() {
    this.sidenav.open();
  }

}
