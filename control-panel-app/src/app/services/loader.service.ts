import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /**
   *
   */
  showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

  /**
   * shw or hide loader
   * @param value
   */
  dispatchShowLoader(value: boolean) {
    this.showLoader$.next(value);
  }
}
