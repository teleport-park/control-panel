import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PackagesService } from './packages.service';

@Component({
    selector: 'packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

    displayedColumns: string[] = ['timestamp', 'status'];

    packagesColumns: string[] = [
        'title',
        'category',
        'cloudId',
        'description',
        'expiresAt',
        'games',
        'note',
        'syncId',
        'type',
        'coins',
        'price',
        'unlim'];

    simplePackagesColumns: string[] = ['title', 'category', 'cloudId', 'description', 'games', 'note', 'syncId', 'type', 'unlim'];

    constructor(public service: PackagesService, public cd: ChangeDetectorRef) {
    }

    ngOnInit() {
    }
}
