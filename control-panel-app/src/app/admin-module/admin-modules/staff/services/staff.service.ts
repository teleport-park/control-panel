import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group, Permission, StaffMember, StaffMemberResponse } from '../../../../models';
import { HttpClient } from '@angular/common/http';
import { filter, finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import { MatSnackBar, PageEvent, Sort } from '@angular/material';
import { TranslateService } from '../../../../common/translations-module';
import { AppData } from '../../../../interfaces';
import { BuildParamsHelper } from '../../../../utils/build-params-helper';
import { IAppStorageInterface } from '../../../../interfaces/app-storage-interface';
import { ApiUrlsService } from '../../../../services/api-urls.service';

@Injectable()
export class StaffService {

  /**
   * staff storage key
   */
  public readonly STAFF_STORAGE_KEY: string = 'STAFF';

  /**
   * group storage key
   */
  public readonly GROUP_STORAGE_KEY: string = 'GROUPS';

  /**
   * staff members
   */
  staffMembers$: BehaviorSubject<AppData<StaffMemberResponse>> = new BehaviorSubject(null);

  /**
   * groups
   */
  groups$: BehaviorSubject<AppData<Group>> = new BehaviorSubject(null);

  /**
   * permissions
   */
  permissions$: BehaviorSubject<AppData<Permission>> = new BehaviorSubject(null);

  /**
   * group
   */
  groupsMap$: BehaviorSubject<AppData<Group>> = new BehaviorSubject(null);

  /**
   * param builder
   */
  private _paramsHelper: BuildParamsHelper = new BuildParamsHelper();

  /**
   * Constructor
   * @param http
   * @param loader
   * @param toaster
   * @param translateService
   * @param storage
   * @param apiBuilder
   */
  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translateService: TranslateService,
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
              private apiBuilder: ApiUrlsService) {
  }

  /**
   * get staff member
   * @param id
   */
  getStaffMember(id): Observable<AppData<StaffMemberResponse>> {
    const requestMethod = 'GET';
    const url = this.apiBuilder.getStaffUrl(requestMethod, id);
    return this.http.request<AppData<StaffMemberResponse>>(requestMethod, url);
  }

  /**
   * get staff members
   */
  getStaffMembers(): void {
    const page = this._paramsHelper.getPaginationParams(this.STAFF_STORAGE_KEY, this.storage);
    const requestMethod = 'GET';
    const url = this.apiBuilder.getStaffUrl(requestMethod, null, page.pageSize, page.pageIndex + 1);
    this.http.request<AppData<StaffMemberResponse>>(requestMethod, url)
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((data: AppData<StaffMemberResponse>) => {
        data.items = data.items.map((staffMember: StaffMemberResponse) => {
          staffMember.staffGroupName = staffMember.group.name;
          staffMember.staffGroupId = staffMember.group.id;
          return staffMember;
        });
        this.staffMembers$.next(data);
      });
  }

  /**
   * edit staff member
   * @param staffMember
   */
  editStaffMember(staffMember: StaffMember): void {
    const requestMethod = 'PUT';
    const url = this.apiBuilder.getStaffUrl(requestMethod, staffMember.id);
    this.loader.dispatchShowLoader(true);
    this.http.request(requestMethod, url, {body: staffMember}).subscribe(() => {
      this.getStaffMembers();
    });
  }

  /**
   * add staff member
   * @param staffMember
   */
  addStaffMember(staffMember: StaffMember): void {
    const requestMethod = 'POST';
    const url = this.apiBuilder.getStaffUrl(requestMethod);
    this.loader.dispatchShowLoader(true);
    this.http.request(requestMethod, url, {body: staffMember}).subscribe(() => {
      this.getStaffMembers();
    });
  }

  /**
   * remove staff member
   * @param staffMember
   */
  removeStaffMember(staffMember: StaffMember): void {
    const requestMethod = 'DELETE';
    const url = this.apiBuilder.getStaffUrl(requestMethod, staffMember.id);
    this.loader.dispatchShowLoader(true);
    this.http.request(requestMethod, url).subscribe(() => {
      this.getStaffMembers();
    });
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
    const url  = this.apiBuilder.getPermissionsUrl(requestMethod);
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
   * get groups map
   */
  getGroupMap(pageSize = 10, pageIndex = 1) {
    const requestMethod = 'GET';
    const url = this.apiBuilder.getStaffGroupsUrl(requestMethod, null, pageSize, pageIndex);
    this.http.request(requestMethod, url)
      .pipe(filter(data => !!data))
      .subscribe((result: AppData<Group>) => {
        this.groupsMap$.next(result);
      });
  }

  /**
   * get permissions
   */
  getPermissions(pageSize: number = 10, pageNumber: number = 1) {
    const requestMethod = 'GET';
    const url = this.apiBuilder.getPermissionsUrl(requestMethod, null, pageSize, pageNumber);
    return this.http.request(requestMethod, url)
      .subscribe((data: AppData<Permission>) => {
        this.permissions$.next(data);
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
   * change staff pagination or sort handler
   * @param event
   */
  changeStaffSortOrPagination(event: PageEvent | Sort): void {
    this.getStaffMembers();
  }

  /**
   * change group pagination handler
   * @param event
   */
  changeGroupSortOrPagination(event: PageEvent | Sort): void {
    this.getGroups();
  }
}
