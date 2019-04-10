import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HardwareItem } from './control-panel-ui-hardware-item';
import { TranslateService } from '../../translations-module';
import { IChartistData, IChartistSeriesData, ILineChartOptions } from 'chartist';

@Component({
  selector: 'control-panel-ui-hardware-item',
  templateUrl: './control-panel-ui-hardware-item.component.html',
  styleUrls: ['./control-panel-ui-hardware-item.component.scss']
})
export class ControlPanelUiHardwareItemComponent implements OnInit, AfterViewInit, OnDestroy {

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
  @Input() item: HardwareItem;

  cpuBusy: number;

  lanBusy: number;

  private intervalCPU;
  private intervalLAN;

  constructor(private cd: ChangeDetectorRef, public translateService: TranslateService) {

  }


  ngOnInit(): void {
    this.intervalCPU = setInterval(() => {
      this.cpuBusy = Math.floor(Math.random() * 100) + 1;
      const labels = this.cpuData.labels as Array<string>;
      const data = this.cpuData.series[0] as Array<IChartistSeriesData>;
      data.push({value: this.cpuBusy, className: 'cpu-line'});
      labels.push('');
      this.cpuData.labels = labels.slice(-30);
      this.cpuData.series[0] = data.slice(-30);
      this.cpuData = {...this.cpuData};
      this.cd.markForCheck();
    }, 1000);

    this.intervalLAN = setInterval(() => {
      this.lanBusy = Math.floor(Math.random() * 100) + 1;
      const labels = this.lanData.labels as Array<string>;
      const data = this.lanData.series[0] as Array<IChartistSeriesData>;
      data.push({value: this.lanBusy, className: 'lan-line'});
      labels.push('');
      this.lanData.labels = labels.slice(-30);
      this.lanData.series[0] = data.slice(-30);
      this.lanData = {...this.lanData};
      this.cd.markForCheck();
    }, 1000);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalCPU);
    clearInterval(this.intervalLAN);
  }
}
