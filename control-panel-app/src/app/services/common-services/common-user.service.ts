import { UserService } from '../../models/intefaces';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Visitor } from '../../models';
import { RequestHelper } from '../../models/helpers/request-helper';
import { UserType } from '../../models/types';


export class CommonUserService implements UserService<UserType> {

   users$: BehaviorSubject<UserType[]> = new BehaviorSubject([]);

   requestHelper: RequestHelper = new RequestHelper(this.getPagedUser.bind(this), {limit: 25, offset: 0});

   constructor(
      private http: HttpClient,
      private getUrl: (method: string,
                       id?: string,
                       query?: string,
                       limit?: number,
                       offset?: number,
                       otherParams?: { [key: string]: string }) => string,
      private sortingInitState: {[key: string]: string} = {}) {
      this.requestHelper = new RequestHelper(this.getPagedUser.bind(this), {limit: 25, offset: 0}, sortingInitState);
   }

   getUsers(query?: string): void {
      this.requestHelper.getData(query)
      .pipe(filter(data => !!data))
      .subscribe((result: UserType[]) => {
         this.users$.next(result);
      });
   }

   private getPagedUser(query?: string, limit: number = 50, offset: number = 0, otherParams: { [key: string]: string } = {}): Observable<HttpResponse<any>> {
      return this.http.get(this.getUrl('GET', null, query, limit, offset, otherParams), {observe: 'response'});
   }

   getUser(id: string): Observable<Visitor> {
      return this.http.get<Visitor>(this.getUrl('GET', id));
   }

   editUser(user: Visitor): void {
      // TODO different API implementation
      const id = user.id;
      delete user.id;
      // TODO end
      this.http.put(this.getUrl('PUT', id), user)
      .pipe(filter(data => !!data))
      .subscribe((result) => {
         this.getUsers();
      });
   }

   addUser(user: Visitor): void {
      this.http.post(this.getUrl('POST'), user)
      .pipe(filter(data => !!data))
      .subscribe((result) => {
         this.getUsers();
      });
   }

   deleteUser(id: string): void {
      this.http.delete(this.getUrl('DELETE', id), {responseType: 'text'})
      .subscribe((result) => {
         this.getUsers();
      });
   }
}
