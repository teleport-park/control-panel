import { Injectable, OnDestroy } from '@angular/core';
import { User } from "../../../../models/user.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { filter } from "rxjs/operators";

@Injectable()
export class UserService implements OnDestroy {

  /**
   * users subject
   */
  users$: Subject<User[]> = new Subject();

  /**
   * constructor
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * get users
   */
  getUsers(): void {
    this.http.get<User[]>(`${environment.api}users`)
      .pipe(filter(data => !!data))
      .subscribe((users: User[]) => {
        this.users$.next(users);
      });
  }

  /**
   * save user
   */
  saveUser(user: User): void {
    this.http.post(`${environment.api}users`, user).subscribe(result => {
      this.getUsers();
    })
  }

  /**
   * edit user
   */
  editUser(user: User): void {
    this.http.put(`${environment.api}users/${user.id}`, user).subscribe(result => {
      this.getUsers();
    })
  }

  /**
   * remove user
   */
  removeUser(user: User): void {
    this.http.delete(`${environment.api}users/${user.id}`).subscribe(result => {
      this.getUsers();
    })
  }

  /**
   * In destroy hook
   */
  ngOnDestroy(): void {
    this.users$.complete();
  }
}
