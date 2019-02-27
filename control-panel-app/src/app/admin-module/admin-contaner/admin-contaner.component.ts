import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material";

@Component({
  selector: 'app-admin-contaner',
  templateUrl: './admin-contaner.component.html',
  styleUrls: ['./admin-contaner.component.scss']
})
export class AdminContanerComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  sidenavOpen() {
    this.sidenav.open();
  }

}
