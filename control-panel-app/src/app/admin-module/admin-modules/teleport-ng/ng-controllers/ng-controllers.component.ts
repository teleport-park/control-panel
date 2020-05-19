import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ControllersService } from '../../../../services/common-services/controllers.service';
import { TranslateService } from '../../../../common/translations-module';
import moment from 'moment';
import { CONTROLLER_SERVICE, IControllerService } from '../../../../models/intefaces';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { BaseController } from '../../../../models/controller';
import { transformToken } from '../../../../utils/utils';

export function ControllerServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new ControllersService(http, apiUrlService.getTNGControllers);
}

@Component({
    selector: 'vr-controllers',
    templateUrl: './ng-controllers.component.html',
    styleUrls: ['./ng-controllers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: CONTROLLER_SERVICE, useFactory: ControllerServiceFactory, deps: [HttpClient, ApiUrlsService]}
    ]

})
export class NgControllersComponent {

    constructor(@Inject(CONTROLLER_SERVICE) public service: IControllerService<BaseController>,
                private translations: TranslateService) {
    }
    getSecondsAgo(date: string | Date) {
        return Math.abs(moment(date).diff(Date.now(), 'seconds')) + ' ' + this.translations.instant('SECONDS_AGO');
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
