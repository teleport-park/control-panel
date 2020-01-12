import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '../translations-module';
import { Subject } from 'rxjs';

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

export class ExtendedFiltersComponent<T> implements OnInit {
   @Input() config: ExtendedFilterFieldGroup[] = [];

   form: FormGroup;

   @Output() applyFilter: EventEmitter<T> = new EventEmitter();
   private destroyed$: Subject<boolean> = new Subject<boolean>();

   constructor(private fb: FormBuilder, public translateService: TranslateService) {
   }

   ngOnInit() {
      this.form = this.createForm();
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

   applyFilterHandler() {
      this.applyFilter.emit(this.form.getRawValue());
   }

   clearFilter() {
      this.form = null;
      setTimeout(() => {
         this.form = this.createForm();
         this.applyFilter.emit(this.form.getRawValue());
      });
   }
}
