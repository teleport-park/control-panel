import { Injectable } from '@angular/core';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {LoaderService} from '../../../../../services/loader.service';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Session} from 'inspector';
import {catchError, filter} from 'rxjs/operators';
import {ApiUrlsService} from '../../../../../services/api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  sessions$: BehaviorSubject<Session[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
              private toaster: MatSnackBar,
              private urlService: ApiUrlsService,
              private loaderService: LoaderService) {
    this.getSessions();
  }

  private getSessions(): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.get(this.urlService.getSessions('GET'))
        .pipe(
            filter(data => !!data),
            catchError(err => {
              this.loaderService.dispatchShowLoader(false);
              this.showError(err);
              return EMPTY;
            }))
        .subscribe((result: Session[]) => {
          this.sessions$.next(result);
          this.loaderService.dispatchShowLoader(false);
        });

  }

  private showError(message) {
    this.toaster.open(message, null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toaster-error'
    });
  }
}
