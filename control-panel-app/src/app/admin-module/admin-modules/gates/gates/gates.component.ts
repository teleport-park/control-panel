import { Component, Inject } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService } from '../../../../models';
import { GateController } from '../../../../models/controller';

@Component({
    selector: 'gates',
    templateUrl: './gates.component.html',
    styleUrls: ['./gates.component.scss']
})
export class GatesComponent {

    constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<GateController>) {
    }

    grant(item: GateController) {
        this.service.grant(item);
    }

    revoke(item: GateController) {
        this.service.revoke(item);
    }

}
