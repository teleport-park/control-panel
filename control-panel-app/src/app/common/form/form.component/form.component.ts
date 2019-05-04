import { Component, ElementRef, EventEmitter, HostListener, Injector, Input, Output, ViewChild } from '@angular/core';
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
  user: User;

  /**
   * user avatars
   */
  userAvatars: Avatar[] = [];

  /**
   * displayed column
   */
  displayedColumns: string[] = [...Object.keys(new Avatar()).filter(item => item !== 'userId' && item !== 'id'), 'submenu'];

  /**
   * simple data column
   */
  simpleDataColumn: string[] = this.displayedColumns
    .filter(item => item !== 'dateOfBirth' && item !== 'gender' && item !== 'submenu');

  /**
   * max date for DOB field
   */
  maxDate = moment();

  /**
   * adding flag
   */
  adding = false;

  /**
   * avatar index for edit
   */
  avatarIndex: number;

  /**
   * user phone input
   */
  @ViewChild('phoneInput') phoneInput: ElementRef;

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
    this.user = Object.assign(new User(), item);
    this.userAvatars = this.user.avatars ? [...this.user.avatars] : [];
    this.userForm = this.getUserForm();
    this.userForm.patchValue(this.user);
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

  // /**
  //  * listen enter key press to submit dialog
  //  * @param event
  //  */
  // @HostListener('document:keydown.enter', ['$event']) enterKeyEvent(event: KeyboardEvent) {
  //   this.onSubmitHandler();
  // }

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
      gender: 'male',
    });
  }

  /**
   * day of birth change handler
   * @param date
   */
  dayOfBirthChange(date: Moment): void {
    this.userForm.get('age').setValue(this.user.getAge(date));
  }

  /**
   * age change handler
   * @param age
   */
  ageChange(age: number): void {
    if (age > 0 && age < 100) {
      this.userForm.get('dateOfBirth').setValue(this.user.setDOB(age));
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
      Object.assign(this.user, this.userForm.getRawValue());
      // need to add masked value to user phone
      this.user.phone = this.phoneInput.nativeElement.value;
      this.user.avatars = this.userAvatars;
      this.save.emit(this.user);
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
      if (this.avatarIndex) {
        this.userAvatars[this.avatarIndex] = Object.assign(this.userAvatars[this.avatarIndex], this.avatarForm.getRawValue());
        this.avatarIndex = null;
        this.adding = false;
        this.user.avatars = this.userAvatars;
        return;
      }
      Object.assign(this.avatar, this.avatarForm.getRawValue());
      this.avatar.id = Math.floor((Math.random()) * 1e8).toString(16);
      this.userAvatars.push(this.avatar);
      this.userAvatars = [...this.userAvatars];
      this.user.avatars = this.userAvatars;
      this.adding = false;
    }
  }

  /**
   * add avatar
   */
  addAvatar(): void {
    this.avatarForm = this.getAvatarForm();
    this.avatar = Object.assign(new Avatar(), {userId: this.user.id});
    this.adding = true;
  }

  /**
   * delete avatar
   * @param avatar
   */
  deleteAvatar(avatar: Avatar) {
    this.userAvatars = [...this.userAvatars.filter(item => item.id !== avatar.id)];
  }

  /**
   * edit avatar
   * @param avatar
   * @param index
   */
  editAvatar(avatar: Avatar, index: number) {
    this.avatarIndex = index;
    this.avatarForm = this.getAvatarForm();
    this.avatarForm.patchValue(avatar);
    this.adding = true;
  }

  /**
   * cancel handler
   */
  onCancelHandler(): void {
    this.cancel.emit();
  }
}
