import { Injectable } from '@angular/core';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiUrlsService} from '../../../../../services/api-urls.service';
import {LoaderService} from '../../../../../services/loader.service';
import {catchError, filter} from 'rxjs/operators';
import {VRGame} from '../../../../../models/vr-game.model';

@Injectable({
  providedIn: 'root'
})
export class VrGamesService {

  vrGames$: BehaviorSubject<VRGame[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
              private toaster: MatSnackBar,
              private urlService: ApiUrlsService,
              private loaderService: LoaderService) {
    this.getGames();
  }

  private getGames(): void {
    this.loaderService.dispatchShowLoader(true);
    this.http.get(this.urlService.getVRGames('GET'))
        .pipe(
            filter(data => !!data),
            catchError(err => {
              this.loaderService.dispatchShowLoader(false);
              this.showError(err);
              return EMPTY;
            }))
        .subscribe((result: VRGame[]) => {
          this.vrGames$.next(result);
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
