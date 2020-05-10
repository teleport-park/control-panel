import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    _debounce: number = 100;

    /**
     * Loader observer
     */
    showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    loaderTread$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
        this.loaderTread$.pipe(debounce(() => timer(this._debounce))).subscribe((value: boolean) => {
            this.showLoader$.next(value);
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
