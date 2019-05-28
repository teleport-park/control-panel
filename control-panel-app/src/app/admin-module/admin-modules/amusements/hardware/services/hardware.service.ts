import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TNGController, TVRController } from '../../../../../models';

@Injectable()

export class HardwareService implements OnDestroy {

  controllers$: BehaviorSubject<Array<TVRController | TNGController>> = new BehaviorSubject(null);

  TVRControllers$: BehaviorSubject<Array<TVRController>> = new BehaviorSubject(null);

  TNGControllers$: BehaviorSubject<Array<TNGController>> = new BehaviorSubject(null);

  /**
   * payload for update
   * TODO refactor type later
   */
  payload$: BehaviorSubject<any[]> = new BehaviorSubject(null);

  /**
   * interval
   */
  interval;

  constructor(private http: HttpClient) {
    this.getControllers();
  }

  /**
   * get items
   */
  getControllers(): void {
    this.http.get<Array<TNGController | TVRController>>('./assets/data/hardware_items.json')
      .subscribe((data: Array<TNGController | TVRController>) => {
        this.controllers$.next(data);
        // SORT CONTROLLERS
        const TVRControllers = data.filter((item: any) => item.type === 'TVR')
          .map((controller) => Object.assign(new TVRController(), controller));
        const TNGControllers = data.filter((item: any) => item.type === 'TNG')
          .map((controller) => Object.assign(new TNGController(), controller));
        this.TVRControllers$.next(TVRControllers);
        this.TNGControllers$.next(TNGControllers);
        this.setControllersPayload();
      });
  }

  // TODO mock events
  /**
   * set controller payload
   */
  private setControllersPayload() {
    this.interval = setInterval(() => {
      const payload = this.getPayload(this.controllers$.value);
      this.payload$.next(payload);
    }, 1000);
  }

  /**
   * get payload
   * @param data
   */
  private getPayload(data: Array<TVRController | TNGController>) {
    return data.map((item: TVRController | TNGController) => {
        return {
          id: item.id,
          cpu: item.status === 'online' ? {payload: Math.floor(Math.random() * 100) + 1} : {payload: 0},
          lan: item.status === 'online' ? {payload: Math.floor(Math.random() * 100) + 1} : {payload: 0}
        };
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
