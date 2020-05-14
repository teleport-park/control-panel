import { Component, OnInit } from '@angular/core';
import { Package } from './package.model';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'packages',
    templateUrl: './packages-frame.component.html',
    styleUrls: ['./packages-frame.component.scss']
})
export class PackagesFrameComponent implements OnInit {

    // @ViewChild('formTemplate', {static: false}) formTemplate: TemplateRef<any>;
    //
    // // displayedColumns: string[] = ['timestamp', 'status'];
    //
    // // packagesColumns: string[] = [
    // //     'name',
    // //     'players',
    // //     'cloudId',
    // //     'description',
    // //     'expiresAt',
    // //     'games',
    // //     'note',
    // //     'syncId',
    // //     'type',
    // //     'unlim',
    // //     'active',
    // //     'toggle',
    // //     'submenu'];
    // //
    // // simplePackagesColumns: string[] = ['name', 'players', 'cloudId', 'description', 'games', 'note', 'syncId', 'type', 'unlim'];
    //
    // displayedColumns: string[] = ['name', 'enabled', 'submenu'];
    //
    // _sliderValue: string = '00:00';

    dataSource: MatTableDataSource<Package>;


    constructor() {
    }

    ngOnInit() {
        // this.service.getPackages();
        // this.service.packages$.subscribe(res => {
        //     this.dataSource = new MatTableDataSource(res);
        // });
    }

    // edit(item: Package) {
    //     this.service.packageForEdit = item;
    //     this.router.navigate(['admin', 'park', 'packages', 'add']);
    // }
    //
    // applyFilter(value) {
    //     this.dataSource.filter = value;
    // }
    //
    // /**
    //  * show confirm dialog
    //  */
    // showConfirmDialog(event: MatSlideToggleChange, pack: Package) {
    //     this.dialog.open(ConfirmDialogComponent, {
    //         data: {
    //             title: 'DIALOG_CONFIRM_TITLE',
    //             message: 'DIALOG_PACKAGE_TOGGLE_CONFIRM_MESSAGE',
    //             messageParams: [
    //                 pack.enabled ? this.translationService.instant('DISABLE') : this.translationService.instant('ENABLE'),
    //                 pack.name
    //             ]
    //         } as ConfirmDialogData,
    //         autoFocus: false
    //     }).afterClosed()
    //     .subscribe((res) => {
    //         if (!res) {
    //             return;
    //         }
    //         this.toggle(event, pack);
    //         this.cd.markForCheck();
    //     });
    // }
    //
    // toggle(event: MatSlideToggleChange, pack: Package) {
    //     const payload = {enabled: !pack.enabled};
    //     pack.enabled = !pack.enabled;
    //     event.source.checked = pack.enabled;
    //     this.cd.markForCheck();
    //     this.service.togglePackage(pack.id, payload);
    //     event.source.checked = pack.enabled;
    // }

}
