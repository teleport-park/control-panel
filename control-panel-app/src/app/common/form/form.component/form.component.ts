import { Component, ElementRef, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { StaffMember, Visitor } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';
import { TranslateService } from '../../translations-module';
import { DateAdapter } from '@angular/material';
import { Avatar } from '../../../models/user-management/avatar.model';
import { genders, toggleGender } from '../../../utils/utils';

@Component({
    selector: 'control-panel-ui-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {

    _genders = genders;

    /**
     * email regexp
     */
    static readonly EMAIL_REGEXP: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;

    /**
     * user model
     */
    user: Visitor;

    /**
     * displayed column
     */
    displayedColumns: string[] = [...Object.keys(new Avatar()).filter(item => item !== 'userId' && item !== 'id'), 'submenu'];

    /**
     * simple data column
     */
    simpleDataColumn: string[] = this.displayedColumns
    .filter(item => item !== 'birthday' && item !== 'gender' && item !== 'submenu');

    /**
     * max date for DOB field
     */
    maxDate = moment();

    /**
     * adding flag
     */
    adding = false;

    /**
     * user phone input
     */
    @ViewChild('phoneInput', {static: true}) phoneInput: ElementRef;

    /**
     * mode
     */
    @Input() mode: 'edit' | 'add';

    /**
     * set user
     * @param item { Visitor | StaffMember }
     */
    @Input() set item(item: Visitor) {
        this.user = Object.assign(new Visitor(), item, {comment: ''});
        this.userForm = this.getUserForm();
        this.userForm.patchValue(this.user);
        if (item.name && item.display_name && item.name !== item.display_name) {
            this.userForm.get('name').setValue(item.name + ` (${item.display_name})`);
        }

    }

    /**
     * emit save event
     */
    @Output() save: EventEmitter<Visitor | StaffMember> = new EventEmitter();

    /**
     * emit cancel event
     */
    @Output() cancel: EventEmitter<void> = new EventEmitter();

    /**
     * form
     */
    userForm: FormGroup;

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
        dateAdapter.setLocale(translateService.locale.getValue());
    }

    /**
     * get user form
     */
    private getUserForm() {
        return this.fb.group({
            name: ['', Validators.required],
            nickname: '',
            age: '',
            birthday: '',
            gender: 'male',
            email: ['', [Validators.pattern(FormComponent.EMAIL_REGEXP)]],
            phone: ['', Validators.required]
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
     */
    ageChange(): void {
        const age = +this.userForm.get('age').value;
        if (age > 0 && age < 100) {
            this.userForm.get('birthday').setValue(this.user.setDOB(age));
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
            const user = this.userForm.getRawValue() as Visitor;
            Object.assign(this.user, user);
            // need to add masked value to user phone
            this.user.phone = this.phoneInput.nativeElement.value;
            this.user.age = +this.userForm.get('age').value;
            this.extractNickName(user);
            if (!user.email) {
                delete this.user.email;
            }
            if (user.birthday) {
                this.user.birthday = moment(user.birthday).format('YYYY-MM-DD');
            }
            this.save.emit(this.user);
        }
    }

    private extractNickName(user: Visitor) {
        const indexStart = user.name.indexOf('(');
        if (indexStart > -1) {
            let indexEnd = user.name.indexOf(')');
            if (indexEnd < 0) {
                indexEnd = user.name.length;
            }
            this.user.nickname = user.name.slice(indexStart + 1, indexEnd).trim();
            this.user.name = user.name.slice(0, indexStart).trim();
        }
    }

    toggleGender() {
        const control = this.userForm.get('gender');
        control.setValue(toggleGender(control.value));
    }

    /**
     * cancel handler
     */
    onCancelHandler(): void {
        this.cancel.emit();
    }
}
