import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import {IPackage, Package, PackageResponse} from './package.model';
import { PackagesService } from './packages.service';
import { TranslateService } from '../../../../common/translations-module';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

    private destroyed$: Subject<boolean> = new Subject();

    @ViewChild('formTemplate') formTemplate: TemplateRef<any>;

    displayedColumns: string[] = ['name', 'players', 'cost', 'charge', 'actions'];

    // _sliderValue: string = '00:00';

    dataSource: MatTableDataSource<IPackage>;


    constructor(public service: PackagesService,
                public cd: ChangeDetectorRef,
                public translations: TranslateService,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.service.packages$.pipe(takeUntil(this.destroyed$)).subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.cd.markForCheck();
        });

        this.service.getPackages();
    }

    edit(item: Package) {
        this.router.navigate(['admin', 'park', 'packages', 'add', item.id]);
    }

    applyFilter(value) {
        this.dataSource.filter = value;
    }

    /**
     * show confirm dialog
     */
    showConfirmDialog(event: MatSlideToggleChange, pack: Package) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: 'DIALOG_PACKAGE_TOGGLE_CONFIRM_MESSAGE',
                messageParams: [
                    pack.enabled ? this.translations.instant('DISABLE') : this.translations.instant('ENABLE'),
                    pack.name
                ]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .subscribe((res) => {
            if (!res) {
                return;
            }
            this.toggle(event, pack);
            this.cd.markForCheck();
        });
    }

    toggle(event: MatSlideToggleChange, pack: Package) {
        const payload = {enabled: !pack.enabled};
        pack.enabled = !pack.enabled;
        event.source.checked = pack.enabled;
        this.cd.markForCheck();
        this.service.togglePackage(pack.id, payload);
        event.source.checked = pack.enabled;
    }

    delete(pack: Package) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: 'DIALOG_REMOVE_CONFIRM_MESSAGE',
                messageParams: [pack.name]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .subscribe((res) => {
            if (!res) {
                return;
            }
            this.service.deletePackage(pack.id);
        });
    }
}
