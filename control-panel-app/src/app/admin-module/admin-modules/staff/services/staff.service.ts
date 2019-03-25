import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group, Permission, StaffMember } from '../../../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { finalize, map } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';
import { StaffMemberResponse } from '../../../../models/staff-member-response.model';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '../../../../common/translations-module';

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

  staffAmount$: Observable<number>;

  staffGroupAmount$: Observable<number>;

  permissionAmount$: Observable<number>;

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
   */
  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translateService: TranslateService) {
  }

  /**
   * get staff member amount
   */
  getStaffMembersAmount(): void {
    this.staffAmount$ = this.http.get(`${StaffService.STAFF_API}/totalpages/1`).pipe(
      map((result: number) => result)
    );
  }

  /**
   * get staff group amount
   */
  getStaffGroupAmount(): void {
    this.staffGroupAmount$ = this.http.get(`${StaffService.STAFF_GROUP_API}/totalpages/1`).pipe(
      map((result: number) => result)
    );
  }

  /**
   * get staff members
   */
  getStaffMember(pageSize: number = 50, pageNumber: number = 1): void {
    this.http.get(`${StaffService.STAFF_API}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
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
    this.http.post(`${StaffService.STAFF_API}`, staffMember).subscribe((r) => {
      console.log(r);
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
  getGroups(pageSize: number = 50, pageNumber: number = 1): void {
    this.http.get(`${StaffService.STAFF_GROUP_API}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
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
    this.http.post(`${StaffService.STAFF_GROUP_API}`, group).subscribe((result) => {
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
