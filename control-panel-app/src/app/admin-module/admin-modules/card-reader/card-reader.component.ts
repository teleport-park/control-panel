import { Component, Inject } from '@angular/core';
import { CONTROLLER_SERVICE, IControllerService } from '../../../models/intefaces';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { ControllersService } from '../../../services/common-services/controllers.service';
import { CardReaderController } from '../../../models/controller/card-reader-controller.model';
import { TranslateService } from '../../../common/translations-module';

const mock = [
  new CardReaderController({id: 1, name: 'TEST_1', enabled: true}),
  new CardReaderController({id: 2, name: 'TEST_2', enabled: false}),
  new CardReaderController({id: 3, name: 'TEST_3', enabled: true}),
  new CardReaderController({id: 4, name: 'TEST_4', enabled: false}),
]

export function ControllerServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
  return new ControllersService(http, apiUrlService.getCardReaders, mock);
}

@Component({
  selector: 'card-reader',
  templateUrl: './card-reader.component.html',
  styleUrls: ['./card-reader.component.scss'],
  providers: [
    {provide: CONTROLLER_SERVICE, useFactory: ControllerServiceFactory, deps: [HttpClient, ApiUrlsService]}
  ]
})
export class CardReaderComponent {

  constructor(@Inject(CONTROLLER_SERVICE) public service: IControllerService<CardReaderController>,
              public translations: TranslateService) {
  }

  toggle(item: CardReaderController) {
    this.service.toggle({enabled: !item.enabled}, item.id);
  }

}
