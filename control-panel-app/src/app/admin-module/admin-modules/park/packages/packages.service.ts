import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { LoaderService } from '../../../../services/loader.service';
import { ToasterService } from '../../../../services/toaster.service';
import { Package, PackageResponse } from './package.model';
import { Promo } from '../promo/promo.model';
import { PromoService } from '../promo/services/promo.service';

@Injectable()

export class PackagesService {

    packages$: BehaviorSubject<PackageResponse[]> = new BehaviorSubject([]);

    promo$: BehaviorSubject<Promo[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient,
                private urlService: ApiUrlsService,
                private toaster: ToasterService,
                private loaderService: LoaderService,
                private promoService: PromoService) {
    }

    public getPackages() {
        this.loaderService.dispatchShowLoader(true);
        this.http.get(this.urlService.getPackages('GET'))
        .subscribe((result: PackageResponse[]) => {
            this.packages$.next(result);
            this.setFilteredPromo(result);
            this.loaderService.dispatchShowLoader(false);
        });
    }

    public getPackage(id: string) {
        return this.http.get(this.urlService.getPackages('GET', id));
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
                this.toaster.success('PACKAGE_EDITED_SUCCESSFUL', true);
                this.getPackages();
            }
        );
    }

    public togglePackage(id: string, body: any) {
        this.http.patch(this.urlService.getPackages('PATCH', id), body).subscribe(
            _ => {
                this.toaster.success('PACKAGE_SWITCHED_SUCCESSFUL', true);
            }
        );
    }


    public deletePackage(id: string) {
        this.http.delete(this.urlService.getPackages('DELETE', id), {responseType: 'text'})
        .subscribe(_ => {
            this.toaster.success('PACKAGE_REMOVED_SUCCESSFUL', true);
            this.getPackages();
        });
    }

    public setFilteredPromo(pack: PackageResponse[]) {
        const promo = this.promoService.promo$.getValue();
        this.promo$.next(promo);
    }
}
