import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../translations-module';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {

    /**
     * credential
     */
    credential: FormGroup;

    enterCard: boolean = false;

    wsAvailable: boolean = false;

    cardControl: FormControl = new FormControl('', Validators.required);

    wsSubscription: Subscription;

    private returnUrl: string;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                public loaderService: LoaderService,
                private service: AuthService,
                public wsService: WebSocketService,
                private cd: ChangeDetectorRef,
                public translateService: TranslateService) {
    }

    ngOnInit() {
        this.wsService.initConnection();
        this.credential = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
            permission: 'admin'
        });
        this.service.logout();
        const literal = 'returnUrl';
        this.returnUrl = this.route.snapshot.queryParams[literal] || '/admin';
        this.wsService.status.subscribe(res => {
            this.enterCard = !!res;
            this.wsAvailable = !!res;
            this.cd.markForCheck();
        });
        this.wsSubscription = this.wsService.on().subscribe(res => {
            this.login(res);
        });
    }

    private login(res) {
        this.service.login(res).subscribe(r => {
            if (r) {
                this.wsSubscription.unsubscribe();
                this.router.navigate([this.returnUrl]);
            }
        });
    }

    onSubmit() {
        if (!this.cardControl.value) {
            this.cardControl.markAsTouched();
            return;
        }
        this.login(this.cardControl.value);
    }

    ngOnDestroy(): void {
        this.wsSubscription.unsubscribe();
        this.wsService.ngOnDestroy();
    }
}
