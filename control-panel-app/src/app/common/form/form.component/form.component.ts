import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { StaffMember, User } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';
import { TranslateService } from '../../translations-module';
import { DateAdapter } from '@angular/material';
import { Avatar } from '../../../models/avatar.model';
import { PropertyMap } from '../../../admin-module/utils/property-map';

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
   * property translations map
   */
  propertyMap = PropertyMap;

  /**
   * user model
   */
  entityModel: User;

  userAvatars: Avatar[] = [];

  displayedColumns: string[] = [...Object.keys(new Avatar()).filter(item => item !== 'userId')];

  simpleDataColumn: string[] = this.displayedColumns.filter(item => item !== 'dateOfBirth');

  /**
   * max date for DOB field
   */
  maxDate = moment();

  editing = false;

  /**
   * user phone input
   */
  @ViewChild('phoneInput') phoneInput: ElementRef;

  /**
   * user form template
   */
  @ViewChild('userFormTemplate') userTemplate: TemplateRef<any>;

  /**
   * mode
   */
  mode: 'edit' | 'add';

  /**
   * set user
   * @param item { User | StaffMember }
   */
  @Input() set item(item: User) {
    item.dateOfBirth = moment(item.dateOfBirth, 'YYYY-MM-DD');
    item.registered = moment(item.registered, 'YYYY-MM-DD');
    this.entityModel = Object.assign(new User(), item);
    this.userForm = this.getUserForm();
    this.userForm.patchValue(this.entityModel);
    this.mode = 'edit';
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
  userForm: FormGroup;

  /**
   * avatar form
   */
  avatarForm: FormGroup;

  /**
   * avatar instance
   */
  avatar: Avatar;

  /**
   * listen enter key press to submit dialog
   * @param event
   */
  @HostListener('document:keydown.enter', ['$event']) enterKeyEvent(event: KeyboardEvent) {
    this.onSubmitHandler();
  }

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
      userName: ['', Validators.required],
      nickName: '',
      age: ['', [Validators.required, Validators.max(100)]],
      dateOfBirth: ['', Validators.required],
      gender: 'male',
      email: ['', [Validators.required, Validators.pattern(FormComponent.EMAIL_REGEXP)]],
      desc: '',
      phone: ['', Validators.required]
    });
  }

  /**
   * get avatar form
   */
  private getAvatarForm(): FormGroup {
    return this.fb.group({
      userName: ['', Validators.required],
      age: ['', [Validators.required, Validators.max(100)]],
      dateOfBirth: ['', Validators.required],
      gender: 'male',
    });
  }

  /**
   * day of birth change handler
   * @param date
   * @param isAvatar
   */
  dayOfBirthChange(date: Moment, isAvatar = false): void {
    if (isAvatar) {
      this.avatarForm.get('age').setValue(this.avatar.getAge(date));
      return;
    }
    this.userForm.get('age').setValue(this.entityModel.getAge(date));
  }

  /**
   * age change handler
   * @param age
   * @param isAvatar
   */
  ageChange(age: number, isAvatar = false): void {
    if (isAvatar && (age > 0 && age < 100)) {
      this.avatarForm.get('dateOfBirth').setValue(this.avatar.setDOB(age));
      return;
    }
    if (age > 0 && age < 100) {
      this.userForm.get('dateOfBirth').setValue(this.entityModel.setDOB(age));
    }
  }

  /**
   * submit handler
   */
  onSubmitHandler(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key).markAsTouched();
    });
    if (this.userForm.valid) {
      Object.assign(this.entityModel, this.userForm.getRawValue());
      // need to add masked value to user phone
      this.entityModel.phone = this.phoneInput.nativeElement.value;
      this.save.emit(this.entityModel);
    }
  }

  /**
   * avatar submit handler
   */
  avatarSubmitHandler(): void {
    Object.keys(this.avatarForm.controls).forEach(key => {
      this.avatarForm.get(key).markAsTouched();
    });
    if (this.avatarForm.valid) {
      this.userAvatars.push(Object.assign(this.avatar, this.avatarForm.getRawValue()));
      this.userAvatars = [...this.userAvatars];
      this.entityModel.avatars = this.userAvatars;
      this.editing = false;
    }
  }

  /**
   * add avatar
   */
  addAvatar(): void {
    this.avatarForm = this.getAvatarForm();
    this.avatar = Object.assign(new Avatar(), {userId: this.entityModel.id});
    this.editing = true;
  }

  /**
   * cancel handler
   */
  onCancelHandler(): void {
    this.cancel.emit();
  }
}
