import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../../../translations-module';

@Component({
  selector: 'add-controller-dialog',
  templateUrl: './add-controller-dialog.component.html',
  styleUrls: ['./add-controller-dialog.component.scss']
})
export class AddControllerDialogComponent implements OnInit {
  static readonly IP_REGEX: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  /**
   * form
   */
  form: FormGroup = this.fb.group({
    ip: ['', [Validators.required, Validators.pattern(AddControllerDialogComponent.IP_REGEX)]],
    secretKey: ['', Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<AddControllerDialogComponent>,
              private fb: FormBuilder,
              public translations: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef._containerInstance._config.width = '500px';
  }

  ngOnInit() {
  }

  /**
   * submit dialog
   */
  dialogSubmit() {
    this.dialogRef.close(this.form.getRawValue());
  }

}
