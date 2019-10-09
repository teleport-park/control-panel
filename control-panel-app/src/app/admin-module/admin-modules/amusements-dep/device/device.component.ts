import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const deviceId = this.route.snapshot.paramMap.get('id');
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
