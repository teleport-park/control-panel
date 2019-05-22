import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TNGController, TVRController } from '../../../../../models';

@Injectable()

export class HardwareService implements OnDestroy {

  TVRControllers$: BehaviorSubject<Array<TVRController>> = new BehaviorSubject(null);

  TNGControllers$: BehaviorSubject<Array<TNGController>> = new BehaviorSubject(null);

  /**
   * payload for update
   * TODO refactor type later
   */
  TVRPayload$: BehaviorSubject<any[]> = new BehaviorSubject(null);

  /**
   * payload for update
   * TODO refactor type later
   */
  TNGPayload$: BehaviorSubject<any[]> = new BehaviorSubject(null);

  /**
   * interval
   */
  interval;

  constructor(private http: HttpClient) {
    this.getItems();
  }

  /**
   * get items
   */
  getItems(): void {
    this.http.get<Array<TNGController | TVRController>>('./assets/data/hardware_items.json')
      .subscribe((data: Array<TNGController | TVRController>) => {
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

  /**
   * set controller payload
   */
  private setControllersPayload() {
    this.interval = setInterval(() => {
      const TVRPayload = this.getPayload(this.TVRControllers$.value);
      const TNGPayload = this.getPayload(this.TNGControllers$.value);
      this.TVRPayload$.next(TVRPayload);
      this.TNGPayload$.next(TNGPayload);
    }, 1000);
  }

  private getPayload(data: Array<TVRController | TNGController>) {
    return data.map((item: TVRController | TNGController) => {
      return {
        cpu: item.status === 'online' ? {payload: Math.floor(Math.random() * 100) + 1} : 0,
        lan: item.status === 'online' ? {payload: Math.floor(Math.random() * 100) + 1} : 0
      };
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
