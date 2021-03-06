import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../translations-module';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ExtendedFiltersDirective } from './extended-filters.directive';

/**
 * extended filters group
 */
export interface ExtendedFilterFieldGroup {
    property: string;
    value?: any;
    type?: 'check-box-group' | 'range' | 'select' | 'date-period' | 'radio-button-group';
    group?: ExtendedFilterFieldGroup[];
    options?: Options[];
    label?: string;
    from?: number;
    to?: number;
    initialValue?: any;
    validators?: Array<{ key: string, value: any }>;
}

/**
 * options
 */
export interface Options {
    id?: number;
    label: string;
    value?: string;
}


@Component({
    selector: 'extended-filters',
    templateUrl: './extended-filters.component.html',
    styleUrls: ['./extended-filters.component.scss']
})

export class ExtendedFiltersComponent<T> implements OnInit, OnDestroy {

    @ViewChildren(ExtendedFiltersDirective) fields: QueryList<ExtendedFiltersDirective>;

    @Input() config: ExtendedFilterFieldGroup[] = [];

    @Input() state: any;

    form: FormGroup;

    formSub: Subscription;

    @Output() applyFilter: EventEmitter<T | any> = new EventEmitter();

    @Output() close: EventEmitter<void> = new EventEmitter();

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder, public translations: TranslateService) {
    }

    ngOnInit() {
        this.form = this.createForm();
        if (this.state) {
            this.form.patchValue(this.state);
        }
        this.subscribeToForm();
    }

    createForm(): FormGroup {
        const group = this.fb.group({});
        this.config.forEach((control: ExtendedFilterFieldGroup) => {
            if (control.group) {
                control.group.forEach(childControl => {
                    const c = this.fb.control(childControl.value);
                    if (childControl.validators && childControl.validators.length) {
                        c.setValidators(childControl.validators.map(validator => Validators[validator.key](validator.value)));
                    }
                    if (childControl.initialValue) {
                        c.setValue(childControl.initialValue);
                    }
                    group.addControl(childControl.property, c);
                });
                return;
            }
            group.addControl(control.property, this.fb.control(control.value));
        });
        return group;
    }


    clearFilter() {
        this.form.reset();
        this.applyFilter.emit(this.form.getRawValue());
        this.fields.toArray().forEach(c => c.update());
        this.subscribeToForm();
    }

    private subscribeToForm() {
        if (this.formSub) {
            this.formSub.unsubscribe();
        }
        this.formSub = this.form.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(_ => {
                this.form.markAllAsTouched();
                const invalid = this.findInvalidControls();
                const values = this.form.getRawValue();
                if (this.form.invalid) {
                    invalid.forEach(name => {
                        delete values[name];
                    });
                    return EMPTY;
                }
                this.applyFilter.emit(values);
                return EMPTY;
            })).subscribe();
    }

    private findInvalidControls(): string[] {
        const invalid = [];
        const controls = this.form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
