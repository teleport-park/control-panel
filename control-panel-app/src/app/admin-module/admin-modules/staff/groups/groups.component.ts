import { Component, OnDestroy, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { Group } from '../../../../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'control-panel-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  /**
   * columns
   */
  columns: string[] = ['name', 'permissions'];

  data: Group[];

  private destoyed$: Subject<boolean> = new Subject();

  constructor(public service: StaffService) {
  }

  ngOnInit() {
    if (!this.service.permissions$.getValue().length) {
      this.service.getPermissions();
    }
  }

  ngOnDestroy(): void {
    this.destoyed$.next(true);
    this.destoyed$.complete();
  }
}
