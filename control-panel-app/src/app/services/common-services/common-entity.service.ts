import { EntityService, SchemaValidationItem } from '../../models/intefaces';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestHelper } from '../../models/helpers/request-helper';
import { UserType } from '../../models/types';
import { LoaderService } from '../loader/loader.service';
import { environment } from '../../../environments/environment';
import { validateSchema } from '../../utils/utils';

interface T {
  id?: string;
}


export class CommonEntityService implements EntityService<T> {

  entities$: BehaviorSubject<T[]> = new BehaviorSubject([]);

  requestHelper: RequestHelper = new RequestHelper(this.getPagedEntity.bind(this), {limit: 25, offset: 0});

  constructor(
    private http: HttpClient,
    private getUrl: (method: string,
                     id?: string,
                     query?: string,
                     limit?: number,
                     offset?: number,
                     sortingParams?: { [key: string]: string },
                     filtersQuery?: string) => string,
    private sortingInitState: { [key: string]: string },
    private loader: LoaderService,
    private schema?: SchemaValidationItem[]) {
    this.requestHelper = new RequestHelper(this.getPagedEntity.bind(this), {limit: 25, offset: 0}, sortingInitState);
  }

  getEntities(query?: string): void {
    this.loader.dispatchShowLoader(true);
    this.requestHelper.getData(query)
      .pipe(filter(data => !!data),
        map((result: UserType[]) => {
          if (environment.dev && this.schema && result?.length) {
            validateSchema(result[0], this.schema, this.getUrl('GET'));
          }
          return result;
        }))
      .subscribe((result: UserType[]) => {
          this.entities$.next(result);
        }, _ => {

        },
        () => {
          this.loader.dispatchShowLoader(false);
        }
      );
  }

  private getPagedEntity(query?: string,
                         limit: number = 50,
                         offset: number = 0,
                         sortingParams: { [key: string]: string } = {},
                         filtersQuery: string = ''
  ): Observable<HttpResponse<any>> {
    return this.http.get(this.getUrl('GET', null, query, limit, offset, sortingParams, filtersQuery), {observe: 'response'});
  }

  getEntity(id: string): Observable<T> {
    return this.http.get<T>(this.getUrl('GET', id));
  }

  editEntity(entity: T): void {
    // TODO different API implementation
    const id = entity.id;
    delete entity.id;
    // TODO end
    this.loader.dispatchShowLoader(true);
    this.http.put(this.getUrl('PUT', id), entity)
      .pipe(filter(data => !!data))
      .subscribe(_ => {
        this.getEntities();
      });
  }

  addEntity(entity: T): void {
    this.loader.dispatchShowLoader(true);
    this.http.post(this.getUrl('POST'), entity)
      .pipe(filter(data => !!data))
      .subscribe(_ => {
        this.getEntities();
      });
  }

  deleteEntity(id: string): void {
    this.http.delete(this.getUrl('DELETE', id), {responseType: 'text'})
      .subscribe(_ => {
        this.getEntities();
      });
  }
}
