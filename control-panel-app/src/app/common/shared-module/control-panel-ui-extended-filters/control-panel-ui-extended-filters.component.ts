import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { User } from '../../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '../../translations-module';
import moment, { Moment } from 'moment';

@Component({
  selector: 'control-panel-ui-extended-filters',
  templateUrl: './control-panel-ui-extended-filters.component.html',
  styleUrls: ['./control-panel-ui-extended-filters.component.scss']
})
export class ControlPanelUiExtendedFiltersComponent implements OnInit, OnDestroy {
  // TODO this component should rewrite
  destroyed$: Subject<boolean> = new Subject();

  _data: User[];

  maxDate: Moment = moment();

  _filters: FormGroup;

  @Input() set data(data: User[]) {
    if (!this._data && data) {
      this._data = data;
    }
  }

  @Input() set filters(filters: FormGroup) {
    if (filters) {
      this._filters = filters;
    }
  }

  @Input() filteredDataEntity: 'users' | 'staff';

  @Input() template: TemplateRef<any>;

  ctx = {
    _filters: this._filters,
    _data: this._data
  };

  /**
   * emit filtered result
   */
  @Output() filter: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public translateService: TranslateService) {
  }

  ngOnInit() {
    this._filters.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroyed$))
      .subscribe((result) => {
        // TODO should removed after integrate API
        let filtered = null;
        if (result.age) {
          filtered = this._data.filter((item: User) => item.age === +result.age);
        }
        if (!result.male || !result.female) {
          if (result.male) {
            filtered = filtered ? filtered.filter((item: User) => item.gender === 'male')
              : this._data.filter((item: User) => item.gender === 'male');
          }
          if (result.female) {
            filtered = filtered ? filtered.filter((item: User) => item.gender === 'female')
              : this._data.filter((item: User) => item.gender === 'female');
          }
        }
        if (result.registeredFrom) {
          filtered = filtered ? filtered.filter((item: User) =>
              this.registeredFilterCallback(item.registered, result.registeredFrom, result.registeredTo))
            : this._data.filter((item: User) =>
              this.registeredFilterCallback(item.registered, result.registeredFrom, result.registeredTo));
        }
        this.filter.emit(filtered);
      });
  }

  registeredFilterCallback(registered: Moment, min: Moment, max: Moment): boolean {
    return +registered.format('x') > +min.format('x') && +registered.format('x') < +max.format('x');
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
