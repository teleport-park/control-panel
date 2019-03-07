import { Injectable } from '@angular/core';
import { User } from "../../../../models/user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * get users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}users`);
  }
}
