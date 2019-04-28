import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../../../models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/typings/esm5/checkbox';
import { TranslateService } from '../../translations-module';

@Component({
  selector: 'control-panel-ui-extended-filters',
  templateUrl: './control-panel-ui-extended-filters.component.html',
  styleUrls: ['./control-panel-ui-extended-filters.component.scss']
})
export class ControlPanelUiExtendedFiltersComponent implements OnInit, OnDestroy {

  destroyed$: Subject<boolean> = new Subject();

  _data: User[] = [];

  @Input() data: User[];

  filters: FormGroup = this.fb.group({
    age: '',
    gender: '',
    registration: null
  });

  /**
   * all gender control
   */
  genderAll: FormControl = new FormControl(true);

  /**
   * emit filtered result
   */
  @Output() filter: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public translateService: TranslateService) {
  }

  ngOnInit() {
    this._data = Object.assign([], this.data);
    this.filters.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroyed$))
      .subscribe((result) => {
        let filtered = null;
        if (result.age) {
          filtered = this._data.filter((item: User) => item.age === +result.age);
        }
        if (result.gender) {
          filtered = filtered ? filtered.filter((item: User) => item.gender === result.gender)
            : this._data.filter((item: User) => item.gender === result.gender);
        }
        this.filter.emit(filtered);
      });
  }

  /**
   * select all gender
   * @param event
   */
  selectAll(event: MatCheckboxChange) {
    this.filters.get('gender').setValue(event.checked ? '' : 'male');
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
