import { Component, OnInit } from '@angular/core';
import { PackagesService } from './packages.service';

@Component({
    selector: 'packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

    packagesSyncTime: Date = new Date();

    packagesHistorySyncTime: Date = new Date();

    displayedColumns: string[] = ['timestamp', 'status'];

    constructor(public service: PackagesService) {
    }

    ngOnInit() {
    }

    updateSyncTime(): Date {
        return new Date();
    }

}
