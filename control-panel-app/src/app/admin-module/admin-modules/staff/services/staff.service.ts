import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group, Permission, StaffMember } from '../../../../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { finalize, map } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import { StaffMemberResponse } from '../../../../models/staff-member-response.model';
import { MatSnackBar, PageEvent, Sort, SortDirection } from '@angular/material';
import { TranslateService } from '../../../../common/translations-module';
import { StorageService } from '../../../../services/storage.service';
import { DefaultPagination } from '../../../../models/default-pagination';
import { DefaultSort } from '../../../../models/default-sort';

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
   * paging api
   */
  static readonly PAGING: any = environment.api.paging;

  /**
   * sort api
   */
  static readonly SORT: any = environment.api.sorting;

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
  staffMembers$: BehaviorSubject<StaffMemberResponse[]> = new BehaviorSubject(null);

  /**
   * groups
   */
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject(null);

  /**
   * permissions
   */
  permissions$: BehaviorSubject<Permission[]> = new BehaviorSubject(null);

  /**
   * staff count
   */
  staffCount$: Observable<number>;

  /**
   * staff count
   */
  staffGroupCount$: Observable<number>;

  /**
   * group
   */
  _group: Group[];

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

  /**
   * get staff member amount
   */
  getStaffMembersAmount(): void {
    this.staffCount$ = this.http.get(`${StaffService.STAFF_API}/totalpages/1`).pipe(
      map((result: number) => result)
    );
  }

  /**
   * get staff group amount
   */
  getStaffGroupAmount(): void {
    this.staffGroupCount$ = this.http.get(`${StaffService.STAFF_GROUP_API}/totalpages/1`).pipe(
      map((result: number) => result)
    );
  }

  /**
   * get staff members
   */
  getStaffMember(): void {
    const params = this.getParams(this.STAFF_STORAGE_KEY);
    this.http.get(
      `${StaffService.STAFF_API}`, {params})
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((result: StaffMemberResponse[]) => {
        const staffMemberList = result.map((staffMember: StaffMemberResponse) => {
          return Object.assign(new StaffMemberResponse(staffMember.group.name, staffMember.group.id), staffMember);
        });
        this.getStaffMembersAmount();
        this.staffMembers$.next(staffMemberList);
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
    const params = this.getParams(this.GROUP_STORAGE_KEY);
    this.http.get(
      `${StaffService.STAFF_GROUP_API}?`, {params})
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((result: Group[]) => {
        this._group = result.map((group: Group) => {
          return Object.assign(new Group(), group);
        });
        this.groups$.next(this._group);
        this.getStaffGroupAmount();
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
      .subscribe((result) => {
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
    return this._group.map((group: Group) => {
      return {value: group.id, viewValue: group.name};
    });
  }

  /**
   * get permissions
   */
  getPermissions(pageSize: number = 50, pageNumber: number = 1) {
    this.http.get(`${StaffService.PERMISSIONS_API}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
      .subscribe((result: Permission[]) => {
        this.getGroups();
        this.getStaffMember();
        this.permissions$.next(result);
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

  private getParams(key: string) {
    const page = this.storage.getValue(`${key}_PAGINATION`) || new DefaultPagination();
    const sort = this.storage.getValue(`${key}_SORT`) || new DefaultSort();
    return new HttpParams()
      .set(StaffService.PAGING.size, page.pageSize)
      .set(StaffService.PAGING.page, page.pageIndex + 1)
      .set(StaffService.SORT.column, sort.active)
      .set(StaffService.SORT.direction, `${this.getDirection(sort.direction)}`);
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
