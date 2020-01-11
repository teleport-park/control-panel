import { NgModule } from '@angular/core';

import {
   DateAdapter,
   MAT_DATE_FORMATS,
   MAT_DATE_LOCALE,
   MatButtonModule,
   MatCardModule,
   MatCheckboxModule,
   MatDateFormats,
   MatDatepickerModule,
   MatDialogModule,
   MatFormFieldModule,
   MatIconModule,
   MatInputModule,
   MatListModule,
   MatMenuModule,
   MatPaginatorIntl,
   MatPaginatorModule,
   MatProgressSpinnerModule,
   MatRadioModule,
   MatSelectModule,
   MatSidenavModule,
   MatSlideToggleModule,
   MatSnackBarModule,
   MatSortModule,
   MatTableModule,
   MatTabsModule,
   MatToolbarModule,
   MatTooltipModule,
   MatTreeModule,
   MatChipsModule, MatAutocompleteModule
} from '@angular/material';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatPaginatorTranslateUtil } from './utils/mat-paginator-translate.util';
import { TranslateService } from './common/translations-module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextFieldModule } from '@angular/cdk/text-field';


export const APP_MOMENT_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'L',
    },
    display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};


export const MATERIAL_MODULES = [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatTreeModule,
    DragDropModule,
    MatRadioModule,
    MatTabsModule,
    MatChipsModule,
   MatAutocompleteModule
];

@NgModule({
    imports: [...MATERIAL_MODULES, TextFieldModule],
    exports: [...MATERIAL_MODULES, TextFieldModule],
    providers: [
        // TODO check how globally change locale for date
        {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: APP_MOMENT_DATE_FORMATS},
        {
            provide: MatPaginatorIntl, useFactory: (translateService) => {
                return new MatPaginatorTranslateUtil(translateService);
            }, deps: [TranslateService]
        }
    ]
})
export class MaterialModule {
}
