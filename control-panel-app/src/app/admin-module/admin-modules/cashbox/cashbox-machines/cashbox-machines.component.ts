import { Component, Inject } from '@angular/core';
import { CashBoxController } from '../../../../models/controller';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { ControllersService } from '../../../../services/common-services/controllers.service';
import { CONTROLLER_SERVICE, IControllerService } from '../../../../models/intefaces';
import { TranslateService } from '../../../../common/translations-module';
import { transformToken } from '../../../../utils/utils';
import moment from 'moment';

export function ControllerServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new ControllersService(http, apiUrlService.getCashBox);
}

@Component({
    selector: 'cashbox-machines',
    templateUrl: './cashbox-machines.component.html',
    styleUrls: ['./cashbox-machines.component.scss'],
    providers: [
        {provide: CONTROLLER_SERVICE, useFactory: ControllerServiceFactory, deps: [HttpClient, ApiUrlsService]}
    ]
})
export class CashboxMachinesComponent {

    constructor(@Inject(CONTROLLER_SERVICE) public service: IControllerService<CashBoxController>,
                public translations: TranslateService) {
    }

    toggle(item: CashBoxController) {
        this.service.toggle({enabled: !item.enabled}, item.access_token);
    }

    getSecondsAgo(date: string | Date) {
        return Math.abs(moment(date).diff(Date.now(), 'seconds')) + ' ' + this.translations.instant('SECONDS_AGO');
    }

    _transformToken(token: string) {
        return transformToken(token);
    }
}
