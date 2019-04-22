import { AfterViewInit, Component, OnInit } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

/**
 * tree node interface
 */
interface TreeNode {
  children?: TreeNode[];
  data?: {
    name: string;
    amount: number;
    currency: 'BYN' | 'COIN' | '';
    isRoot?: boolean;
  };
}

/**
 * Mock data
 * TODO should remove
 */
const TREE_DATA: TreeNode[] = [
  {
    children: [
      {
        children: [
          {
            data: {
              name: 'Amount1',
              amount: 10,
              currency: 'COIN'
            }
          },
          {
            data: {
              name: 'Amount2',
              amount: 20,
              currency: 'COIN'
            }
          },
        ],
        data: {
          name: 'Tariff1',
          amount: 50,
          currency: 'BYN'
        }
      }, {
        children: [
          {
            data: {
              name: 'Promo2',
              amount: 20,
              currency: 'COIN'
            }
          },
          {
            data: {
              name: 'Amount3',
              amount: 30,
              currency: 'COIN'
            }
          },
        ],
        data: {
          name: 'Tariff2',
          amount: 100,
          currency: 'BYN'
        }
      }
    ],
    data: {
      name: 'Tariffs',
      amount: null,
      currency: '',
      isRoot: true
    }
  },
];

@Component({
  selector: 'income-tariffs',
  templateUrl: './income-tariffs.component.html',
  styleUrls: ['./income-tariffs.component.scss']
})
export class IncomeTariffsComponent implements OnInit, AfterViewInit {

  /**
   * tree control
   */
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  /**
   * data source
   */
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  /**
   * has child
   * @param _
   * @param node
   */
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.treeControl.expand(this.dataSource.data[0]);
  }

  /**
   * get node name
   * @param node
   */
  getNodeName(node: TreeNode): string {
    return `${node.data.name} ${node.data.amount ? node.data.amount : ''} ${node.data.currency ? node.data.currency : ''}`;
  }

}
