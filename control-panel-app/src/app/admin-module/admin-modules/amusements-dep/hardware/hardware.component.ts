import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { HardwareService } from '../../../../services/hardware.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../../../common/translations-module';
import { AddControllerDialogComponent } from '../../../../common/shared-module';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HardwareComponent implements OnInit, OnDestroy {

  private destroyed$: Subject<boolean> = new Subject();

  constructor(public service: HardwareService,
              private router: Router,
              public dialog: MatDialog,
              public translateService: TranslateService) {
  }

  ngOnInit() {
  }

  /**
   * select id
   * @param deviceId
   */
  selectDevice(deviceId: string) {
    this.router.navigate(['admin', 'amusements', 'hardware', deviceId]);
  }

  /**
   * open add TNG controller dialog
   */
  openAddDialog() {
    const dialog = this.dialog.open(AddControllerDialogComponent, {});
    dialog.afterClosed().pipe(filter(data => !!data), takeUntil(this.destroyed$)).subscribe((data: { ip: string, secretKey: string }) => {
      // TODO add controller functionality should be there
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
