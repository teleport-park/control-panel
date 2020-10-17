import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Game, IPrice, Price} from './model/games.model';
import { SelectionModel } from '@angular/cdk/collections';
import { GamesService } from './services/games.service';
import { TranslateService } from '../../../../common/translations-module';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../../../services/loader.service';
import { Router } from '@angular/router';
import { Currencies } from '../../../utils/utils';
import { Promo } from '../promo/promo.model';
import { PromoService } from '../promo/services/promo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {IPackage} from '../packages/package.model';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

    static readonly MAX_PLAYERS: number = 5;

    _durations: number[] = [15, 30, 45, 60];

    // @ViewChild('priceDialogTemplate') priceDialog: TemplateRef<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    // _currencies = Currencies;
    //
    // _excludedPromo: string[] = [];

    displayedColumns: string[] = ['name', 'category', 'maxPlayers', 'maxDuration', 'price', 'edit'];

    dataSource: MatTableDataSource<IPrice>;

    selection = new SelectionModel<IPrice>(true, []);

    _editRow: IPrice = null;

    prices: FormArray;

    _form: FormGroup;

    promos: Promo[];

    _players: number[] = [];

    constructor(private service: GamesService,
                private promoService: PromoService,
                private cd: ChangeDetectorRef,
                private fb: FormBuilder,
                public loaderService: LoaderService,
                public translations: TranslateService) {
    }

    ngOnInit(): void {
        this.service.games$.subscribe((res: IPrice[]) => {
            this.dataSource = new MatTableDataSource<IPrice>(res);
            if (res.length > 10) {
                this.dataSource.paginator = this.paginator;
            }
            this._editRow = null;
            this.cd.markForCheck();
        });

        for (let i = 1; i <= GamesComponent.MAX_PLAYERS; i++) {
            this._players.push(i);
        }
    }

    applyFilter(value) {
        this.dataSource.filter = value;
    }

    reset() {
        this._editRow = null;
    }

    edit(price: IPrice) {
        this._editRow = price;
        this._form = this.initForm(price)
    }

    save() {
        if (this._form.valid) {
            let data;
            const request = this._form.getRawValue() as IPrice;
            // TODO API implementation here
            data = this.dataSource.data.map((pack: IPrice) => {
                return pack.id === request.id ? request : pack
            })
            this.dataSource = new MatTableDataSource(data);
            this._form = null;
            this._editRow = null;
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
            })
        })
        initData && form.patchValue(initData);
        return form
    }

    // isAllSelected() {
    //     const numSelected = this.selection.selected.length;
    //     const numRows = this.dataSource.data.length;
    //     return numSelected === numRows;
    // }

    // masterToggle() {
    //     this.isAllSelected() ?
    //         this.selection.clear() :
    //         this.dataSource.filteredData.forEach(row => this.selection.select(row));
    // }

    // inlineChangePriceHandler(game: IPrice) {
    //     this._editRow = game;
    //     this.changePriceForSelectedHandler(game);
    // }

    // changePriceForSelectedHandler(game?: IPrice) {
    //     this.selection.selected.length === 1 || game ? this.initForm(this.selection.selected[0] || game) : this.initForm();
    //     this.updateExcludedPromo();
    //     this.dialog.open(this.priceDialog, {
    //         width: '500px'
    //     });
    // }

    // applyPrice() {
    //     this.form.markAllAsTouched();
    //     if (this.form.invalid) {
    //         return;
    //     }
    //
    //     const requests = [];
    //     const prices = this.form.getRawValue();
    //     prices.prices.forEach(price => {
    //         price.promo_id = price.promo_id === 'null' ? null : price.promo_id;
    //         price.amount = Number(price.amount);
    //     });
    //     this.selection.selected.forEach((item: IPrice) => {
    //         const payload = {
    //             id: item.id,
    //             ...prices
    //         };
    //         requests.push(payload as Game);
    //     });
    //     if (this._editRow) {
    //         const payload = {
    //             id: this._editRow.id,
    //             ...prices
    //         };
    //         requests.push(payload as Game);
    //     }
    //     this.loaderService.dispatchShowLoader(true, 10);
    //     this.service.updatePrice(requests).subscribe(
    //         (_: Game[]) => {
    //             this.service.getGames();
    //             this.cd.markForCheck();
    //             this.loaderService.dispatchShowLoader(false);
    //             this.dialog.closeAll();
    //             this.reset();
    //         }
    //     );
    // }

    // private initForm(game?: IPrice) {
    //     this.promos = [{
    //         id: 'null',
    //         display_name: this.translations.instant('DEFAULT_PROMO'),
    //         enabled: true
    //     } as Promo, ...this.promoService.promo$.getValue()].filter(i => !i.removed);
    //     if (game) {
    //         // this.prices = this.fb.array([]);
    //         // game.prices.forEach((price: Price) => {
    //         //     const control = this.fb.group({
    //         //         promo_id: 'null',
    //         //         currency: this._currencies[0],
    //         //         amount: ['', Validators.required]
    //         //     });
    //         //     control.patchValue({...price, ...{promo_id: price.promo_id ? price.promo_id : 'null'}});
    //         //     this.prices.push(control);
    //         // });
    //     } else {
    //         this.prices = this.fb.array([this.fb.group(
    //             {
    //                 promo_id: 'null',
    //                 currency: this._currencies[0],
    //                 amount: ['', Validators.required]
    //             }
    //         )]);
    //     }
    //     this.form = this.fb.group({
    //         prices: this.prices
    //     });
    // }

    // addPrice() {
    //     this.prices.push(this.fb.group({
    //         promo_id: 'null',
    //         currency: this._currencies[0],
    //         amount: ['', Validators.required]
    //     }));
    //     this.updateExcludedPromo();
    // }
    //
    // deletePrice(index: number) {
    //     this.prices.removeAt(index);
    // }
    //
    // excludePromo(value: string, index: number) {
    //     if (value === 'null') {
    //         return true;
    //     }
    //     if (this.prices.at(index).get('promo_id').value === value) {
    //         return true;
    //     }
    //     return !this._excludedPromo.includes(value);
    // }
    //
    // updateExcludedPromo() {
    //     this._excludedPromo = this.prices.getRawValue().map(i => i.promo_id).filter(i => i !== 'null');
    // }

    // dropPrice(event: CdkDragDrop<AbstractControl[]>) {
    //     moveItemInArray(this.prices.controls, event.previousIndex, event.currentIndex);
    // }
}
