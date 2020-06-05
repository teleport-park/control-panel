import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { TranslationModule } from '../../../common/translations-module/translation.module';

const routes: Routes = [{
    path: '',
    component: ReportsComponent
}];

const ReportModuleRouter = RouterModule.forChild(routes);

@NgModule({
    declarations: [ReportsComponent],
    imports: [
        CommonModule,
        ReportModuleRouter,
        SharedModule,
        MaterialModule,
        TranslationModule
    ]
})
export class ReportsModule {
}
