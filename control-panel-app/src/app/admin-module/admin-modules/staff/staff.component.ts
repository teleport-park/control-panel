import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Group, StaffMember } from "../../../models";
import { StaffService } from "./services/staff.service";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { TranslateService } from "../../../common/translations-module";
import { BreakpointService } from "../../../services/breakpoint.service";

@Component({
  selector: 'control-panel-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {

  /**
   * staff members
   */
  _staff: StaffMember[];


  /**
   * displayed columns
   */
  displayedColumns: string[] = ['firstName', 'lastName', 'groupDescription', 'submenu'];

  /**
   * column with simple data
   */
  simpleDataColumn: string[] = ['firstName', 'lastName', 'groupDescription'];

  /**
   * list sorted column
   */
  listSortedColumn: string[] = ['firstName', 'lastName'];

  private destroyed$: Subject<boolean> = new Subject();

  /**
   * Constructor
   * @param service
   * @param cd
   * @param translateService
   * @param point
   */
  constructor(public service: StaffService,
              private cd: ChangeDetectorRef,
              public translateService: TranslateService,
              public point: BreakpointService) {
  }

  ngOnInit() {
    this.service.getGroups();
    this.service.getStaffMember();
    this.service.staffMembers$.pipe(takeUntil(this.destroyed$), filter(data => !!data)).subscribe(
      (staff: StaffMember[]) => {
        this._staff = staff.map((item: StaffMember) => {
          return Object.assign(new StaffMember(), item, {groupDescription: this.getGroupDesc(item.groupId)});
        });
        this.cd.markForCheck();
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private getGroupDesc(groupId: number) {
    const desc = this.service.groups$.getValue().find((group: Group) => group.identity === groupId);
    return desc ? desc.description : '';
  }
}
