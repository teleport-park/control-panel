import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { LoaderService } from '../../../../services/loader.service';
import { ToasterService } from '../../../../services/toaster.service';
import {IPackage, PackageRequest, PackageResponse} from './package.model';
import { Promo } from '../promo/promo.model';
import { PromoService } from '../promo/services/promo.service';

@Injectable()

export class PackagesService {

    packages$: BehaviorSubject<IPackage[]> = new BehaviorSubject([]);

    promo$: BehaviorSubject<Promo[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient,
                private urlService: ApiUrlsService,
                private toaster: ToasterService,
                private loaderService: LoaderService,
                private promoService: PromoService) {
    }

    public getPackages() {
        const result: IPackage[] = [{
            id: '1',
            name: 'TEST',
            note: 'TEST_NOTE',
            players: 2,
            cost: {
                amount: 100,
                currency: 'BYN'
            },
            charge: {
                amount: 50,
                currency: 'TPL'
            }
        }, {
            id: '2',
            name: 'TEST',
            note: 'TEST_NOTE',
            players: 5,
            cost: {
                amount: 200,
                currency: 'BYN'
            },
            charge: {
                amount: 100,
                currency: 'TPL'
            }
        },{
            id: '3',
            name: 'TEST',
            note: 'TEST_NOTE',
            players: 1,
            cost: {
                amount: 50,
                currency: 'BYN'
            },
            charge: {
                amount: 25,
                currency: 'TPL'
            }
        }]
        this.loaderService.dispatchShowLoader(true);
        // this.http.get(this.urlService.getPackages('GET'))
        // .subscribe((result: IPackage[]) => {
            this.packages$.next(result);
            // this.setFilteredPromo(result);
            this.loaderService.dispatchShowLoader(false);
        // });
    }

    public getPackage(id: string) {
        return this.http.get(this.urlService.getPackages('GET', id));
    }

    public addPackage(data: PackageRequest) {
        this.loaderService.dispatchShowLoader(true);
        this.http.post(this.urlService.getPackages('POST'), data).subscribe(
            _ => {
                this.toaster.success('PACKAGE_ADDED_SUCCESSFUL', true);
                this.getPackages();
            });
    }

    public editPackage(data: PackageRequest, id: string) {
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

    public setFilteredPromo(pack: IPackage[]) {
        const promo = this.promoService.promo$.getValue();
        this.promo$.next(promo);
    }
}
