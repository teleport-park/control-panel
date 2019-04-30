import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
    male: true,
    female: true,
    registration: null
  });

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
        this.filter.emit(filtered);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
