import { Component, Inject, OnInit } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService } from '../../../../models/intefaces';
import { TVRController } from '../../../../models/controller';
import { TranslateService } from '../../../../common/translations-module';
import { transformToken } from '../../../../utils/utils';

// export function ControllerServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
//     return new ControllersService(http, apiUrlService.getTVRMachines, mockData);
// }


@Component({
    selector: 'vr-machines',
    templateUrl: './vr-machines.component.html',
    styleUrls: ['./vr-machines.component.scss'],
    providers: [
        // {provide: CONTROLLER_SERVICE, useFactory: ControllerServiceFactory, deps: [HttpClient, ApiUrlsService]}
    ]
})
export class VrMachinesComponent implements OnInit {

    constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<TVRController>,
                private translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.service.getInstances();
    }

    _transformToken(token: string) {
        return transformToken(token);
    }

    register(item: TVRController) {
        const {name, machine_token} = item;
        this.service.register({name, enabled: !item.enabled}, machine_token);
    }
}
