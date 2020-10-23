import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {IPrice, Price} from './model/games.model';
import {SelectionModel} from '@angular/cdk/collections';
import {GamesService} from './services/games.service';
import {TranslateService} from '../../../../common/translations-module';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../../services/loader.service';
import {Promo} from '../promo/promo.model';
import {PromoService} from '../promo/services/promo.service';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../../common/shared-module';
import {filter} from 'rxjs/operators';
import {PriceCategory} from '../../../../utils/utils';
import {Package} from '../packages/package.model';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

    static readonly MAX_PLAYERS: number = 5;

    _durations: number[] = [15, 30, 45, 60];

    _categories: string[] = Object.keys(PriceCategory).map(key => PriceCategory[key]);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    displayedColumns: string[] = ['name', 'category', 'maxPlayers', 'maxDuration', 'price', 'enabled', 'edit'];

    dataSource: MatTableDataSource<IPrice>;

    selection = new SelectionModel<IPrice>(true, []);

    _editPrice: IPrice = null;

    prices: FormArray;

    _form: FormGroup;

    promos: Promo[];

    _players: number[] = [];

    constructor(private service: GamesService,
                private promoService: PromoService,
                private cd: ChangeDetectorRef,
                private fb: FormBuilder,
                private dialog: MatDialog,
                public loaderService: LoaderService,
                public translations: TranslateService) {
    }

    ngOnInit(): void {
        this.service.games$.subscribe((res: IPrice[]) => {
            this.dataSource = new MatTableDataSource<IPrice>(res);
            if (res.length > 10) {
                this.dataSource.paginator = this.paginator;
            }
            this._editPrice = null;
            this.cd.markForCheck();
        });

        for (let i = 1; i <= GamesComponent.MAX_PLAYERS; i++) {
            this._players.push(i);
        }
    }

    applyFilter(value) {
        this.dataSource.filter = value;
    }

    edit(price: IPrice) {
        this._editPrice = price;
        this._form = this.initForm(price)
    }

    add() {
        const newPrice = new Price();
        const data = this.dataSource.data;
        data.push(newPrice);
        this.dataSource = new MatTableDataSource(data);
        this._form = this.initForm();
        this._form.patchValue(newPrice);
        this._editPrice = newPrice;
    }

    save() {
        if (this._form.valid) {
            const request = this._form.getRawValue() as IPrice;
            if(request.id === '-1') {
                delete request.id
            }
            this.service.updatePrice(request, request.id);
            this._form = null;
            this._editPrice = null;
        }
    }

    private initForm(initData?: IPrice) {
        const form = this.fb.group({
            id: '',
            category: '',
            name: ['', Validators.required],
            maxPlayers: null,
            maxDuration: null,
            price: this.fb.group({
                amount: [null, Validators.required],
                currency: 'TPLVR'
            }),
            enabled: true
        })
        initData && form.patchValue(initData);
        return form
    }

    delete(price: IPrice) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: 'DIALOG_REMOVE_CONFIRM_MESSAGE',
                messageParams: [price.name]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
            .pipe(filter(res => !!res))
            .subscribe(_ => {
                this.service.deletePrice(price.id);
            });
    }
}
