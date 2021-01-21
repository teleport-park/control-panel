import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '../../../../../common/translations-module';
import { MatDialog } from '@angular/material/dialog';
import { StaffService } from './services/staff.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StaffMember, StaffMemberResponse } from '../../../../../models';
import { PropertyMap } from 'src/app/admin-module/utils/property-map';
import { AddStaffDialogComponent } from '../../../../../common/shared-module';

@Component({
  selector: 'staff-member',
  templateUrl: './staff-member.component.html',
  styleUrls: ['./staff-member.component.scss']
})
export class StaffMemberComponent implements OnInit, OnDestroy {

  /**
   * property map
   */
  propertyMap = PropertyMap;

  /***
   * staff member id
   */
  private staffMemberId: string;
  /**
   * staff member for view
   */
  _staffMember;
  /**
   * full staff member
   */
  _staffMemberResponse: StaffMember;
  /**
   * staff properties
   */
  _staffMemberProperties: string[];

  destroyed$: Subject<boolean> = new Subject();

  /**
   *
   * @param route
   * @param router
   * @param service
   * @param translations
   * @param cd
   * @param dialog
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: StaffService,
              public translations: TranslateService,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.staffMemberId = this.route.snapshot.paramMap.get('id');
    this.service.staffMembers$.pipe(filter(data => !!data), takeUntil(this.destroyed$))
      .subscribe(() => {
        // this.getStaffMember();
      });
  }

  /**
   * get staff member
   */
  // getStaffMember(): void {
  //   this.service.getStaffMember(+this.staffMemberId)
  //     .pipe(filter(data => !!data), takeUntil(this.destroyed$))
  //     .subscribe((staffMember: StaffMemberResponse) => {
  //       this._staffMemberResponse = Object.assign(new StaffMemberResponse(), staffMember);
  //       this._staffMember = Object.assign({}, this._staffMemberResponse.getOwnProperties());
  //       this._staffMemberProperties = Object.keys(this._staffMember);
  //       this.cd.markForCheck();
  //     });
  // }

  /**
   * show dialog
   */
  private showDialog() {
    const dialog = this.dialog.open(AddStaffDialogComponent, {
      data: {mode: 'edit', item: this._staffMemberResponse},
      disableClose: true
    });
    dialog.afterClosed().pipe(filter(data => data), takeUntil(this.destroyed$)).subscribe((staff: StaffMember) => {
      this.service.editStaffMember(staff);
    });
  }

  /**
   * back to users
   */
  back() {
    this.router.navigate(['admin', 'user-management', 'staff']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
