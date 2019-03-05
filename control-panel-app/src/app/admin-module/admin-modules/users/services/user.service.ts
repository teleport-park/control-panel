import { Injectable } from '@angular/core';
import { User } from "../../../../models/user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * get users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('./assets/data/users.data.json');
  }
}
