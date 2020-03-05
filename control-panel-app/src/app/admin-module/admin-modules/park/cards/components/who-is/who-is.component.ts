import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { WhoIsResponse } from './who-is.model';
import { FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio/typings/radio';

@Component({
    selector: 'who-is',
    templateUrl: './who-is.component.html',
    styleUrls: ['./who-is.component.scss']
})
export class WhoIsComponent implements OnInit {

    _cardNumber: string;

    _result: WhoIsResponse;

    _mode: FormControl = new FormControl('int');

    _control: FormControl = new FormControl('', [Validators.pattern('[0-9]+'), Validators.max(4294967295)]);

    constructor(private service: CardsService, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.service.whoIsResult$.subscribe(res => {
            this._result = res;
            this.cd.markForCheck();
        });
    }

    changeModeHandler(event: MatRadioChange) {
        if (event.value === 'int') {
            this._control.setValidators([Validators.pattern('[0-9]+'), Validators.max(4294967295)]);
            const value = this._control.value;
            this._control.markAsTouched();
            if (this._control.valid) {
                this._control.setValue(parseInt(value, 16));
            }
            this._control.updateValueAndValidity();
        } else {
            this._control.setValidators([Validators.pattern('[0-9A-Fa-f]+')]);
            const value = (+this._control.value).toString(16);
            this._control.markAsTouched();
            if (this._control.valid) {
                this._control.setValue(value);
            }
            this._control.updateValueAndValidity();
        }
    }

    searchCard() {
        if (this._control.value) {
            const req = this._mode.value === 'int' ? parseInt(this._control.value, 16) : this._control.value;
            this.service.whoIs(req);
            return;
        }
        this.service.resetWhoIsResult();
    }

    getKeys(obj: object) {
        return Object.keys(obj);
    }
}
