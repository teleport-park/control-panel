import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.sass']
})
export class DeviceComponent implements OnInit {

  deviceId: string;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    console.log('---', this.deviceId);
  }

  ngOnInit() {
  }

}
