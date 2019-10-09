import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'control-panel-ui-quick-filter',
    templateUrl: './control-panel-ui-quick-filter.component.html',
    styleUrls: ['./control-panel-ui-quick-filter.component.scss']
})
export class ControlPanelUiQuickFilterComponent implements OnDestroy {

    _control: FormControl = new FormControl('');

    get quickFilterValue() {
        return this._control.value;
    }

    destroy$: Subject<boolean> = new Subject();

    @Output() filterChange: EventEmitter<string> = new EventEmitter();

    constructor() {
        this._control.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            takeUntil(this.destroy$))
        .subscribe((value: string) => {
            this.filterChange.emit(value);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
