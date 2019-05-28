import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IChartistData, IChartistSeriesData, ILineChartOptions } from 'chartist';

export interface LinearGraphPropertyDesc {
  desc: string;
  units: string;
}

@Component({
  selector: 'control-panel-ui-linear-graph',
  templateUrl: './control-panel-ui-linear-graph.component.html',
  styleUrls: ['./control-panel-ui-linear-graph.component.scss']
})
export class ControlPanelUiLinearGraphComponent {

  _value: number;

  @Input() set value(value: { payload: number }) {
    if (value && this.isNumeric(value.payload)) {
      this.setData(value.payload);
    }
  }

  @Input() stepsNumber = 100;

  @Input() property: LinearGraphPropertyDesc = {desc: 'Prop', units: '%'};

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
   * data
   */
  data: IChartistData = {
    labels: [],
    series: [[]]
  };

  constructor(private cd: ChangeDetectorRef) {
  }

  /**
   * set payload
   * @param payload
   */
  private setData(payload: number) {
    this._value = payload;
    const labels = this.data.labels as Array<string>;
    const data = this.data.series[0] as Array<IChartistSeriesData>;
    data.push({value: payload});
    labels.push('');
    this.data.labels = labels.slice(-this.stepsNumber);
    this.data.series[0] = data.slice(-this.stepsNumber);
    this.data = {...this.data};
    this.cd.markForCheck();
  }

  /**
   * is numeric
   * @param n
   */
  private isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
