import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Group, StaffMember } from '../../../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';

@Injectable()
export class StaffService {

  /**
   * staff url
   */
  static readonly STAFF_API: string = `${environment.origin}${environment.api.STAFF}`;

  /**
   * group url
   */
  static readonly GROUP_API: string = `${environment.origin}${environment.api.GROUPS}`;

  static readonly PERMISSION_API: string = `${environment.origin}${environment.api.PERMISSIONS}`;

  /**
   * staff members
   */
  staffMembers$: Subject<StaffMember[]> = new Subject();

  /**
   * groups
   */
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);

  permissions$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  _group: Group[];

  /**
   * Constructor
   * @param http
   * @param loader
   */

  constructor(private http: HttpClient, private loader: LoaderService) {
  }

  /**
   * get staff members
   */
  getStaffMember(): void {
    this.http.get(`${StaffService.STAFF_API}`)
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((result: StaffMember[]) => {
        this.staffMembers$.next(result);
      });
  }

  /**
   * edit staff member
   * @param staffMember
   */
  editStaffMember(staffMember: StaffMember): void {
    this.loader.dispatchShowLoader(true);
    this.http.put(`${StaffService.STAFF_API}`, staffMember).subscribe(() => {
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
    this.http.get(`${StaffService.GROUP_API}`)
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((result: Group[]) => {
        this.getStaffMember();
        this._group = result;
        this.groups$.next(result);
      });
  }

  /**
   * get groups map
   */
  getGroupMap() {
    return this._group.map((group: Group) => {
      return {value: group.identity, viewValue: group.name};
    });
  }

  /**
   * get permissions
   */
  getPermissions() {
    this.http.get(`${StaffService.PERMISSION_API}`).subscribe(
      (result: string[]) => {
        this.permissions$.next(result);
        this.getGroups();
      }
    );
  }
}
