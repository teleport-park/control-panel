import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group, Permission, StaffMember, StaffMemberResponse } from '../../../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import { MatSnackBar, PageEvent, Sort } from '@angular/material';
import { TranslateService } from '../../../../common/translations-module';
import { StorageService } from '../../../../services/storage.service';
import { AppData } from '../../../../interfaces';
import { BuildParamsHelper } from '../../../utils/build-params-helper';

@Injectable()
export class StaffService {

  /**
   * staff url
   */
  static readonly STAFF_API: string = `${environment.origin}${environment.api.STAFF}`;

  /**
   * group url
   */
  static readonly STAFF_GROUP_API: string = `${environment.origin}${environment.api.GROUPS}`;

  /**
   * permission api
   */
  static readonly PERMISSIONS_API: string = `${environment.origin}${environment.api.PERMISSIONS}`;

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
   */
  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translateService: TranslateService,
              public storage: StorageService) {
  }

  // /**
  //  * get staff member amount
  //  */
  // getStaffMembersAmount(): void {
  //   this.staffCount$ = this.http.get(`${StaffService.STAFF_API}/totalpages/1`).pipe(
  //     map((result: number) => result)
  //   );
  // }
  //
  // /**
  //  * get staff group amount
  //  */
  // getStaffGroupAmount(): void {
  //   this.staffGroupCount$ = this.http.get(`${StaffService.STAFF_GROUP_API}/totalpages/1`).pipe(
  //     map((result: number) => result)
  //   );
  // }

  /**
   * get staff members
   */
  getStaffMember(): void {
    const params = this._paramsHelper.getParams(this.STAFF_STORAGE_KEY, this.storage);
    this.http.get(
      `${StaffService.STAFF_API}`, {params})
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((data: AppData<StaffMemberResponse>) => {
        data.items = data.items.map((staffMember: StaffMemberResponse) => {
          return Object.assign(new StaffMemberResponse(staffMember.group.name, staffMember.group.id), staffMember);
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
    this.http.put(`${StaffService.STAFF_API}/${staffMember.id}`, staffMember).subscribe(() => {
      this.getStaffMember();
    });
  }

  /**
   * add staff member
   * @param staffMember
   */
  addStaffMember(staffMember: StaffMember): void {
    this.loader.dispatchShowLoader(true);
    this.http.post(`${StaffService.STAFF_API}`, staffMember).subscribe(() => {
      this.getStaffMember();
    });
  }

  /**
   * remove staff member
   * @param staffMember
   */
  removeStaffMember(staffMember: StaffMember): void {
    this.loader.dispatchShowLoader(true);
    this.http.delete(`${StaffService.STAFF_API}/${staffMember.id}`).subscribe(() => {
      this.getStaffMember();
    });
  }

  /**
   * get groups
   */
  getGroups(): void {
    const params = this._paramsHelper.getParams(this.GROUP_STORAGE_KEY, this.storage);
    this.http.get(
      `${StaffService.STAFF_GROUP_API}?`, {params})
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
    this.http.post(`${StaffService.STAFF_GROUP_API}`, group).subscribe((result: number) => {
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
    this.http.put(`${StaffService.STAFF_GROUP_API}/${group.id}`, group).subscribe(() => {
      this.addPermissionsToGroup(group);
    });
  }

  /**
   * add permission to group
   * @param group
   */
  addPermissionsToGroup(group: Group): void {
    this.http.post(`${StaffService.PERMISSIONS_API}`, {staffGroupId: group.id, permissionIds: group.permissions})
      .subscribe(() => {
        this.getGroups();
      });
  }

  /**
   * delete group
   * @param group
   */
  deleteGroup(group: Group): void {
    this.http.delete(`${StaffService.STAFF_GROUP_API}/${group.id}`).subscribe((result: boolean) => {
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
    return this.http.get(`${StaffService.PERMISSIONS_API}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
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
    this.getStaffMember();
  }

  /**
   * change group pagination handler
   * @param event
   */
  changeGroupSortOrPagination(event: PageEvent | Sort): void {
    this.getGroups();
  }
}
