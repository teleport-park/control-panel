import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatSlideToggleChange, MatTableDataSource } from '@angular/material';
import { Package, PackageResponse } from './package.model';
import { PackagesService } from './packages.service';
import { TranslateService } from '../../../../common/translations-module';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../common/shared-module';

@Component({
  selector: 'packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
    @ViewChild('formTemplate', {static: false}) formTemplate: TemplateRef<any>;

    displayedColumns: string[] = ['name', 'players', 'totals', 'removed', 'enabled', 'submenu'];

    _sliderValue: string = '00:00';

    dataSource: MatTableDataSource<PackageResponse>;


    constructor(public service: PackagesService,
                public cd: ChangeDetectorRef,
                public translationService: TranslateService,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.service.packages$.subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.cd.markForCheck();
        });
        this.service.getPackages();
    }

    edit(item: Package) {
        this.service.packageIdForEdit = item.id;
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
                    pack.enabled ? this.translationService.instant('DISABLE') : this.translationService.instant('ENABLE'),
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

    getPlansPromo(plans: Partial<{promo: string | null}>[]) {
        return plans.map(plan => plan.promo).join(' | ');
    }
}
