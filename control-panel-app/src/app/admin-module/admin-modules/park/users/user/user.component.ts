import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Visitor } from '../../../../../models';
import { TranslateService } from '../../../../../common/translations-module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ENTITY_SERVICE, EntityService } from '../../../../../models/intefaces';
import moment from 'moment';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    @ViewChild('form', {static: true}) form: TemplateRef<any>;

    /**
     * user id
     */
    userId: string;

    /**
     * user
     */
    _user: Visitor;

    _dialog: MatDialogRef<any>;

    private destroyed$: Subject<boolean> = new Subject();

    /**
     * constructor
     * @param service
     * @param route
     * @param router
     * @param translations
     * @param cd
     * @param dialog
     */
    constructor(@Inject(ENTITY_SERVICE) private service: EntityService<Visitor>,
                private route: ActivatedRoute,
                private router: Router,
                public translations: TranslateService,
                private cd: ChangeDetectorRef,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        this.service.entities$.subscribe(
            _ => {
                if (this._dialog) {
                    this._dialog.close();
                    this.service.getEntity(this.userId).subscribe((res: Visitor) => {
                        this._user = res;
                        this.cd.markForCheck();
                    });
                }
            }
        );
        this.service.getEntity(this.userId).subscribe((res: Visitor) => {
            this._user = res;
            this.cd.markForCheck();
        });
    }

    /**
     * back to users
     */
    back() {
        this.router.navigate(['admin', 'park', 'visitors']);
    }

    getUserDOB(date: string) {
        return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
    }

    getBalance(balance: { currency: string, amount: number }[]): number | string {
        if (!balance) {
            return 'N/A';
        }
        const amount = balance.map(i => i.amount).reduce((prev: number, curr: number) => prev + curr);
        return +amount.toFixed(2);
    }

    openModalDialog(user: Visitor) {
        this._dialog = this.dialog.open(this.form, {
            data: user,
            disableClose: true
        });
    }

    submit(visitor: Visitor) {
        this.service.editEntity(visitor);
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
