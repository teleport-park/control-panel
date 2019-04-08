import { Injectable } from '@angular/core';
import { ApiServiceInterface } from '../interfaces/api-service-interface';
import { AppData } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { filter, finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';
import { StorageService } from './storage.service';
import { BuildParamsHelper } from '../utils/build-params-helper';

export type T = any;

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ApiServiceInterface<T> {

  api;

  STORAGE_KEY = '';

  protected _paramsHelper = new BuildParamsHelper();

  items$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(protected http: HttpClient,
              protected loader: LoaderService,
              public storage: StorageService) {
    this.getItems();
  }

  getItems(): void {
    const params = this._paramsHelper.getPaginationParams(this.STORAGE_KEY, this.storage);
    this.loader.dispatchShowLoader(true);
    this.http.get(this.api, {params})
      .pipe(filter((data: AppData<T>) => !!data), finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe((data: AppData<T>) => {
        this.items$.next(data);
      });
  }

  addItem(item: T): void {
    this.loader.dispatchShowLoader(true);
    this.http.post(this.api, item)
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe(() => {
        this.getItems();
      });
  }

  editItem(item: T): void {
    this.loader.dispatchShowLoader(true);
    this.http.put(`${this.api}/${item.id}`, item)
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe(() => {
        this.getItems();
      });
  }

  removeItem(item: T): void {
    this.loader.dispatchShowLoader(true);
    this.http.delete(this.api).subscribe(() => {
      this.getItems();
    });
  }
}
