import { Component, Inject, OnInit } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService } from '../../../../models';
import { CashBoxController, TVRController } from '../../../../models/controller';

@Component({
  selector: 'cashbox-machines',
  templateUrl: './cashbox-machines.component.html',
  styleUrls: ['./cashbox-machines.component.scss']
})
export class CashboxMachinesComponent implements OnInit {

  constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<CashBoxController>) { }

  ngOnInit() {
  }

  grant(item: TVRController) {
    this.service.grant(item);
  }

  revoke(item: TVRController) {
    this.service.revoke(item);
  }

}
