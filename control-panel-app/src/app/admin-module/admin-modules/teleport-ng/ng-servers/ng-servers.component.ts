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
import { VRGame } from '../../../../models/vr-game.model';
import { NgGamesService } from '../ng-games/services/ng-games.service';

@Component({
    selector: 'ng-servers',
    templateUrl: './ng-servers.component.html',
    styleUrls: ['./ng-servers.component.scss']
})

export class NgServersComponent implements OnInit, OnDestroy {

    _controllerTypes: string[] = ['playvr', 'polygon'];

    _filterTypes: string[] = ['all', ...this._controllerTypes];

    _games: { server: string, games: VRGame[] };

    private destroyed$: Subject<boolean> = new Subject();

    @ViewChild('formTemplate', {static: true}) formTemplate: TemplateRef<any>;

    @ViewChild('games', {static: true}) games: TemplateRef<any>;

    form: FormGroup;

    _dialog: MatDialogRef<any>;

    _edit: boolean = false;

    _editInstanceId: string;

    _typeFilterControl: FormControl = new FormControl('all');

    constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<TNGController>,
                private gameService: NgGamesService,
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
                    urlPattern
                )]
            ],
            name: '',
            type: 'playvr',
            enabled: true
        });
    }

    getServerGames(item: TNGController) {
        this.service.getServersGames(item.id).subscribe(res => {
            this._games = {server: item.display_name || item.address, games: res};
            this.dialog.open(this.games);
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
