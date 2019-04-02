import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Permission } from '../../../../../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { LoaderService } from '../../../../../services/loader.service';
import { MatSnackBar, PageEvent, Sort, SortDirection } from '@angular/material';
import { TranslateService } from '../../../../../common/translations-module';
import { StorageService } from '../../../../../services/storage.service';
import { DefaultPagination } from '../../../../../models/default-pagination';
import { DefaultSort } from '../../../../../models/default-sort';

@Injectable()
export class PermissionsService {

  /**
   * permission api
   */
  static readonly PERMISSIONS_API: string = `${environment.origin}${environment.api.PERMISSIONS}`;

  /**
   * paging api
   */
  static readonly PAGING: any = environment.api.paging;

  /**
   * sort api
   */
  static readonly SORT: any = environment.api.sorting;

  /**
   * storage key
   */
  readonly STORAGE_KEY: string = 'PERMISSIONS';

  /**
   * permissions
   */
  permissions$: BehaviorSubject<Permission[]> = new BehaviorSubject(null);

  /**
   * Permission count
   */
  permissionCount$: Observable<number>;

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
    this.getPermissionCount();
    this.getPermissions();
  }

  /**
   * get permission amount
   */
  getPermissionCount(): void {
    this.permissionCount$ = this.http.get(`${PermissionsService.PERMISSIONS_API}/totalpages/1`).pipe(
      map((result: number) => result)
    );
  }

  /**
   * get permissions
   */
  getPermissions() {
    const params = this.getParams(this.STORAGE_KEY);
    this.loader.dispatchShowLoader(true);
    this.getPermissionCount();
    this.http.get(
      `${PermissionsService.PERMISSIONS_API}?`, {params})
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

  /**
   * change pagination handler
   * @param event
   */
  changeSortOrPagination(event: PageEvent | Sort) {
    this.getPermissions();
  }

  /**
   * get params
   * @param key
   */
  private getParams(key: string) {
    const page = this.storage.getValue(`${key}_PAGINATION`) || new DefaultPagination();
    const sort = this.storage.getValue(`${this.STORAGE_KEY}_SORT`) || new DefaultSort();
    return new HttpParams()
      .set(PermissionsService.PAGING.size, page.pageSize)
      .set(PermissionsService.PAGING.page, page.pageIndex + 1)
      .set(PermissionsService.SORT.column, sort.active)
      .set(PermissionsService.SORT.direction, `${this.getDirection(sort.direction)}`);
  }

  /**
   * get direction
   * @param direction
   */
  private getDirection(direction: SortDirection) {
    switch (direction) {
      case 'asc': {
        return 2;
      }
      case 'desc': {
        return 1;
      }
      default: {
        return 0;
      }
    }
  }
}
