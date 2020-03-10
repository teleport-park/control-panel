import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '../translations-module';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

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

    form: FormGroup;

    formSub: Subscription;

    @Output() applyFilter: EventEmitter<T> = new EventEmitter();
    private destroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder, public translateService: TranslateService) {
    }

    ngOnInit() {
        this.form = this.createForm();
        console.log(this.form.getRawValue());
        this.subscribeToForm();
        // this.formSub = this.form.valueChanges.pipe(debounceTime(300),
        //     switchMap(res => {
        //         this.applyFilter.emit(this.form.getRawValue());
        //         console.log(this.form.getRawValue());
        //         return EMPTY;
        //     })).subscribe();
        // this.form.valueChanges.pipe(
        //   debounceTime(500),
        //   distinctUntilChanged(),
        //   takeUntil(this.destroyed$)).subscribe((result) => {
        //   this.applyFilter.emit(result);
        // });
    }

    createForm(): FormGroup {
        const group = this.fb.group({});
        this.config.forEach((control: ExtendedFilterFieldGroup) => {
            if (control.group) {
                control.group.forEach(childControl => group.addControl(childControl.property, this.fb.control(childControl.value)));
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
        this.formSub = this.form.valueChanges.pipe(debounceTime(300),
            switchMap(res => {
                this.applyFilter.emit(this.form.getRawValue());
                console.log(this.form.getRawValue());
                return EMPTY;
            })).subscribe();
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
