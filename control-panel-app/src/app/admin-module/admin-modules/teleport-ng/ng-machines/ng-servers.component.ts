import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService } from '../../../../models';
import { TNGController } from '../../../../models/controller';
import { MatDialog, MatDialogRef, MatRadioChange } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { TranslateService } from '../../../../common/translations-module';
import { urlPattern } from '../../../../utils/utils';

@Component({
    selector: 'ng-servers',
    templateUrl: './ng-servers.component.html',
    styleUrls: ['./ng-servers.component.scss']
})
export class NgServersComponent implements OnInit, OnDestroy {



    _controllerTypes: string[] = ['playvr', 'polygon'];

    _filterTypes: string[] = ['all', ...this._controllerTypes];

    private destroyed$: Subject<boolean> = new Subject();

    @ViewChild('formTemplate', {static: true}) formTemplate: TemplateRef<any>;

    form: FormGroup;

    _dialog: MatDialogRef<any>;

    _edit: boolean = false;

    _editInstanceId: string;

    _typeFilterControl: FormControl = new FormControl('all');

    constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<TNGController>,
                public translations: TranslateService,
                private fb: FormBuilder,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.service.getInstances();
        this.service.operationSuccess$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
            this._dialog && this._dialog.close();
            this._editInstanceId = null;
        });
    }

    grant(item: TNGController) {
        this.service.grant(item);
    }

    revoke(item: TNGController) {
        this.service.revoke(item);
    }

    add() {
        this.initForm();
        this._edit = false;
        this._dialog = this.dialog.open(this.formTemplate, {
            width: '500px'
        });
    }

    edit(item: TNGController) {
        this.initForm();
        this.form.patchValue(item);
        this._edit = true;
        this._editInstanceId = item.id;
        this._dialog = this.dialog.open(this.formTemplate, {
            width: '500px'
        });
    }

    remove(item: TNGController) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: this.translations.instant('DIALOG_CONFIRM_SERVER_MESSAGE', [item.display_name])
            } as ConfirmDialogData
        }).afterClosed().subscribe(res => {
            if (res) {
                this.service.remove(item.id);
            }
        });
    }

    toggle(item: TNGController) {
        this.service.toggle(item);
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this._edit ? this.service.update(this.form.getRawValue(), this._editInstanceId) : this.service.add(this.form.getRawValue());
    }

    typeFilterHandler(event: MatRadioChange) {
        this.service.filterInstanceByType(event.value);
    }

    private initForm() {
        this.form = this.fb.group({
            address: ['', [
                Validators.required,
                Validators.pattern(
                // '(?:https?)://(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'
                    urlPattern
                )]
            ],
            name: '',
            type: 'playvr',
            enabled: true
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
