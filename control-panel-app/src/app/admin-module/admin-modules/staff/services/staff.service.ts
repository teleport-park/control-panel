import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { Group, StaffMember } from "../../../../models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { finalize } from "rxjs/operators";
import { LoaderService } from "../../../../services/loader.service";

@Injectable()
export class StaffService {

  /**
   * staff members
   */
  staffMembers$: Subject<StaffMember[]> = new Subject();

  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);

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
    this.http.get(`${environment.api}staff`)
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((result: StaffMember[]) => {
        this.staffMembers$.next(result);
      });
  }

  /**
   * get groups
   */
  getGroups(): void {
    this.http.get(`${environment.api}groups`)
      .pipe(
        finalize(() => {
          this.loader.dispatchShowLoader(false);
        }))
      .subscribe((result: Group[]) => {
        this.groups$.next(result);
      });
  }
}
