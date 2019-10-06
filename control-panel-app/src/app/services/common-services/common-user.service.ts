import { UserService } from '../../models/intefaces';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Visitor } from '../../models';


export class CommonUserService implements UserService<Visitor> {

    users$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient,
                private getUrl: (method: string, id?: string, query?: string, limit?: number, offset?: number) => string) {
        this.getUsers();
    }

    getUsers(query?: string, limit: number = 50, offset: number = 0): void {
        this.http.get(this.getUrl('GET', null, query, limit, offset))
        .pipe(filter(data => !!data))
        .subscribe((data: any[]) => {
            this.users$.next(data);
        });
    }

    getUser(id: string): Observable<Visitor> {
        return this.http.get<Visitor>(this.getUrl('GET', id));
    }

   editUser(user: Visitor): void {
        this.http.put(this.getUrl('PUT', user.id), user)
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
        this.http.delete(this.getUrl('DELETE', id))
            .pipe(filter(data => !!data))
            .subscribe((result) => {
                this.getUsers();
            });
   }
}
