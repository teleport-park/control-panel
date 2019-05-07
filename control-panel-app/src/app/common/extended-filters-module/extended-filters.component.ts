import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '../translations-module';

export interface ExtendedFilterFieldGroup {
  property: string;
  value?: any;
  type?: 'check-box-group' | 'range' | 'select' | 'date-period';
  group?: ExtendedFilterFieldGroup[];
  options?: {id: number, label: string}[];
  label?: string;
  from?: number;
  to?: number;
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

  constructor(private fb: FormBuilder, public translateService: TranslateService) {
  }

  ngOnInit() {
    this.form = this.createForm();
    this.form.valueChanges.subscribe((result) => {
      this.applyFilter.emit(result);
    });
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
}
