import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { ControllersService } from '../../../../services/common-services/controllers.service';
import { CONTROLLER_SERVICE, IControllerService } from '../../../../models/intefaces';
import { TVRController } from '../../../../models/controller';
import { TranslateService } from '../../../../common/translations-module';

const mockData = [
    {
        uuid: '61f1cc5d-d50e-4235-8c69-1cae523fee98',
        authorized: false,
        ip: '186.195.80.18',
        online: false,
        games: 31
    },
    {
        uuid: '81c3a7d6-f53b-4216-a048-2c9afc67516f',
        authorized: false,
        ip: '15.30.116.98',
        online: true,
        games: 25
    },
    {
        uuid: 'b3ee9894-5016-4f7f-b01b-55a37e51cabd',
        authorized: false,
        ip: '152.19.148.132',
        online: false,
        games: 20
    },
    {
        uuid: 'dadbcc70-ee06-46e2-82e5-69089d699699',
        authorized: true,
        ip: '177.27.119.67',
        online: true,
        games: 37
    },
    {
        uuid: '80a91440-c14f-4f82-9f2e-ae3bca7602ca',
        authorized: true,
        ip: '120.19.219.26',
        online: true,
        games: 40
    },
    {
        uuid: '8dbd3600-9261-421a-88f0-29ce7ef8c6ec',
        authorized: false,
        ip: '183.221.6.164',
        online: false,
        games: 38
    },
    {
        uuid: '31cca0c3-ed1b-422b-b6c0-c21c73b638e1',
        authorized: false,
        ip: '2.153.72.187',
        online: true,
        games: 38
    }
];

export function ControllerServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new ControllersService(http, apiUrlService.getTVRMachines, mockData);
}

@Component({
    selector: 'vr-machines',
    templateUrl: './vr-machines.component.html',
    styleUrls: ['./vr-machines.component.scss'],
    providers: [
        {provide: CONTROLLER_SERVICE, useFactory: ControllerServiceFactory, deps: [HttpClient, ApiUrlsService]}
    ]
})
export class VrMachinesComponent {

    constructor(@Inject(CONTROLLER_SERVICE) public service: IControllerService<TVRController>,
                private translateService: TranslateService) {
    }


    grant(item: TVRController) {
        this.service.grant(item, item.uuid);
    }

    revoke(item: TVRController) {
        this.service.revoke(item, item.uuid);
    }
}
