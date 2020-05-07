import { Component, Inject, OnInit } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService } from '../../../../models';
import { GateController } from '../../../../models/controller';

@Component({
    selector: 'gates',
    templateUrl: './gates.component.html',
    styleUrls: ['./gates.component.scss']
})
export class GatesComponent implements OnInit {

    constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<GateController>) {
    }

    ngOnInit(): void {
        this.service.getInstances();
    }

    // grant(item: GateController) {
    //     this.service.grant(item);
    // }
    //
    // revoke(item: GateController) {
    //     this.service.revoke(item);
    // }

}
