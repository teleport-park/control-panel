import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardwareService } from '../hardware/services/hardware.service';
import { TNGController, TVRController } from '../../../../models';
import { filter } from 'rxjs/operators';
import { IChartistData, IChartistSeriesData, ILineChartOptions } from 'chartist';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  _device: TNGController | TVRController;

  deviceProperty: string[];

  /**
   * cpu data
   */
  cpuData: IChartistData = {
    labels: [],
    series: [[]]
  };

  /**
   * lan data
   */
  lanData: IChartistData = {
    labels: [],
    series: [[]]
  };

  /**
   * chart options
   */
  chartOptions: ILineChartOptions = {
    axisX: {
      showLabel: false
    },
    showPoint: false,
    height: 150,
    lineSmooth: false,
    chartPadding: {top: 10, right: 5, bottom: 5, left: 5},
    showArea: true
  };

  /**
   * CPU busy
   */
  cpuBusy: number;

  /**
   * LAN busy
   */
  lanBusy: number;

  payload;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: HardwareService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    const deviceId = this.route.snapshot.paramMap.get('id');
    this.service.controllers$.pipe(filter((data: any) => !!data))
      .subscribe((controllers: TNGController[] | TVRController[]) => {
        this._device = controllers.find(controller => controller.id === deviceId);
        this.deviceProperty = Object.keys(this._device).filter(key => {
          return typeof this._device[key] !== 'object';
        });
        this.cd.markForCheck();
      });
    this.service.payload$.pipe(filter(data => !!data))
      .subscribe((payload: any[]) => {
        this.payload = payload.find(item => item.id === deviceId);
        this.setCpuPayload(this.payload.cpu.payload || null);
        this.setLanPayload(this.payload.lan.payload || null);
      });
  }

  /**
   * set payload
   * @param payload
   */
  private setLanPayload(payload: number) {
    this.lanBusy = payload;
    const labels = this.lanData.labels as Array<string>;
    const data = this.lanData.series[0] as Array<IChartistSeriesData>;
    data.push({value: payload, className: 'lan-line'});
    labels.push('');
    this.lanData.labels = labels.slice(-100);
    this.lanData.series[0] = data.slice(-100);
    this.lanData = {...this.lanData};
    this.cd.markForCheck();
  }

  /**
   * set payload
   * @param payload
   */
  private setCpuPayload(payload: number) {
    this.cpuBusy = payload;
    const labels = this.cpuData.labels as Array<string>;
    const data = this.cpuData.series[0] as Array<IChartistSeriesData>;
    data.push({value: payload, className: 'cpu-line'});
    labels.push('');
    this.cpuData.labels = labels.slice(-100);
    this.cpuData.series[0] = data.slice(-100);
    this.cpuData = {...this.cpuData};
    this.cd.markForCheck();
  }

  /**
   * back to amusements
   */
  back() {
    this.router.navigate(['admin', 'amusements', 'hardware']);
  }
}
