import { Component, OnInit } from '@angular/core';
import { PromoService } from './services/promo.service';
import { TranslateService } from '../../../../../common/translations-module';

@Component({
    selector: 'promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss'],
    providers: [PromoService]
})
export class PromoComponent implements OnInit {

    displayedColumns: string[] = ['display_name', 'packages', 'archived', 'enabled'];

    constructor(public service: PromoService, public translationService: TranslateService) {
    }

    ngOnInit() {
        this.service.getPromo();
    }

}
