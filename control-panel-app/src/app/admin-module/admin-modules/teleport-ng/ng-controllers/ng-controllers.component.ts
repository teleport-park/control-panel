import { Component, Inject } from '@angular/core';
import { ControllersService } from '../../../../services/common-services/controllers.service';
import { TranslateService } from '../../../../common/translations-module';
import moment from 'moment';
import { CONTROLLER_SERVICE, IControllerService } from '../../../../models/intefaces';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { BaseController } from '../../../../models/controller';
import { transformToken } from '../../../../utils/utils';

const mockData = [
    {
        token: '5eb4171ed34ec8239e909ad7',
        type: 'playvr',
        authorized: true,
        connected: '2020-05-05T11:45:33-03:00'
    },
    {
        token: '5eb4171e1751c04f491483c1',
        type: 'playvr',
        authorized: true,
        connected: '2020-05-04T05:46:24-03:00'
    },
    {
        token: '5eb4171ee05515598f0ae14a',
        type: 'playvr',
        authorized: false,
        connected: '2020-05-05T05:19:17-03:00'
    },
    {
        token: '5eb4171ef7c5349f7cfd3c57',
        type: 'playvr',
        authorized: false,
        connected: '2020-05-01T03:25:34-03:00'
    },
    {
        token: '5eb4171e36c8f8d9c64fb13c',
        type: 'playvr',
        authorized: false,
        connected: '2020-05-05T09:41:09-03:00'
    },
    {
        token: '5eb4171e6818c7aa5dd64eb5',
        type: 'playvr',
        authorized: false,
        connected: '2020-05-02T12:10:05-03:00'
    }
];

export function ControllerServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new ControllersService(http, apiUrlService.getTNGControllers, mockData);
}

@Component({
    selector: 'vr-controllers',
    templateUrl: './ng-controllers.component.html',
    styleUrls: ['./ng-controllers.component.scss'],
    providers: [
        {provide: CONTROLLER_SERVICE, useFactory: ControllerServiceFactory, deps: [HttpClient, ApiUrlsService]}
    ]
})
export class NgControllersComponent {

    constructor(@Inject(CONTROLLER_SERVICE) public service: IControllerService<BaseController>,
                private translateService: TranslateService) {
    }

    getMinutesAgo(date: string | Date) {
        return Math.abs(moment(date).diff(Date.now(), 'minutes')) + ' ' + this.translateService.instant('MINUTES_AGO');
    }

    grant(item: BaseController) {
        this.service.grant(item);
    }

    revoke(item: BaseController) {
        this.service.revoke(item);
    }

    _transformToken(token: string) {
        return transformToken(token);
    }
}
