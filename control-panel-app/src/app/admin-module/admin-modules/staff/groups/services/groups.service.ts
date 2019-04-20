import { Inject, Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppData } from '../../../../../interfaces';
import { Group, Permission } from '../../../../../models';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../../../services/loader.service';
import { MatSnackBar, PageEvent, Sort } from '@angular/material';
import { TranslateService } from '../../../../../common/translations-module';
import { IAppStorageInterface } from '../../../../../interfaces/app-storage-interface';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { BuildParamsHelper } from '../../../../../utils/build-params-helper';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GroupsService {

  /**
   * group storage key
   */
  public readonly GROUP_STORAGE_KEY: string = 'GROUPS';

  /**
   * groups
   */
  groups$: BehaviorSubject<AppData<Group>> = new BehaviorSubject(null);

  /**
   * permissions
   */
  permissions$: BehaviorSubject<AppData<Permission>> = new BehaviorSubject(null);

  /**
   * param builder
   */
  private _paramsHelper: BuildParamsHelper = new BuildParamsHelper();

  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translateService: TranslateService,
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
              private apiBuilder: ApiUrlsService) {
    this.getGroups();
  }

  /**
   * get groups
   */
  getGroups(): void {
    const requestMethod = 'GET';
    const page = this._paramsHelper.getPaginationParams(this.GROUP_STORAGE_KEY, this.storage);
    const url = this.apiBuilder.getStaffGroupsUrl(requestMethod, null, page.pageSize, page.pageIndex + 1);
    this.http.request(requestMethod, url)
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((data: AppData<Group>) => {
        this.groups$.next(data);
      });
  }


  /**
   * add group
   * @param group
   */
  addGroup(group: Group): void {
    const requestMethod = 'POST';
    const url = this.apiBuilder.getStaffGroupsUrl(requestMethod);
    this.http.request(requestMethod, url, {body: group}).subscribe((result: number) => {
      if (result) {
        group.id = result;
        this.addPermissionsToGroup(group);
        return;
      }
      this.getGroups();
    });
  }

  /**
   * edit group
   * @param group
   */
  editGroup(group: Group): void {
    const requestMethod = 'PUT';
    const url = this.apiBuilder.getStaffGroupsUrl(requestMethod, group.id);
    this.loader.dispatchShowLoader(true);
    this.http.request(requestMethod, url, {body: group})
      .subscribe(() => {
        this.addPermissionsToGroup(group);
      });
  }

  /**
   * add permission to group
   * @param group
   */
  addPermissionsToGroup(group: Group): void {
    const requestMethod = 'POST';
    const url = this.apiBuilder.getPermissionsUrl(requestMethod);
    this.http.request(requestMethod, url, {
      body: {
        staffGroupId: group.id,
        permissionIds: group.permissions
      }
    })
      .subscribe(() => {
        this.getGroups();
      });
  }

  /**
   * delete group
   * @param group
   */
  deleteGroup(group: Group): void {
    const requestMethod = 'DELETE';
    const url = this.apiBuilder.getStaffGroupsUrl(requestMethod, group.id);
    this.http.request(requestMethod, url)
      .subscribe((result: boolean) => {
        if (result) {
          this.getGroups();
          return;
        }
        this.showErrorMessage(this.translateService.instant('ADMIN_MENU_STAFF'));
      });
  }

  /**
   * show error message
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
   * change group pagination handler
   * @param event
   */
  changeGroupSortOrPagination(event: PageEvent | Sort): void {
    this.getGroups();
  }
}
