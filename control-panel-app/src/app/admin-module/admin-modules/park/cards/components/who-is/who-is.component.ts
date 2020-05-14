import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { WhoIsResponse } from './who-is.model';
import { FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio/typings/radio';
import { to4Hex } from '../../../../../utils/utils';

@Component({
    selector: 'who-is',
    templateUrl: './who-is.component.html',
    styleUrls: ['./who-is.component.scss']
})
export class WhoIsComponent implements OnInit {

    _result: WhoIsResponse;

    _control: FormControl = new FormControl('',  [Validators.pattern('[0-9A-Fa-f]+'), Validators.max(4294967295)]);

    constructor(private service: CardsService, private cd: ChangeDetectorRef) {
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
            }
            return;
        }
        this.service.resetWhoIsResult();
    }

    getKeys(obj: object) {
        return Object.keys(obj);
    }
}
