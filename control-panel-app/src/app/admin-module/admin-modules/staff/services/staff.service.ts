import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group, Permission, StaffMember, StaffMemberResponse } from '../../../../models';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
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
  groups: Group[];

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
    return this.http.request<AppData<StaffMemberResponse>>('GET', this.apiBuilder.getStaffUrl('GET', id));
  }

  /**
   * get staff members
   */
  getStaffMembers(): void {
    const page = this._paramsHelper.getPaginationParams(this.STAFF_STORAGE_KEY, this.storage);
    this.http.request<AppData<StaffMemberResponse>>('GET',
      this.apiBuilder.getStaffUrl('GET', null, page.pageSize, page.pageIndex + 1))
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
    this.loader.dispatchShowLoader(true);
    this.http.request('PUT', this.apiBuilder.getStaffUrl('PUT', staffMember.id), {body: staffMember}).subscribe(() => {
      this.getStaffMembers();
    });
  }

  /**
   * add staff member
   * @param staffMember
   */
  addStaffMember(staffMember: StaffMember): void {
    this.loader.dispatchShowLoader(true);
    this.http.request('POST', this.apiBuilder.getStaffUrl('POST'), {body: staffMember}).subscribe(() => {
      this.getStaffMembers();
    });
  }

  /**
   * remove staff member
   * @param staffMember
   */
  removeStaffMember(staffMember: StaffMember): void {
    this.loader.dispatchShowLoader(true);
    this.http.request('DELETE', this.apiBuilder.getStaffUrl('DELETE', staffMember.id)).subscribe(() => {
      this.getStaffMembers();
    });
  }

  /**
   * get groups
   */
  getGroups(): void {
    const page = this._paramsHelper.getPaginationParams(this.GROUP_STORAGE_KEY, this.storage);
    this.http.request('GET', this.apiBuilder.getStaffGroupsUrl('GET', null, page.pageSize, page.pageIndex + 1))
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((data: AppData<Group>) => {
        this.groups = data.items;
        this.groups$.next(data);
      });
  }

  /**
   * add group
   * @param group
   */
  addGroup(group: Group): void {
    this.http.request('POST', this.apiBuilder.getStaffGroupsUrl('POST'), {body: group}).subscribe((result: number) => {
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
    this.loader.dispatchShowLoader(true);
    this.http.request('PUT', this.apiBuilder.getStaffGroupsUrl('PUT', group.id), {body: group})
      .subscribe(() => {
      this.addPermissionsToGroup(group);
    });
  }

  /**
   * add permission to group
   * @param group
   */
  addPermissionsToGroup(group: Group): void {
    this.http.request('POST', this.apiBuilder.getPermissionsUrl('POST'), {body: {staffGroupId: group.id, permissionIds: group.permissions}})
      .subscribe(() => {
        this.getGroups();
      });
  }

  /**
   * delete group
   * @param group
   */
  deleteGroup(group: Group): void {
    this.http.request('DELETE', this.apiBuilder.getStaffGroupsUrl('DELETE', group.id))
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
  getGroupMap() {
    return this.groups.map((group: Group) => {
      return {value: group.id, viewValue: group.name};
    });
  }

  /**
   * get permissions
   */
  getPermissions(pageSize: number = 10, pageNumber: number = 1) {
    return this.http.request('GET', this.apiBuilder.getPermissionsUrl('GET', null, pageSize, pageNumber))
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
