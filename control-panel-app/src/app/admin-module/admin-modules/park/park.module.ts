import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkComponent } from './park.component';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { CardsService } from './cards/services/cards.service';
import { GamesService } from './games/services/games.service';
import { GamesComponent } from './games/games.component';
import { PricingComponent } from './pricing/pricing.component';
import { PricingService } from './pricing/pricing.service';
import { PackagesService } from './packages/packages.service';
import { SessionsComponent } from './sessions/sessions.component';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { BillingService } from './billing/services/billing.service';
import { WhoIsComponent } from './cards/components/who-is/who-is.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackagesComponent } from './packages/packages.component';
import { PromoComponent } from './promo/promo.component';
import { AddPackageComponent } from './packages/add-package/add-package.component';
import { CronEditorModule } from '../../../common/control-panel-cron-generator/cron-editor.module';

const routes: Routes = [{
    path: '',
    component: ParkComponent,
    children: [
        {
            path: '', redirectTo: 'visitors', pathMatch: 'full'
        }, {
            path: 'visitors',
            loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            data: {title: 'ADMIN_MENU_USERS'},
            canActivate: [PermissionGuard]
        }, {
            path: 'staff',
            loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
            data: {title: 'ADMIN_MENU_STAFF'},
            canActivate: [PermissionGuard]
        }, {
            path: 'cards',
            component: CardsComponent,
            data: {title: 'ADMIN_MENU_CARDS'},
            canActivate: [PermissionGuard]
        }, {
            path: 'packages',
            component: PackagesComponent,
            data: {title: 'ADMIN_MENU_PACKAGES'},
            canActivate: [PermissionGuard]
        }, {
            path: 'packages/add',
            component: AddPackageComponent,
            data: {title: 'ADMIN_MENU_PACKAGES'},
            canActivate: [PermissionGuard]
        }, {
            path: 'packages/add/:id',
            component: AddPackageComponent,
            data: {title: 'ADMIN_MENU_PACKAGES'},
            canActivate: [PermissionGuard]
        }, {
            path: 'promo',
            component: PromoComponent,
            data: {title: 'ADMIN_MENU_PROMO'},
            canActivate: [PermissionGuard]
        }, {
            path: 'games',
            component: GamesComponent,
            data: {title: 'ADMIN_MENU_GAMES'},
            canActivate: [PermissionGuard]
        }, {
            path: 'pricing',
            component: PricingComponent,
            data: {title: 'ADMIN_MENU_PRICING'},
            canActivate: [PermissionGuard]
        }, {
            path: 'sessions',
            component: SessionsComponent,
            data: {title: 'ADMIN_MENU_SESSIONS'},
            canActivate: [PermissionGuard]
        }, {
            path: 'billing',
            loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule),
            data: {title: 'ADMIN_MENU_BILLING'},
            canActivate: [PermissionGuard]
        }
    ]
}];

export const ParkRouterModule = RouterModule.forChild(routes);

export const COMPONENTS = [
    ParkComponent,
    GamesComponent,
    PricingComponent,
    CardsComponent,
    SessionsComponent,
    WhoIsComponent,
    PackagesComponent,
    PromoComponent,
    AddPackageComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        ParkRouterModule,
        MaterialModule,
        SharedModule,
        TranslationModule,
        ReactiveFormsModule,
        FormsModule,
        CronEditorModule
    ],
    providers: [CardsService, GamesService, PricingService, PackagesService, BillingService]
})
export class ParkModule {
}
