import { UserService } from '../../models/intefaces';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Visitor } from '../../models';
import { Pagination } from '../../models/classes/pagination';
import { UserType } from '../../models/types';


export class CommonUserService implements UserService<UserType> {

    users$: BehaviorSubject<UserType[]> = new BehaviorSubject([]);

    pagination: Pagination = new Pagination(this.getPagedUser.bind(this), {limit: 25, offset: 0});

    constructor(private http: HttpClient,
                private getUrl: (method: string, id?: string, query?: string, limit?: number, offset?: number) => string) {
    }

    getUsers(query?: string): void {
        this.pagination.getData(query)
        .pipe(filter(data => !!data))
        .subscribe((result: UserType[]) => {
                this.users$.next(result);
            });
    }

    private getPagedUser(query?: string, limit: number = 50, offset: number = 0): Observable<HttpResponse<any>> {
        return this.http.get(this.getUrl('GET', null, query, limit, offset), {observe: 'response'});
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
        this.http.delete(this.getUrl('DELETE', id), {responseType: 'text'})
        .pipe(filter(data => !!data))
        .subscribe((result) => {
            this.getUsers();
        });
    }
}
