import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PromoService } from './services/promo.service';
import { TranslateService } from '../../../../common/translations-module';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CronOptions } from '../../../../common/control-panel-cron-generator/CronOptions';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { Promo } from './promo.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';

const cloneDeep = require('lodash.clonedeep');

@Component({
    selector: 'promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss'],
    providers: [PromoService]
})
export class PromoComponent implements OnInit {

    @ViewChild('formTeml', {static: true}) formTeml: TemplateRef<any>;

    cronOptions: CronOptions = {
        defaultTime: '00:00:00',
        hideMinutesTab: true,
        hideHourlyTab: true,
        hideDailyTab: false,
        hideWeeklyTab: false,
        hideMonthlyTab: false,
        hideYearlyTab: true,
        hideAdvancedTab: true,
        hideSpecificWeekDayTab : false,
        hideSpecificMonthWeekTab : false,
        use24HourTime: true,
        hideSeconds: false,
        cronFlavor: 'standard' // standard or quartz
    };

    cronControl: FormControl;

    displayedColumns: string[] = ['order', 'display_name', 'packages', 'games', 'conditions', 'removed', 'archived', 'enabled', 'action'];

    dataSource: MatTableDataSource<Promo> = new MatTableDataSource<Promo>();

    form: FormGroup;

    _dialog: MatDialogRef<any>;

    constructor(public service: PromoService,
                public translationService: TranslateService,
                private fb: FormBuilder,
                private dialog: MatDialog,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.service.promo$.subscribe(
            res => {
                this._dialog && this._dialog.close();
                this.dataSource.data = res;
            }
        );
        this.service.getPromo();
        this.cronControl = new FormControl('0 0 1/1 * *');
    }

    onListDrop(event: CdkDragDrop<Promo[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.dataSource.data = cloneDeep(this.dataSource.data);
        setTimeout(() => {
            this.dataSource.data[event.currentIndex].moved = true;

            this.dataSource.data[event.previousIndex].movedFrom = true;
            // this.dataSource.data[event.previousIndex].priority = this.dataSource.data[event.currentIndex].priority;
            this.dataSource.data[event.currentIndex].priority = this.dataSource.data[event.currentIndex + 1] ? this.dataSource.data[event.currentIndex + 1].priority :
                this.dataSource.data[event.currentIndex - 1].priority - 1;
            this.changePriority(this.dataSource.data[event.currentIndex]);
            this.cd.markForCheck();
            setTimeout(() => {
                this.reset();
            }, 100);
        }, 1);

    }

    reset(e?: CdkDragStart, index?: number) {
        this.dataSource.data.forEach(i => {
           delete i.moved;
           delete i.movedFrom;
        });
        this.cd.markForCheck();
    }

    add() {
        this.initForm();
        this._dialog = this.dialog.open(this.formTeml, {
            width: '500px'
        });
    }

    toggle({id, enabled, priority}: Promo) {
        const payload = {enabled: !enabled, priority};
        this.service.patchPromo(id, payload);
    }

    edit(promo: Promo) {
        this.initForm();
        this.form.patchValue(promo);
        this._dialog = this.dialog.open(this.formTeml, {
            width: '500px'
        });
    }

    delete(promo: Promo) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: 'DIALOG_PROMO_DELETE_MESSAGE',
                messageParams: [
                    promo.name || promo.display_name
                ]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .subscribe((res) => {
            if (!res) {
                return;
            }
            this.service.deletePromo(promo.id);
            this.cd.markForCheck();
        });

    }

    changePriority({id, enabled, priority}: Promo) {
        const payload = {enabled, priority};
        this.service.patchPromo(id, payload);
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const payload = this.form.getRawValue() as Promo;
        if (!payload.id) {
            delete payload.id;
            this.service.addPromo(payload);
        } else {
            const id = payload.id;
            delete payload.id;
            this.service.editPromo(payload, id);
        }

    }

    private initForm() {
        this.form = this.fb.group({
            id: null,
            name: '',
            notes: '',
            enabled: false,
            conditions: this.fb.group({
                first_fill: false,
                schedule: null
            })
        });
    }
}
