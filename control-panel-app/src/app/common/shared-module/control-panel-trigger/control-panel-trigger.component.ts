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

    @Input() timerValue = 10;

    @Input() callBack: () => Observable<boolean> = () => {
        console.warn('callback is not assigned');
        return of(false);
    };

    constructor(private cd: ChangeDetectorRef, private initService: InitService) {
        if (initService.config.refresh_interval) {
            this.timerValue = initService.config.refresh_interval;
        }
    }

    ngOnInit() {
        this._timer = this.getInterval();
    }

    tik() {
        if (this.timerValue === 0) {
            this.cd.markForCheck();
            this.subscription = this.callBack().subscribe((result: boolean) => {
                clearInterval(this._timer);
                if (result) {
                    this.timerValue = 10;
                    this._timer = this.getInterval();
                    return;
                }
                this.timerValue = -1;
                this.cd.markForCheck();
            });
            return;
        }
        this.timerValue--;
        this.cd.markForCheck();
    }

    reset() {
        this.timerValue = 0;
        clearInterval(this._timer);
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