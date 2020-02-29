import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { filter } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import { Package, PackageHistory } from '../../../../models';
import { ToasterService } from '../../../../services/toaster.service';

@Injectable()

export class PackagesService {

   packages$: BehaviorSubject<Package[]> = new BehaviorSubject([]);

   packagesHistory$: BehaviorSubject<PackageHistory[]> = new BehaviorSubject([]);

   lastSyncTime$: BehaviorSubject<Date> = new BehaviorSubject(new Date());


   constructor(private http: HttpClient,
               private urlService: ApiUrlsService,
               private toaster: ToasterService,
               private loaderService: LoaderService) {
      this.getPackages();
      this.getPackagesHistory();
   }

   public getPackages() {
      this.loaderService.dispatchShowLoader(true);
      this.http.get(this.urlService.getPackages('GET'))
      .pipe(
         filter(data => !!data))
      .subscribe((result: Package[]) => {
         this.packages$.next(result);
         this.loaderService.dispatchShowLoader(false);
      });
   }

   public getPackagesHistory() {
      this.loaderService.dispatchShowLoader(true);
      this.http.get(this.urlService.getPackagesHistory('GET'))
      .pipe(
         filter(data => !!data))
      .subscribe((result: PackageHistory[]) => {
         this.packagesHistory$.next(result);
         this.lastSyncTime$.next(result[0].timestamp);
         this.loaderService.dispatchShowLoader(false);
      });
   }

   public addPackage(data: any) {
      this.loaderService.dispatchShowLoader(true);
      this.http.post(this.urlService.getPackages('POST'), data).subscribe(res => {
         this.toaster.success('PACKAGE_ADDED_SUCCESSFUL');
      });
   }

   synchronize() {
      this.http.put(this.urlService.getPackages('GET'), {})
      .pipe(
         filter(data => !!data))
      .subscribe((result: any[]) => {
         this.getPackages();
         this.getPackagesHistory();
      });
   }
}
