import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../translations-module';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
    validators?: [{key: string, value: any}];
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

    @Input() config: ExtendedFilterFieldGroup[] = [];

    @Input() state: any;

    form: FormGroup;

    formSub: Subscription;

    @Output() applyFilter: EventEmitter<T> = new EventEmitter();

    @Output() close: EventEmitter<void> = new EventEmitter();

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder, public translateService: TranslateService) {
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
                    const c =  this.fb.control(childControl.value);
                    if (childControl.validators && childControl.validators.length) {
                        childControl.validators.forEach(validator => {
                            c.setValidators(Validators[validator.key](validator.value));
                        });
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
        this.form = null;
        setTimeout(() => {
            this.form = this.createForm();
            this.subscribeToForm();
            this.applyFilter.emit(this.form.getRawValue());
        });
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
