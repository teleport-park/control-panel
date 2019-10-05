import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppData } from '../interfaces';
import { Group, Permission } from '../models';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from './api-urls.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * group
   */
  groupsMap$: BehaviorSubject<Group[]> = new BehaviorSubject(null);

  /**
   * permissions
   */
  permissions$: BehaviorSubject<AppData<Permission>> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private apiBuilder: ApiUrlsService) { }

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
   * get groups map
   */
  getGroups(pageSize = 5, pageIndex = 1) {
    // const requestMethod = 'GET';
    // const url = this.apiBuilder.getStaffGroupsUrl(requestMethod, null, pageSize, pageIndex);
    // this.http.request(requestMethod, url)
    //   .pipe(filter(data => !!data))
    //   .subscribe((result: AppData<Group>) => {
    //     this.groupsMap$.next(result);
    //   });

      this.groupsMap$.next([{id: 1, name: 'Admin', permissions: [1, 2, 3]} as Group]);
  }
}
