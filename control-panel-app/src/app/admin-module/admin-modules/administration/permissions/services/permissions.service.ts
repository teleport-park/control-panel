import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Permission } from '../../../../../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { LoaderService } from '../../../../../services/loader.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../../../../../common/translations-module';

@Injectable()
export class PermissionsService {

  /**
   * permission api
   */
  static readonly PERMISSIONS_API: string = `${environment.origin}${environment.api.PERMISSIONS}`;

  /**
   * permissions
   */
  permissions$: BehaviorSubject<Permission[]> = new BehaviorSubject(null);

  /**
   * Permission amount
   */
  permissionAmount$: Observable<number>;

  /**
   * constructor
   * @param http
   * @param loader
   * @param toaster
   * @param translateService
   */
  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translateService: TranslateService) {
  }

  /**
   * get permission amount
   */
  getPermissionAmount(): void {
    this.permissionAmount$ = this.http.get(`${PermissionsService.PERMISSIONS_API}/totalpages/1`).pipe(
      map((result: number) => result)
    );
  }

  /**
   * get permissions
   */
  getPermissions(pageSize: number = 50, pageNumber: number = 1) {
    this.loader.dispatchShowLoader(true);
    this.getPermissionAmount();
    this.http.get(`${PermissionsService.PERMISSIONS_API}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .pipe(finalize(() => this.loader.dispatchShowLoader(false)))
      .subscribe((result: Permission[]) => {
        this.permissions$.next(result);
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
}
