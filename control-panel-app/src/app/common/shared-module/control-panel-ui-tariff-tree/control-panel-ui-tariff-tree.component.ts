import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Tariff, TariffNode, TariffsTree } from './control-panel-ui-tariff-tree.model';
import { MatTreeNestedDataSource } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TranslateService } from '../../translations-module';

@Component({
  selector: 'control-panel-ui-tariff-tree',
  templateUrl: './control-panel-ui-tariff-tree.component.html',
  styleUrls: ['./control-panel-ui-tariff-tree.component.scss']
})
export class ControlPanelUiTariffTreeComponent implements OnInit {

  @HostBinding('class') class = 'light-theme';

  /**
   * last visible tariffs count
   */
  readonly LAST_VISIBLE_COUNT: number = 4;

  /**
   * data
   */
  private _data: any;

  /**
   * tree data
   * @param data
   */
  @Input() set treeData(data: TariffsTree) {
    if (data) {
      this._data = data;
      // this.treeControl = new NestedTreeControl<TariffNode>(node => node.children);
      // this.dataSource = new MatTreeNestedDataSource<TariffNode>();
      // this.dataSource.data = [{
      //   label: data.root.name,
      //   children: data.children.map((child: Tariff) => {
      //     return {
      //       label: child.name,
      //       data: child.amount
      //     };
      //   })
      // }];
    }
  }

  /**
   * data source
   */
  dataSource: MatTreeNestedDataSource<TariffNode>;

  /**
   * tree control
   */
  treeControl: NestedTreeControl<TariffNode>;

  /**
   * has child
   * @param _
   * @param node
   */
  hasChild = (_: number, node: TariffNode) => !!node.children && node.children.length > 0;

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

  /**
   * get last tariffs
   */
  getLastTariffs(): number[] {
    return this._data.children.map((child: Tariff) => child.amount).splice(-this.LAST_VISIBLE_COUNT);
  }

}
