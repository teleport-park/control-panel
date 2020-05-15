import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Game } from './games.model';
import { SelectionModel } from '@angular/cdk/collections';
import { GamesService } from './services/games.service';
import { TranslateService } from '../../../../common/translations-module';
import { FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LoaderService } from '../../../../services/loader.service';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

    @ViewChild('priceDialogTemplate', {static: false}) priceDialog: TemplateRef<any>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    displayedColumns: string[] = ['select', 'name', 'source', 'active', 'price'];

    dataSource: MatTableDataSource<Game>;

    selection = new SelectionModel<Game>(true, []);

    _editRow: Game[] = null;

    _editRowPrice: { amount: number, currency: string } = null;

    priceControl: FormControl = new FormControl(0, [Validators.required, Validators.pattern('[0-9\.]+')]);

    currencyControl: FormControl = new FormControl('TLPVR', Validators.required);

    constructor(private service: GamesService,
                private cd: ChangeDetectorRef,
                private dialog: MatDialog,
                public loaderService: LoaderService,
                public translation: TranslateService) {
    }

    ngOnInit(): void {
        this.service.games$.subscribe((res: Game[]) => {
            this.dataSource = new MatTableDataSource<Game>(res);
            if (res.length > 10) {
                this.dataSource.paginator = this.paginator;
            }
            this._editRow = null;
            this.cd.markForCheck();
        });
        this.service.getGames();
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            // this.dataSource.data.forEach(row => this.selection.select(row));
            this.dataSource.filteredData.forEach(row => this.selection.select(row));
    }

    inlineChangePriceHandler(game: Game) {
        // const payload = {
        //     id: game.id,
        //     price: {
        //         amount: +game.price.amount,
        //         currency: game.price.currency
        //     }
        // };
        // this.service.updatePrice([payload as Game]).subscribe(
        //     (res: Game[]) => {
        //         this.dataSource = new MatTableDataSource<Game>(res);
        //         if (res.length > 10) {
        //             this.dataSource.paginator = this.paginator;
        //         }
        //         this._editRowId = null;
        //         this.cd.markForCheck();
        //     }
        // );
        this.priceControl.setValue(game.price.amount);
        this._editRow = [game];
        this.changePriceForSelectedHandler();
    }

    changePriceForSelectedHandler() {
        this.selection.selected.length === 1 && this.priceControl.setValue(this.selection.selected[0].price.amount);
        this.dialog.open(this.priceDialog, {
            width: '500px'
        });
    }

    applyFilter(value) {
        this.dataSource.filter = value;
    }

    // revertPrice(id: string) {
    //     this.dataSource.data.find(i => i.id === this._editRow).price = this._editRowPrice;
    //     this._editRow = id;
    //     this.cd.markForCheck();
    // }

    applyPrice() {
        this.currencyControl.markAsTouched();
        this.priceControl.markAsTouched();
        if (this.currencyControl.invalid || this.priceControl.invalid) {
            return;
        }
        const requests = [];
        this.selection.selected.forEach((item: Game) => {
            const payload = {
                id: item.id,
                price: {
                    amount: +this.priceControl.value,
                    currency: this.currencyControl.value
                }
            };
            requests.push(this.service.updatePrice([payload as Game]));
        });
        this._editRow.forEach((item: Game) => {
            const payload = {
                id: item.id,
                price: {
                    amount: +this.priceControl.value,
                    currency: this.currencyControl.value
                }
            };
            requests.push(this.service.updatePrice([payload as Game]));
        });
        // const payload = this.selection.selected.map((item: Game) => {
        //    return {
        //       id: item.id,
        //       price: {
        //          amount: +this.priceControl.value,
        //          currency: this.currencyControl.value
        //       }
        //    };
        // });
        // this.service.updatePrice(payload as Game[]);
        this.loaderService.dispatchShowLoader(true, 10);
        forkJoin(requests).subscribe((res: Game[][]) => {
            const result = res[res.length - 1];
            this.dataSource.data.forEach(item => {
                item.price = (result.find(i => i.id === item.id) || {price: null}).price || item.price;
            });
            this.cd.markForCheck();
            this.loaderService.dispatchShowLoader(false);
            this.dialog.closeAll();
            this.reset();
        });
    }

    reset() {
        this.priceControl.setValue(0);
        this._editRow = [];
    }
}
