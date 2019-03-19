import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService implements OnDestroy {

  destroyed$: Subject<boolean> = new Subject();

  handset: BehaviorSubject<boolean> = new BehaviorSubject(this.breakpointObserver.isMatched('(max-width: 599px)'));


  constructor(private breakpointObserver: BreakpointObserver) {
    // NOTE: this observer should be use for handset devices
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).pipe(takeUntil(this.destroyed$)).subscribe(result => {
      this.handset.next(result.matches);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
