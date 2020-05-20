import { Inject, Injectable } from '@angular/core';
import { Permission } from '../../../../../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../../services/loader.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '../../../../../common/translations-module';
import { AppData } from '../../../../../interfaces';
import { BuildParamsHelper } from '../../../../../utils/build-params-helper';
import { IAppStorageInterface } from '../../../../../interfaces/app-storage-interface';
import { ApiUrlsService } from '../../../../../services/api-urls.service';

@Injectable()
export class PermissionsService {

  /**
   * storage key
   */
  readonly STORAGE_KEY: string = 'PERMISSIONS';

  private _paramsHelper = new BuildParamsHelper();

  /**
   * permissions
   */
  permissions$: BehaviorSubject<AppData<Permission>> = new BehaviorSubject(null);

  /**
   * constructor
   * @param http
   * @param loader
   * @param toaster
   * @param translations
   * @param storage
   * @param apiBuilder
   */
  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translations: TranslateService,
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
              private apiBuilder: ApiUrlsService) {
    this.getPermissions();
  }

  /**
   * get permissions
   */
  getPermissions() {
    const page = this._paramsHelper.getPaginationParams(this.STORAGE_KEY, this.storage);
    this.loader.dispatchShowLoader(true);
    this.http.request('GET',
      this.apiBuilder.getPermissionsUrl('GET', null, page.pageSize, page.pageIndex + 1))
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe((data: AppData<Permission>) => {
        this.permissions$.next(data);
      });
  }

  /**
   * add permission
   * @param permission
   */
  addPermission(permission: Permission): void {
    this.loader.dispatchShowLoader(true);
    this.http.request('POST', this.apiBuilder.getPermissionsUrl('POST'), {body: permission})
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe(() => {
        this.getPermissions();
      });
  }

  /**
   * edit permission
   * @param permission
   */
  editPermission(permission: Permission): void {
    this.loader.dispatchShowLoader(true);
    this.http.request('PUT', this.apiBuilder.getPermissionsUrl('PUT', permission.id), {body: permission})
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe(() => {
        this.getPermissions();
      });
  }

  /**
   * delete permission
   * @param permission
   */
  deletePermission(permission: Permission): void {
    this.loader.dispatchShowLoader(true);
    this.http.request('DELETE', this.apiBuilder.getPermissionsUrl('DELETE', permission.id))
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe((result: boolean) => {
        if (result) {
          this.getPermissions();
          return;
        }
        this.showErrorMessage(this.translations.instant('ADMIN_MENU_GROUPS'));
      });
  }

  /**
   * show error toast message
   * @param param
   */
  private showErrorMessage(param: string) {
    this.toaster.open(
      this.translations.instant('CANNOT_DELETE_DEPENDED_FIELD_ERROR_MESSAGE', [param]),
      null,
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'toaster-error'
      });
  }

  /**
   * change pagination handler
   * @param event
   */
  changeSortOrPagination(event: PageEvent | Sort) {
    this.getPermissions();
  }
}
