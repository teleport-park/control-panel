import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';
import { PromoComponent } from './promo/promo.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { PackagesFrameComponent } from './packages-frame.component';
import { TranslationModule } from '../../../../common/translations-module/translation.module';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
    path: '',
    component: PackagesFrameComponent,
    children: [
        {
            path: '',
            redirectTo: 'packages',
            pathMatch: 'full',
        },
        {
            path: 'packages', component: PackagesComponent, data: {title: 'ADMIN_MENU_PACKAGES'}, canActivate: [PermissionGuard]
        }, {
            path: 'promo', component: PromoComponent, data: {title: 'ADMIN_MENU_PACKAGES'}, canActivate: [PermissionGuard]
        }, {
            path: 'packages/add', component: AddPackageComponent
        },
    ]
}];

const PackageRouting = RouterModule.forChild(routes);

@NgModule({
    declarations: [PackagesFrameComponent, PackagesComponent, PromoComponent, AddPackageComponent],
    imports: [
        CommonModule,
        PackageRouting,
        TranslationModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class PackagesFrameModule {
}
