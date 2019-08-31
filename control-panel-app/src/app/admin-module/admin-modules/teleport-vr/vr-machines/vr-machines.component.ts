import { Component, OnInit } from '@angular/core';
import { TeleportVrService } from '../teleport-vr.service';

@Component({
  selector: 'mashines',
  templateUrl: './vr-machines.component.html',
  styleUrls: ['./vr-machines.component.scss']
})
export class VrMachinesComponent implements OnInit {

  constructor(public service: TeleportVrService) { }

  ngOnInit() {
  }

  grant(token: string) {
    this.service.grantTVRInstance(token).subscribe(result => {
      console.log(result);
      this.service.getTVRInstances();
    });
  }

  revoke(token: string) {
    this.service.revokeTVRInstance(token).subscribe(result => {
      console.log(result);
      this.service.getTVRInstances();
    });
  }
}
