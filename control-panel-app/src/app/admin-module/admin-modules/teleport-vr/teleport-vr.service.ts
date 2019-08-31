import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { TVRModel } from '../../../models';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class TeleportVrService implements OnDestroy {

  trvInstances$: BehaviorSubject<TVRModel[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient, private apiService: ApiUrlsService, private toaster: MatSnackBar) {
    this.getTVRInstances();
  }

  getTVRInstances(): void {
    this.http.get<TVRModel[]>(this.apiService.getTVRUrl('GET'))
        .subscribe((result: TVRModel[]) => {
          this.trvInstances$.next(result);
        });
  }

  grantTVRInstance(token: string): Observable<any> {
    return this.http.put<any>(this.apiService.getTVRUrl('PUT', token), {})
        .pipe(catchError(err => {
          this.showError(err);
          return EMPTY;
        }));
  }

  revokeTVRInstance(token: string): Observable<any> {
    return this.http.delete<any>(this.apiService.getTVRUrl('DELETE', token))
        .pipe(catchError(err => {
          this.showError(err);
          return EMPTY;
        }));
  }

  private showError(message) {
    this.toaster.open(message, null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toaster-error'
    });
  }

  ngOnDestroy(): void {
    this.trvInstances$.complete();
  }
}
