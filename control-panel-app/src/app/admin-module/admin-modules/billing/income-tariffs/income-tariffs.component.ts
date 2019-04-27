import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IncomeTariffsService } from './services/income-tariffs.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Package } from '../../../../common/shared-module/control-panel-ui-package/control-panel-ui-package.model';


@Component({
  selector: 'income-tariffs',
  templateUrl: './income-tariffs.component.html',
  styleUrls: ['./income-tariffs.component.scss']
})
export class IncomeTariffsComponent implements OnInit {

  data: Package[] = [];
  private destroyed$: Subject<boolean> = new Subject();

  constructor(public service: IncomeTariffsService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.service.tariffs$.pipe(takeUntil(this.destroyed$), filter(data => !!data))
      .subscribe((result: Package[]) => {
        this.data = result;
        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
}
