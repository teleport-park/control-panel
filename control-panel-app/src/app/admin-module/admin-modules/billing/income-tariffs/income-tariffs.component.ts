import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IncomeTariffsService } from './services/income-tariffs.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Package } from '../../../../common/shared-module/control-panel-ui-package/control-panel-ui-package.model';

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
  isLast?: boolean;
  isParentLast?: boolean;
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  data: NodeData;
}

@Component({
  selector: 'income-tariffs',
  templateUrl: './income-tariffs.component.html',
  styleUrls: ['./income-tariffs.component.scss']
})
export class IncomeTariffsComponent implements OnInit {

  destroyed$: Subject<boolean> = new Subject();
  //
  // /**
  //  * tree control
  //  */
  // treeControl: FlatTreeControl<FlatNode>;
  //
  // /**
  //  * tree flattener
  //  */
  // treeFlattener: MatTreeFlattener<TreeNode, FlatNode>;
  //
  // /**
  //  * data source
  //  */
  // dataSource: MatTreeFlatDataSource<TreeNode, FlatNode>;

  data: Package[] = [
    {
      packageInfo: {
        id: 1,
        name: 'TestPackage#1',
        amount: 100,
        currency: 'BYN'
      },
      payments: [{
        index: 1,
        id: 1,
        amount: 10,
        currency: 'COIN',
        children: [{
          name: 'test#1',
          amount: 5,
          currency: 'COIN'
        }, {
          name: 'test#2',
          amount: 5,
          currency: 'COIN'
        }, {
          name: 'test#3',
          amount: 5,
          currency: 'COIN'
        }]
      }, {
        index: 2,
        id: 2,
        amount: 10,
        currency: 'COIN'
      }, {
        index: 3,
        id: 3,
        amount: 10,
        currency: 'COIN'
      }]
    }, {
      packageInfo: {
        id: 1,
        name: 'TestPackage#2',
        amount: 100,
        currency: 'BYN'
      },
      payments: [{
        index: 1,
        id: 1,
        amount: 10,
        currency: 'COIN'
      }, {
        index: 2,
        id: 2,
        amount: 10,
        currency: 'COIN'
      }, {
        index: 3,
        id: 3,
        amount: 10,
        currency: 'COIN'
      }]
    }, {
      packageInfo: {
        id: 1,
        name: 'TestPackage#3',
        amount: 100,
        currency: 'BYN'
      },
      payments: [{
        index: 1,
        id: 1,
        amount: 10,
        currency: 'COIN'
      }, {
        index: 2,
        id: 2,
        amount: 10,
        currency: 'COIN'
      }, {
        index: 3,
        id: 3,
        amount: 10,
        currency: 'COIN'
      }]
    }
  ];

  constructor(public service: IncomeTariffsService, private cd: ChangeDetectorRef) {
  }

  /**
   * has child
   * @param _
   * @param node
   */
  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit() {
    this.service.tariffs$.pipe(takeUntil(this.destroyed$), filter(data => !!data))
      .subscribe((result: Package[]) => {
        this.data = result;
        // this.initDataSource(result);
        // const rootNodes = this.dataSource._flattenedData.getValue();
        // this.treeControl.expand(rootNodes[0]);
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  // /**
  //  * init data
  //  * @param data
  //  */
  // private initDataSource(data: TreeNode[]) {
  //   this.setLastNode(data[0]);
  //   this.treeControl = new FlatTreeControl<FlatNode>(
  //     node => node.level, node => node.expandable);
  //   this.treeFlattener = new MatTreeFlattener(
  //     this.transformer, node => node.level, node => node.expandable, node => node.children);
  //   this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  //   this.dataSource.data = data;
  // }

  // /**
  //  * set last nodes
  //  * @param data
  //  */
  // private setLastNode(data: TreeNode) {
  //   if (data.children && data.children.length) {
  //     const lastNode = data.children[data.children.length - 1];
  //     lastNode.data.isLast = true;
  //     lastNode.data.isParentLast = true;
  //     lastNode.children.forEach(child => {
  //       child.data.isParentLast = true;
  //     });
  //     data.children.forEach(item => {
  //       if (item.children && item.children.length) {
  //         item.children[item.children.length - 1].data.isLast = true;
  //       }
  //     });
  //   }
  // }

  // /**
  //  * get node name
  //  * @param node
  //  */
  // getNodeName(node: TreeNode): string {
  //   return `${node.data.name} ${node.data.amount ? node.data.amount : ''} ${node.data.currency ? node.data.currency : ''}`;
  // }
  //
  // /**
  //  * transformer
  //  * @param node
  //  * @param level
  //  */
  // private transformer = (node: TreeNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.data.name,
  //     level,
  //     data: node.data
  //   };
  // }
  //
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
}
