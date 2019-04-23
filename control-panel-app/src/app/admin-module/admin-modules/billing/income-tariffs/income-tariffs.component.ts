import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { IncomeTariffsService } from './services/income-tariffs.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

/**
 * tree node interface
 */
export interface TreeNode {
  children?: TreeNode[];
  data?: NodeData;
}

interface NodeData {
  name: string;
  amount: number;
  currency: 'BYN' | 'COIN' | '';
  isRoot?: boolean;
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  data: NodeData;
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

  destroyed$: Subject<boolean> = new Subject();

  /**
   * tree control
   */
  treeControl: FlatTreeControl<FlatNode>;

  /**
   * tree flattener
   */
  treeFlattener: MatTreeFlattener<TreeNode, FlatNode>;

  /**
   * data source
   */
  dataSource: MatTreeFlatDataSource<TreeNode, FlatNode>;

  constructor(public service: IncomeTariffsService) {
  }

  /**
   * has child
   * @param _
   * @param node
   */
  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit() {
    this.service.tariffs$.pipe(takeUntil(this.destroyed$), filter(data => !!data))
      .subscribe((result: TreeNode[]) => {
        this.initDataSource(result);
        const rootNodes = this.dataSource._flattenedData.getValue();
        this.treeControl.expand(rootNodes[0]);
      });
  }

  private initDataSource(data: TreeNode[]) {
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = data;
  }

  ngAfterViewInit(): void {

  }

  /**
   * get node name
   * @param node
   */
  getNodeName(node: TreeNode): string {
    return `${node.data.name} ${node.data.amount ? node.data.amount : ''} ${node.data.currency ? node.data.currency : ''}`;
  }

  /**
   * transformer
   * @param node
   * @param level
   */
  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.data.name,
      level,
      data: node.data
    };
  }
}
