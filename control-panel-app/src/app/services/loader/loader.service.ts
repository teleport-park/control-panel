import {Injectable} from '@angular/core';
import {BehaviorSubject, timer} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {LoaderComponent} from './loader.component';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  _debounce: number = 100;

  _loaderOverlay: OverlayRef;

  /**
   * Loader observer
   */
  showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loaderTread$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private overlay: Overlay) {
    this.loaderTread$.pipe(debounce(() => timer(this._debounce))).subscribe((value: boolean) => {
      if (value) {
        if (!this._loaderOverlay) {
          this._loaderOverlay = this.overlay.create({
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true
          })
          this._loaderOverlay.attach(new ComponentPortal(LoaderComponent))
        }
      } else {
        this._loaderOverlay && this._loaderOverlay.detach();
        this._loaderOverlay = null;
      }
    });
  }

  /**
   * show or hide loader
   * @param value
   * @param deb
   */
  dispatchShowLoader(value: boolean, deb: number = 100) {
    this._debounce = deb;
    this.loaderTread$.next(value);
  }
}