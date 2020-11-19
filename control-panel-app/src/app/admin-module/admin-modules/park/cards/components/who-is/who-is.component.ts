import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { WhoIsResponse } from './who-is.model';
import { FormControl, Validators } from '@angular/forms';
import { to4Hex } from '../../../../../utils/utils';
import { TranslateService } from '../../../../../../common/translations-module';

@Component({
    selector: 'who-is',
    templateUrl: './who-is.component.html',
    styleUrls: ['./who-is.component.scss']
})
export class WhoIsComponent implements OnInit {

    _result: WhoIsResponse;

    _control: FormControl = new FormControl('',  [Validators.pattern('[0-9A-Fa-f]+')]);

    constructor(private service: CardsService, private cd: ChangeDetectorRef, public translations: TranslateService) {
    }

    ngOnInit() {
        this.service.whoIsResult$.subscribe(res => {
            this._result = res;
            this.cd.markForCheck();
        });
    }

    searchCard() {
        if (this._control.value) {
            const value = String(this._control.value).toString();
            const req = to4Hex(value);
            if (req) {
                this.service.whoIs(req);
            } else {
                this._control.setErrors({invalid: true});
            }
            return;
        }
        this.service.resetWhoIsResult();
    }

    getRoles(roles: string[]): string {
        return roles.map(role => this.translations.instant(role)).join(', ');
    }
}
