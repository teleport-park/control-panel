import { Component, Input, OnInit } from '@angular/core';
import { Tariff, TariffNode, TariffsTree } from './control-panel-ui-tariff-tree.model';
import { MatTreeNestedDataSource } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'control-panel-ui-tariff-tree',
  templateUrl: './control-panel-ui-tariff-tree.component.html',
  styleUrls: ['./control-panel-ui-tariff-tree.component.scss']
})
export class ControlPanelUiTariffTreeComponent implements OnInit {

  /**
   * tree data
   * @param data
   */
  @Input() set treeData(data: TariffsTree) {
    if (data) {
      this.treeControl = new NestedTreeControl<TariffNode>(node => node.children);
      this.dataSource = new MatTreeNestedDataSource<TariffNode>();
      this.dataSource.data = [{
        label: data.root.name,
        children: data.children.map((child: Tariff) => {
          return {
            label: child.name,
            data: child.amount
          };
        })
      }];
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

  constructor() { }

  ngOnInit() {
  }

}
