import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardwareService } from '../hardware/services/hardware.service';
import { TNGController, TVRController } from '../../../../models';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.sass']
})
export class DeviceComponent implements OnInit {

  device: TNGController | TVRController;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: HardwareService) {
    const deviceId = this.route.snapshot.paramMap.get('id');
    this.device = this.service.getController(deviceId);
    console.log('---', this.device);
  }

  ngOnInit() {
  }

}
