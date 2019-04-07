import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Permission } from '../../../../../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../../services/loader.service';
import { MatSnackBar, PageEvent, Sort } from '@angular/material';
import { TranslateService } from '../../../../../common/translations-module';
import { StorageService } from '../../../../../services/storage.service';
import { AppData } from '../../../../../interfaces';
import { BuildParamsHelper } from '../../../../utils/build-params-helper';

@Injectable()
export class PermissionsService {

  /**
   * permission api
   */
  static readonly PERMISSIONS_API: string = `${environment.origin}${environment.api.PERMISSIONS}`;

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
   * @param translateService
   * @param storage
   */
  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translateService: TranslateService,
              public storage: StorageService) {
    this.getPermissions();
  }

  /**
   * get permissions
   */
  getPermissions() {
    const params = this._paramsHelper.getPaginationParams(this.STORAGE_KEY, this.storage);
    this.loader.dispatchShowLoader(true);
    this.http.get(
      `${PermissionsService.PERMISSIONS_API}?`, {params})
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
    this.http.post(`${PermissionsService.PERMISSIONS_API}`, permission)
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
    this.http.put(`${PermissionsService.PERMISSIONS_API}/${permission.id}`, permission)
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
    this.http.delete(`${PermissionsService.PERMISSIONS_API}/${permission.id}`)
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe((result: boolean) => {
        if (result) {
          this.getPermissions();
          return;
        }
        this.showErrorMessage(this.translateService.instant('ADMIN_MENU_GROUPS'));
      });
  }

  /**
   * show error toast message
   * @param param
   */
  private showErrorMessage(param: string) {
    this.toaster.open(
      this.translateService.instant('CANNOT_DELETE_DEPENDED_FIELD_ERROR_MESSAGE', [param]),
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
