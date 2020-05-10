import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { INSTANCE_SERVICE, InstanceService } from '../../../../models/intefaces';
import { TNGController, TVRController } from '../../../../models/controller';
import { TranslateService } from '../../../../common/translations-module';
import { transformToken } from '../../../../utils/utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ControllerGamesService } from '../../../../services/common-services/controller-games.service';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';

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
export class VrMachinesComponent implements OnInit {

    @ViewChild('registerForm', {static: false}) registerForm: TemplateRef<any>;

    @ViewChild('editForm', {static: false}) editForm: TemplateRef<any>;

    _form: FormGroup;

    _dialog: MatDialogRef<any>;

    constructor(@Inject(INSTANCE_SERVICE) public service: InstanceService<TVRController>,
                private translateService: TranslateService,
                private fb: FormBuilder,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.service.getInstances();
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
        this.service.toggle(item);
    }

    edit(item: TVRController) {
        this.initForm(item);
        this.dialog.open(this.editForm, {
            ...modalConfig,
            data: item
        });
    }

    remove(item: TVRController) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: this.translateService.instant('DIALOG_CONFIRM_SERVER_MESSAGE', [item.display_name])
            } as ConfirmDialogData
        }).afterClosed().subscribe(res => {
            if (res) {
                this.service.remove(item.id);
            }
        });
    }

    submit(item: TVRController) {
        this.service.update(this._form.getRawValue(), item.token);
    }

    register(item: TVRController) {
        this.service.register(this._form.getRawValue(), item.token);
    }

    getServerGames(item: TVRController) {
        this.service.getServersGames(item.token).subscribe(
            res => console.log(res)
        );
    }

    private initForm(init?: Partial<{name: string, enabled}>) {
        this._form = this.fb.group({
            name: '',
            enabled: true
        });
        init && this._form.patchValue(init);
    }
}
