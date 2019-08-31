import { Component, OnInit } from '@angular/core';
import { TeleportVrService } from '../teleport-vr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mashines',
  templateUrl: './vr-machines.component.html',
  styleUrls: ['./vr-machines.component.scss']
})
export class VrMachinesComponent implements OnInit {

  _instances: Observable<any[]>;

  constructor(public service: TeleportVrService) { }

  ngOnInit() {
    this._instances = this.service.getTVRInstances();
  }

}
