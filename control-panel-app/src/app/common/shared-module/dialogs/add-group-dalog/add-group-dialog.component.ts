import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, PageEvent } from '@angular/material';
import { Group, Permission } from '../../../../models';
import { TranslateService } from '../../../translations-module';

@Component({
  selector: 'control-panel-add-group-dalog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {

  /**
   * name field
   */
  name: FormControl;

  /**
   * selected permissions
   */
  _permissions: any[];

  /**
   * listen enter key press to submit dialog
   * @param event
   */
  @HostListener('document:keydown.enter', ['$event']) enterKeyEvent(event: KeyboardEvent) {
    this.dialogSubmit();
  }

  /**
   * constructor
   * @param translations
   * @param dialogRef
   * @param data
   * @param service
   */
  constructor(
    public translations: TranslateService,
    public dialogRef: MatDialogRef<AddGroupDialogComponent>,
    // public service: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { group: Group, mode: 'add' | 'edit' }) {
    dialogRef._containerInstance._config.width = '500px';
    this.name = new FormControl(data.group.name, [Validators.required]);
  }

  ngOnInit(): void {
    // this.service.getPermissions();
  }

  /**
   * On cancel handler
   */
  dialogSubmit(): void {
    this.data.group.name = this.name.value;
    if (!this._permissions) {
      const permission = this.data.group.permissions as Permission[];
      this._permissions = permission.map((item: Permission) => item.id);
    }
    this.data.group.permissions = this._permissions;
    this.dialogRef.close(this.data);
  }

  pageChangeHandler(event: PageEvent): void {
    // this.service.getPermissions(event.pageSize, event.pageIndex + 1);
  }

  /**
   * add permission handler
   * @param permissions
   */
  addPermissions(permissions) {
    this._permissions = permissions;
  }
}
