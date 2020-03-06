import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PackagesService } from './packages.service';
import { Router } from '@angular/router';
import { Package } from './package.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';
import { MatDialog } from '@angular/material';
import { TranslateService } from '../../../../common/translations-module';

@Component({
    selector: 'packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

    @ViewChild('formTemplate', {static: false}) formTemplate: TemplateRef<any>;

    displayedColumns: string[] = ['timestamp', 'status'];

    packagesColumns: string[] = [
        'name',
        'players',
        'cloudId',
        'description',
        'expiresAt',
        'games',
        'note',
        'syncId',
        'type',
        'unlim',
        'enabled',
        'submenu'];

    simplePackagesColumns: string[] = ['name', 'players', 'cloudId', 'description', 'games', 'note', 'syncId', 'type', 'unlim'];

    _sliderValue: string = '00:00';


    constructor(public service: PackagesService,
                public cd: ChangeDetectorRef,
                public translationService: TranslateService,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.service.getPackages();
    }

    edit(item: Package) {
        this.service.packageForEdit = item;
        this.router.navigate(['admin', 'park', 'packages', 'add']);
    }

    toggle(item: Package) {
        this.service.togglePackage(item.id, {enabled: !item.enabled});
        item.enabled = !item.enabled;
    }

    /**
     * show confirm dialog
     */
    showConfirmDialog(item: Package) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: 'DIALOG_PACKAGE_TOGGLE_CONFIRM_MESSAGE',
                messageParams: [
                    item.enabled ? this.translationService.instant('DISABLE') : this.translationService.instant('ENABLE'),
                    item.name
                ]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .subscribe((res) => {
            if (!res) {
                return;
            }
            this.toggle(item);
            this.cd.markForCheck();
        });
    }

}
