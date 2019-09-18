import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardwareService } from '../../../../services/hardware.service';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ControllerType } from '../../../../models/types';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, OnDestroy {

  /**
   * device
   */
  _device: ControllerType;

  /**
   * device properties
   */
  deviceProperties: string[];

  /**
   * payload
   */
  payload$: Observable<any>;

  private destroyed$: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: HardwareService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const deviceId = this.route.snapshot.paramMap.get('id');
    this.service.controllers$.pipe(filter((data: any) => !!data))
      .subscribe((controllers: ControllerType[]) => {
        this._device = controllers.find(controller => controller.id === deviceId);
        this.deviceProperties = Object.keys(this._device).filter(key => {
          return typeof this._device[key] !== 'object';
        });
        this.cd.markForCheck();
      });
    this.payload$ = this.service.payload$.pipe(
      takeUntil(this.destroyed$),
      filter(data => !!data),
      map(payload => {
        return payload.find(item => item.id === deviceId) || null;
      }));
  }

  /**
   * back to amusements
   */
  back() {
    this.router.navigate(['admin', 'amusements', 'hardware']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
