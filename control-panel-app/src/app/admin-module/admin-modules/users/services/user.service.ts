import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../../../models/';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { filter, finalize } from 'rxjs/operators';
import { LoaderService } from '../../../../services/loader.service';

@Injectable()
export class UserService implements OnDestroy {

  /**
   * users subject
   */
  users$: Subject<User[]> = new Subject();

  /**
   * constructor
   * @param http
   * @param loaderService
   */
  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  /**
   * get users
   */
  getUsers(): void {
    this.http.get<User[]>(`${environment.api}mockusers`)
      .pipe(filter(data => !!data), finalize(() => {
        this.loaderService.dispatchShowLoader(false);
      }))
      .subscribe((users: User[]) => {
        this.users$.next(users);
      });
  }

  /**
   * save user
   */
  saveUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.post(`${environment.api}mockusers`, user).subscribe(result => {
      this.getUsers();
    });
  }

  /**
   * edit user
   */
  editUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.put(`${environment.api}mockusers/${user.id}`, user).subscribe(result => {
      this.getUsers();
    });
  }

  /**
   * remove user
   */
  removeUser(user: User): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.delete(`${environment.api}mockusers/${user.id}`).subscribe(result => {
      this.getUsers();
    });
  }

  /**
   * In destroy hook
   */
  ngOnDestroy(): void {
    this.users$.complete();
  }
}
