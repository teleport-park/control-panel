import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { StaffMember, Visitor } from '../../../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment, { Moment } from 'moment';
import { TranslateService } from '../../../../../common/translations-module';
import { DateAdapter } from '@angular/material/core';
import { Avatar } from '../../../../../models/user-management/avatar.model';
import { genders, toggleGender } from '../../../../../utils/utils';
import { InitService } from '../../../../../services/init.service';

@Component({
    selector: 'control-panel-ui-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
    /**
     * email regexp
     */
        // tslint:disable-next-line:max-line-length
    static readonly EMAIL_REGEXP: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]{1,60}\.)+[a-zA-ZА-Яа-я]{2,}))$/i;

    _genders = genders;

    /**
     * user model
     */
    user: Visitor;

    /**
     * displayed column
     */
    displayedColumns: string[] = [...Object.keys(new Avatar()).filter(item => item !== 'userId' && item !== 'id'), 'submenu'];


    minDOBDate: Moment;

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
        this.user = Object.assign(new Visitor(this.initService), item, {comment: ''});
        this.userForm = this.getUserForm();
        this.userForm.patchValue(this.user);
        this.userForm.get('age').value && !this.userForm.get('birthday').value && this.ageChange();
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
     * @param translations
     * @param initService
     * @param fb
     * @param dateAdapter
     */
    constructor(public translations: TranslateService,
                public initService: InitService,
                private fb: FormBuilder,
                private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale(translations.locale.getValue());
        this.minDOBDate = moment().subtract(initService.config.visitor_min_age, 'years');
    }

    /**
     * get user form
     */
    private getUserForm() {
        return this.fb.group({
            id: '',
            name: ['', Validators.required],
            nickname: '',
            age: ['', [Validators.min(this.initService.config.visitor_min_age), Validators.max(99)]],
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
        if (this.userForm.get('birthday').invalid) {
            return;
        }
        this.userForm.get('age').setValue(this.user.getAge(date));
    }

    /**
     * age change handler
     */
    ageChange(): void {
        const age = this.userForm.get('age');
        if (this.userForm.get('age').invalid) {
            return;
        }
        if (age.value > 0 && age.value < 100) {
            this.userForm.get('birthday').setValue(this.user.setDOB(age.value));
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
            if (!+this.userForm.get('age').value) {
                delete this.user.age;
            } else {
                this.user.age = +this.userForm.get('age').value || null;
            }
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
            this.user.display_name = user.name.slice(indexStart + 1, indexEnd).trim().substring(0, 100);
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
