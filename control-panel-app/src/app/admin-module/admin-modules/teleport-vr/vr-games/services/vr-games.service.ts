import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiUrlsService } from '../../../../../services/api-urls.service';
import { LoaderService } from '../../../../../services/loader.service';
import { VRGame, VRGameRequest } from '../../../../../models/vr-game.model';

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
      .subscribe((result: VRGame[]) => {
         this.vrGames$.next(result);
         this.loaderService.dispatchShowLoader(false);
      });
   }

   update(game: VRGame) {
      const payload = new VRGameRequest(game);
      this.http.patch(this.urlService.getVRGames('PATCH'), payload).subscribe(
         res => this.getGames()
      );
   }
}
