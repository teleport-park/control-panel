import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { ReportComponent } from './report/report.component';
import { ReportsService } from './reports.service';

const routes: Routes = [{
    path: '',
    component: ReportsComponent,
}, {
    path: ':reportType',
    component: ReportComponent
}];

const ReportModuleRouter = RouterModule.forChild(routes);

@NgModule({
    declarations: [ReportsComponent, ReportComponent],
    imports: [
        CommonModule,
        ReportModuleRouter,
        SharedModule,
        MaterialModule,
        TranslationModule
    ],
    providers: [ReportsService]
})
export class ReportsModule {
}
