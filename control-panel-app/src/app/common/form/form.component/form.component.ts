import { Component, ElementRef, EventEmitter, Injector, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { StaffMember, User } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';
import { TranslateService } from '../../translations-module';
import { DateAdapter } from '@angular/material';

export const LocaleMap = {
  en: 'en-GB',
  ru: 'ru-RU'
};

@Component({
  selector: 'control-panel-ui-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  /**
   * email regexp
   */
  static readonly EMAIL_REGEXP: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;

  /**
   * user model
   */
  entityModel: User;

  /**
   * property map
   */
  propertyMap: any[];

  /**
   * max date for DOB field
   */
  maxDate = moment();

  /**
   * user phone input
   */
  @ViewChild('phoneInput') phoneInput: ElementRef;

  /**
   * user form template
   */
  @ViewChild('userFormTemplate') userTemplate: TemplateRef<any>;

  /**
   * staff form template
   */
  @ViewChild('staffMemberTemplate') staffMemberTemplate: TemplateRef<any>;

  /**
   * mode
   */
  mode: 'edit' | 'add';

  outlet: TemplateRef<any>;

  /**
   * set user
   * @param item { User | StaffMember }
   */
  @Input() set item(item: User) {
    item.dateOfBirth = moment(item.dateOfBirth, 'YYYY-MM-DD');
    item.registered = moment(item.registered, 'YYYY-MM-DD');
    this.entityModel = Object.assign(new User(), item);
    this.form = this.getUserForm();
    this.form.patchValue(this.entityModel);
    this.mode = 'edit';
    this.outlet = this.userTemplate;
  }

  /**
   * emit save event
   */
  @Output() save: EventEmitter<User | StaffMember> = new EventEmitter();

  /**
   * emit cancel event
   */
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  /**
   * form
   */
  form: FormGroup;

  /**
   * constructor
   * @param fb
   * @param translateService
   * @param injector
   * @param dateAdapter
   */
  constructor(private fb: FormBuilder,
              public translateService: TranslateService,
              private injector: Injector,
              private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale(LocaleMap[translateService.locale.getValue()]);
  }

  /**
   * get user form
   */
  private getUserForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.max(100)]],
      dateOfBirth: ['', Validators.required],
      gender: 'male',
      email: ['', [Validators.required, Validators.pattern(FormComponent.EMAIL_REGEXP)]],
      desc: '',
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  /**
   * day of birth change handler
   * @param date
   */
  dayOfBirthChange(date: Moment): void {
    if (!(this.entityModel instanceof StaffMember)) {
      this.form.get('age').setValue(this.entityModel.getAge(date));
    }
  }

  /**
   * age change handler
   * @param age
   */
  ageChange(age: number): void {
    if (age > 0 && age < 100) {
      if (!(this.entityModel instanceof StaffMember)) {
        this.form.get('dateOfBirth').setValue(this.entityModel.setDOB(age));
      }
    }
  }

  /**
   * submit handler
   */
  onSubmitHandler(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsDirty();
    });
    if (this.form.valid) {
      Object.assign(this.entityModel, this.form.getRawValue());
      // need to add masked value to user phone
      this.entityModel.phone = this.phoneInput.nativeElement.value;
      this.save.emit(this.entityModel);
    }
  }

  /**
   * cancel handler
   */
  onCancelHandler(): void {
    this.cancel.emit();
  }
}
