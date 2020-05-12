import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { TranslationModule } from '../../../../common/translations-module/translation.module';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import { ConfirmDialogComponent } from '../../../../common/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';
import { ExtendedFiltersModule } from '../../../../common/extended-filters-module/extended-filters.module';
import { ENTITY_SERVICE } from '../../../../models/intefaces';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { CommonEntityService } from '../../../../services/common-services/common-entity.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppStorageKey } from '../../../../models/app-storage-key';
import { Sort } from '@angular/material';
import { LoaderService } from '../../../../services/loader.service';
import { NgxMaskModule } from 'ngx-mask';
import { FormComponent } from './form.component/form.component';

const storageKey: string = 'VISITORS';

const routes: Routes = [{
    path: '',
    component: UsersComponent,
    children: [{
        path: ':id',
        component: UserComponent,
        data: {
            title: 'ADMIN_MENU_USERS'
        },
        canActivate: [PermissionGuard]
    }]
}];

export const UserRoutingModule = RouterModule.forChild(routes);

export function UserServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService, loader: LoaderService) {
    return new CommonEntityService(http, apiUrlService.getVisitors, sortStorageSet(), loader);
}

const sortStorageSet = () => {
    const sortState: Sort = JSON.parse(localStorage.getItem(storageKey + AppStorageKey.Sort)) as Sort;
    if (sortState) {
        const sort = {};
        sort[sortState.active] = sortState.direction;
        return sort;
    }
};

@NgModule({
    declarations: [UsersComponent, UserComponent, FormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        UserRoutingModule,
        TranslationModule,
        SharedModule,
        ExtendedFiltersModule,
        NgxMaskModule.forRoot({prefix: '+'})
    ],
    providers: [{
        provide: ENTITY_SERVICE, useFactory: UserServiceFactory, deps: [HttpClient, ApiUrlsService, LoaderService]
    }],
    entryComponents: [ConfirmDialogComponent]
})
export class UsersModule {
    constructor(overlayContainer: OverlayContainer) {
        overlayContainer.getContainerElement().classList.add('light-theme');
    }
}
