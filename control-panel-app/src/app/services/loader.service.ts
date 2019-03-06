import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /**
   * Loader observer
   */
  showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  /**
   * shw or hide loader
   * @param value
   */
  dispatchShowLoader(value: boolean) {
    this.showLoader$.next(value);
  }
}
