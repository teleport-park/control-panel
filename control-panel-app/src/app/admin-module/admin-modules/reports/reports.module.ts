import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: ReportsComponent
}];

const ReportModuleRouter = RouterModule.forChild(routes);

@NgModule({
    declarations: [ReportsComponent],
    imports: [
        CommonModule,
        ReportModuleRouter
    ]
})
export class ReportsModule {
}
