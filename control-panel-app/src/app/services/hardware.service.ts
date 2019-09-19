import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GateController, TNGController, TVRController } from '../models/controller';

@Injectable({
    providedIn: 'root'
})

export class HardwareService implements OnDestroy {

  controllers$: BehaviorSubject<Array<GateController>> = new BehaviorSubject(null);

  TVRControllers$: BehaviorSubject<Array<TVRController>> = new BehaviorSubject(null);

  TNGControllers$: BehaviorSubject<Array<TNGController>> = new BehaviorSubject(null);

  gateControllers$: BehaviorSubject<Array<GateController>> = new BehaviorSubject(null);

  /**
   * payload for update
   * TODO refactor type later
   */
  payload$: BehaviorSubject<any[]> = new BehaviorSubject(null);

  status$: BehaviorSubject<any[]> = new BehaviorSubject(null);

  /**
   * interval
   */
  interval;

  statusInterval;

  constructor(private http: HttpClient) {
    this.getControllers();
  }

  /**
   * get items
   */
  getControllers(): void {
    this.http.get<Array<GateController>>('./assets/data/hardware_items.json')
      .subscribe((data: Array<GateController>) => {
        this.controllers$.next(data);
        // SORT CONTROLLERS
        // const TNGControllers = data.filter((item: any) => item.type === ControllerType[0])
        //   .map((controller) => Object.assign(new TNGController(), controller));
        // const TVRControllers = data.filter((item: any) => item.type === ControllerType[1])
        //   .map((controller) => Object.assign(new TVRController(), controller));
        // const gateControllers = data.filter((item: any) => item.type === ControllerType[2])
        //   .map((controller) => Object.assign(new GateController(), controller));
        // this.TVRControllers$.next(TVRControllers);
        // this.TNGControllers$.next(TNGControllers);
        // this.gateControllers$.next(gateControllers);
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

    this.statusInterval = setInterval(() => {
      const statusArray = ['open', 'closed', 'blocked'];
      const statuses = this.controllers$.value.filter((controller: any) => controller.type === 'GATE')
        .map((item: GateController) => {
          return {
            id: item.id,
            status: statusArray[Math.floor(Math.random() * statusArray.length)]
          };
        });
      this.status$.next(statuses);
    }, 5000);
  }

  /**
   * get payload
   * @param data
   */
  private getPayload(data: Array<GateController>) {
    return data.map((item: GateController) => {
        return {
          id: item.id,
          // cpu: {payload: Math.floor(Math.random() * 100) + 1},
          // lan: {payload: Math.floor(Math.random() * 100) + 1}
        };
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearInterval(this.statusInterval);
  }
}