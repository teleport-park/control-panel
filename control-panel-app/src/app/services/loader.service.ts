import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /**
   * Loader observer
   */
  showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loaderTread$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.loaderTread$.pipe(debounceTime(1000)).subscribe((value: boolean) => {
      this.showLoader$.next(value);
    });
  }

  /**
   * shw or hide loader
   * @param value
   */
  dispatchShowLoader(value: boolean) {
    this.loaderTread$.next(value);
  }
}
