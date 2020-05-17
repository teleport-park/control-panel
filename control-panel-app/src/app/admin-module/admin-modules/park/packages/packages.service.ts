import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { filter } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import { PackageHistory } from '../../../../models';
import { ToasterService } from '../../../../services/toaster.service';
import { Package, PackageResponse } from './package.model';
import { PROMOS } from '../../../../utils/utils';

@Injectable()

export class PackagesService {

    packages$: BehaviorSubject<PackageResponse[]> = new BehaviorSubject([]);

    packagesHistory$: BehaviorSubject<PackageHistory[]> = new BehaviorSubject([]);

    lastSyncTime$: BehaviorSubject<Date> = new BehaviorSubject(new Date());

    promo$: BehaviorSubject<string[]> = new BehaviorSubject(PROMOS);

    public packageIdForEdit: string;

    constructor(private http: HttpClient,
                private urlService: ApiUrlsService,
                private toaster: ToasterService,
                private loaderService: LoaderService) {
    }

    public getPackages() {
        this.loaderService.dispatchShowLoader(true);
        this.http.get(this.urlService.getPackages('GET'))
        .subscribe((result: PackageResponse[]) => {
            this.packages$.next(result);
            this.loaderService.dispatchShowLoader(false);
        });
    }

    public getPackage(id: string) {
        return this.http.get(this.urlService.getPackages('GET', id));
    }

    public getPackagesHistory() {
        this.loaderService.dispatchShowLoader(true);
        // this.http.get(this.urlService.getPackagesHistory('GET'))
        this.http.get('./assets/data/packages.json')
        .pipe(
            filter(data => !!data))
        .subscribe((result: PackageHistory[]) => {
            this.packagesHistory$.next(result);
            this.lastSyncTime$.next(result[0].timestamp);
            this.loaderService.dispatchShowLoader(false);
        });
    }

    public addPackage(data: Package) {
        this.loaderService.dispatchShowLoader(true);
        this.http.post(this.urlService.getPackages('POST'), data).subscribe(
            _ => {
                this.toaster.success('PACKAGE_ADDED_SUCCESSFUL', true);
                this.getPackages();
            });
    }

    public editPackage(data: Package, id: string) {
        this.http.put(this.urlService.getPackages('PUT', id), data).subscribe(
            _ => {
                this.toaster.success('PACKAGE_ADDED_SUCCESSFUL', true);
                this.packageIdForEdit = null;
                this.getPackages();
            }
        );
    }

    public togglePackage(id: string, body: any) {
        this.http.patch(this.urlService.getPackages('PATCH', id), body).subscribe(
            _ => {
                this.toaster.success('PACKAGE_ADDED_SUCCESSFUL', true);
            }
        );
    }

    // synchronize() {
    //     this.http.put(this.urlService.getPackages('GET'), {})
    //     .pipe(
    //         filter(data => !!data))
    //     .subscribe((result: any[]) => {
    //         this.getPackages();
    //         this.getPackagesHistory();
    //     });
    // }
}
