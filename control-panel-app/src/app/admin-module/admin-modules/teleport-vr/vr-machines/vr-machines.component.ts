import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService } from '../../../../models/intefaces';
import { TVRController } from '../../../../models/controller';
import { TranslateService } from '../../../../common/translations-module';
import { transformToken } from '../../../../utils/utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { Subject } from 'rxjs';
import { NGGame } from '../../../../models/game.model';

// export function ControllerServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
//     return new ControllersService(http, apiUrlService.getTVRMachines, mockData);
// }

const modalConfig: MatDialogConfig = {
    width: '400px'
};

@Component({
    selector: 'vr-machines',
    templateUrl: './vr-machines.component.html',
    styleUrls: ['./vr-machines.component.scss'],
    providers: [
        // {provide: CONTROLLER_SERVICE, useFactory: ControllerServiceFactory, deps: [HttpClient, ApiUrlsService]}
    ]
})
export class VrMachinesComponent implements OnInit, OnDestroy {

    @ViewChild('registerForm') registerForm: TemplateRef<any>;

    @ViewChild('editForm') editForm: TemplateRef<any>;

    @ViewChild('games', {static: true}) games: TemplateRef<any>;

    _form: FormGroup;

    _dialog: MatDialogRef<any>;

    _games: { server: string, games: NGGame[] };

    private destroyed$: Subject<boolean> = new Subject();

    constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<TVRController>,
                private translations: TranslateService,
                private fb: FormBuilder,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.service.getInstances();
        this.service.operationSuccess$.pipe().subscribe(
            _ => {
                this._dialog && this._dialog.close();
            }
        );
    }

    _transformToken(token: string) {
        return transformToken(token);
    }

    registerHandler(item: TVRController) {
        this.initForm();
        this._dialog = this.dialog.open(this.registerForm, {
            ...modalConfig,
            data: item
        });
    }

    toggle(item: TVRController) {
        this.service.toggle(item, item.access_token);
    }

    edit(item: TVRController) {
        this.initForm(item);
        this._dialog = this.dialog.open(this.editForm, {
            ...modalConfig,
            data: item
        });
    }

    remove(item: TVRController) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: this.translations.instant('DIALOG_CONFIRM_SERVER_MESSAGE', [item.display_name])
            } as ConfirmDialogData
        }).afterClosed().subscribe(res => {
            if (res) {
                this.service.remove(item.access_token);
            }
        });
    }

    submit(item: TVRController) {
        this.service.update(this._form.getRawValue(), item.access_token);
    }

    register(item: TVRController) {
        this.service.register({...item, ...this._form.getRawValue()});
    }

    getServerGames(item: TVRController) {
        this.service.getServersGames(item.access_token).subscribe(
            res => {
                this._games = {server: item.display_name || item.address, games: res};
                this.dialog.open(this.games);
            }
        );
    }

    private initForm(init?: Partial<{ name: string, enabled }>) {
        this._form = this.fb.group({
            name: '',
            enabled: true
        });
        init && this._form.patchValue(init);
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
