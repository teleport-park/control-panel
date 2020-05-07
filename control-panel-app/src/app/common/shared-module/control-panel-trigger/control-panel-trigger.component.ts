import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { InitService } from '../../../services/init.service';

@Component({
    selector: 'control-panel-trigger',
    templateUrl: './control-panel-trigger.component.html',
    styleUrls: ['./control-panel-trigger.component.scss']
})
export class ControlPanelTriggerComponent implements OnInit, OnDestroy {

    private _timer;

    private subscription: Subscription;

    _timerValue: number = 10;

    @Input() timerValue;

    @Input() callBack: () => Observable<boolean> = () => {
        console.warn('callback is not assigned');
        return of(false);
    }

    constructor(private cd: ChangeDetectorRef, private initService: InitService) {
    }

    ngOnInit() {
        if (this.initService.config.refresh_interval || this.timerValue) {
            this._timerValue = this.timerValue || this.initService.config.refresh_interval;
        }
        this._timer = this.getInterval();
    }

    tik() {
        if (this._timerValue === 0) {
            clearInterval(this._timer);
            this.cd.markForCheck();
            this.subscription = this.callBack().subscribe((result: boolean) => {
                if (result) {
                    clearInterval(this._timer);
                    this._timerValue = this.timerValue || this.initService.config.refresh_interval;
                    this._timer = this.getInterval();
                    if (this.subscription) {
                        this.subscription.unsubscribe();
                    }
                    return;
                }
                clearInterval(this._timer);
                this._timerValue = -1;
                if (this.subscription) {
                    this.subscription.unsubscribe();
                }
                this.cd.markForCheck();
            });
            return;
        }
        this._timerValue--;
        this.cd.markForCheck();
    }

    reset() {
        this._timerValue = 0;
        this.tik();
    }

    private getInterval() {
        return setInterval(() => {
            this.tik();
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this._timer);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
