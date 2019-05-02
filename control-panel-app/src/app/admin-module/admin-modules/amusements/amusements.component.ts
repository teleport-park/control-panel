import { Component, OnInit } from '@angular/core';

export interface AmusementsItem {
  name: string;
  logo: string;
  desc: string[];
}

@Component({
  selector: 'control-panel-amusement',
  templateUrl: './amusements.component.html',
  styleUrls: ['./amusements.component.scss']
})
export class AmusementsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
