import { Component, Inject, OnInit } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService} from '../../../../models';
import { TVRController } from '../../../../models/controller';

@Component({
  selector: 'mashines',
  templateUrl: './vr-machines.component.html',
  styleUrls: ['./vr-machines.component.scss']
})
export class VrMachinesComponent implements OnInit {

  constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<TVRController>) {}

  ngOnInit() {
  }

  grant(item: TVRController) {
    this.service.grant(item);
  }

  revoke(item: TVRController) {
    this.service.revoke(item);
  }
}
