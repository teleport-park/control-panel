import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StaffMember, StaffMemberResponse } from '../../../../../../models';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../../../../services/loader/loader.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '../../../../../../common/translations-module';
import { AppData } from '../../../../../../interfaces';
import { IAppStorageInterface } from '../../../../../../interfaces/app-storage-interface';
import { ApiUrlsService } from '../../../../../../services/api-urls.service';

@Injectable()
export class StaffService {

  /**
   * staff storage key
   */
  public readonly STAFF_STORAGE_KEY: string = 'STAFF';

  /**
   * staff members
   */
  staffMembers$: BehaviorSubject<AppData<StaffMemberResponse>> = new BehaviorSubject(null);

  /**
   * Constructor
   * @param http
   * @param loader
   * @param toaster
   * @param translations
   * @param storage
   * @param apiBuilder
   */
  constructor(private http: HttpClient,
              private loader: LoaderService,
              private toaster: MatSnackBar,
              private translations: TranslateService,
              @Inject('IAppStorageInterface') private storage: IAppStorageInterface,
              private apiBuilder: ApiUrlsService) {
  }

  /**
   * get staff member
   * @param id
   */
  getStaffMember(id): Observable<any> {
    // const requestMethod = 'GET';
    // const url = this.apiBuilder.getStaffUrl(requestMethod, id);
    // return this.http.request<AppData<StaffMemberResponse>>(requestMethod, url)
    //   .pipe(map((data: AppData<StaffMemberResponse>) => {
    //     const staffMember = Object.assign(new StaffMemberResponse(), data.items[0]);
    //     staffMember.staffGroupName = staffMember.group.name;
    //     staffMember.staffGroupId = staffMember.group.id;
    //     return staffMember;
    // }));
    return of([]);
  }

  /**
   * get staff members
   */
  getStaffMembers(): void {
    // const page = this._paramsHelper.getPaginationParams(this.STAFF_STORAGE_KEY, this.storage);
    // const requestMethod = 'GET';
    // const url = this.apiBuilder.getStaffUrl(requestMethod, null, page.pageSize, page.pageIndex + 1);
    // this.http.request<AppData<StaffMemberResponse>>(requestMethod, url)
    //   .pipe(
    //     finalize(() => {
    //       this.loader.dispatchShowLoader(false);
    //     }))
    //   .subscribe((data: AppData<StaffMemberResponse>) => {
    //     data.items = data.items.map((staffMember: StaffMemberResponse) => {
    //       staffMember.staffGroupName = staffMember.group.name;
    //       staffMember.staffGroupId = staffMember.group.id;
    //       return staffMember;
    //     });
    //     this.staffMembers$.next(data);
    //   });
  }

  /**
   * edit staff member
   * @param staffMember
   */
  editStaffMember(staffMember: StaffMember): void {
    // const requestMethod = 'PUT';
    // const url = this.apiBuilder.getStaffUrl(requestMethod, staffMember.id);
    // this.loader.dispatchShowLoader(true);
    // this.http.request(requestMethod, url, {body: staffMember}).subscribe(() => {
    //   this.getStaffMembers();
    // });
  }

  /**
   * add staff member
   * @param staffMember
   */
  addStaffMember(staffMember: StaffMember): void {
    // const requestMethod = 'POST';
    // const url = this.apiBuilder.getStaffUrl(requestMethod);
    // this.loader.dispatchShowLoader(true);
    // this.http.request(requestMethod, url, {body: staffMember}).subscribe(() => {
    //   this.getStaffMembers();
    // });
  }

  /**
   * remove staff member
   * @param staffMember
   */
  removeStaffMember(staffMember: StaffMember): void {
    // const requestMethod = 'DELETE';
    // const url = this.apiBuilder.getStaffUrl(requestMethod, staffMember.id);
    // this.loader.dispatchShowLoader(true);
    // this.http.request(requestMethod, url).subscribe(() => {
    //   this.getStaffMembers();
    // });
  }

  /**
   * change staff pagination or sort handler
   * @param event
   */
  changeStaffSortOrPagination(event: PageEvent | Sort): void {
    this.getStaffMembers();
  }
}
