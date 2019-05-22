import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '../../translations-module';
import { IChartistData, IChartistSeriesData, ILineChartOptions } from 'chartist';
import { TNGController, TVRController } from '../../../models';

@Component({
  selector: 'control-panel-ui-hardware-item',
  templateUrl: './control-panel-ui-hardware-item.component.html',
  styleUrls: ['./control-panel-ui-hardware-item.component.scss']
})
export class ControlPanelUiHardwareItemComponent implements OnInit, OnDestroy {

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
   * items
   */
  @Input() item: TVRController | TNGController;

  /**
   * cpu payload
   * @param value
   */
  @Input() set cpuPayload(value: { payload: number }) {
    if (value) {
      this.setCpuPayload(value.payload);
    }
  }

  /**
   * lan payload
   * @param value
   */
  @Input() set lanPayload(value: { payload: number }) {
    if (value) {
      this.setLanPayload(value.payload);
    }
  }

  /**
   * CPU busy
   */
  cpuBusy: number;

  /**
   * LAN busy
   */
  lanBusy: number;

  /**
   * emit selected device id
   */
  @Output() selectDevice: EventEmitter<string> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef, public translateService: TranslateService) {
  }

  ngOnInit(): void {
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
    this.lanData.labels = labels.slice(-30);
    this.lanData.series[0] = data.slice(-30);
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
    this.cpuData.labels = labels.slice(-30);
    this.cpuData.series[0] = data.slice(-30);
    this.cpuData = {...this.cpuData};
    this.cd.markForCheck();
  }

  goToDevice() {
    this.selectDevice.emit(this.item.id);
  }

  ngOnDestroy(): void {
  }
}
