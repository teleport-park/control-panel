import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, Observer, Subject, SubscriptionLike } from 'rxjs';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/internal-compatibility';
import { distinctUntilChanged, map, share, takeWhile } from 'rxjs/operators';
import { InitService } from './init.service';
import { IWebSocketService, WebSocketConfig } from '../interfaces/web-socket-config';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService implements IWebSocketService, OnDestroy {

    private wsConfig: WebSocketConfig = {url: '/', reconnectAttempts: 10, reconnectInterval: 5000};

    private config: WebSocketSubjectConfig<any>;

    private websocketSub: SubscriptionLike;
    private statusSub: SubscriptionLike;

    private reconnection$: Observable<number>;
    private websocket$: WebSocketSubject<any>;
    private connection$: Observer<boolean>;
    public wsMessages$: Subject<any> = new Subject<any>();

    private reconnectInterval: number;
    private reconnectAttempts: number;
    private isConnected: boolean;


    public status: Observable<boolean>;

    constructor(private initService: InitService) {
        this.wsConfig.url = initService.config.ws_url;
    }

    public initConnection() {
        this.wsConfig.url = this.initService.config.ws_url;
        if (!this.wsConfig.url) {
            console.warn('Web Socket URL is missing');
            return;
        }

        this.reconnectInterval = this.wsConfig.reconnectInterval || 5000;
        this.reconnectAttempts = this.wsConfig.reconnectAttempts || 10;

        this.config = {
            url: this.wsConfig.url,
            deserializer: (res) => res.data,
            serializer: (value) => value,
            closeObserver: {
                next: (event: CloseEvent) => {
                    this.websocket$ = null;
                    this.connection$.next(false);
                }
            },
            openObserver: {
                next: (event: Event) => {
                    console.log(`WebSocket connected on ${this.wsConfig.url}`);
                    this.connection$.next(true);
                }
            }
        };

        this.status = new Observable<boolean>((observer) => {
            this.connection$ = observer;
        }).pipe(share(), distinctUntilChanged());

        this.statusSub = this.status
        .subscribe((isConnected) => {
            this.isConnected = isConnected;

            if (!this.reconnection$ && typeof (isConnected) === 'boolean' && !isConnected) {
                this.reconnect();
            }
        });

        this.websocketSub = this.wsMessages$.subscribe(
            (message) => {
            }, (error: ErrorEvent) => console.error('WebSocket error!', error)
        );

        this.connect();
    }

    /*
        * connect to WebSocked
        * */
    private connect(): void {
        this.websocket$ = new WebSocketSubject(this.config);

        this.websocket$.subscribe(
            (message) => {
                this.wsMessages$.next(message);
            },
            (error: Event) => {
                if (!this.websocket$) {
                    this.reconnect();
                }
            });
    }


    /*
    * reconnect if not connecting or errors
    * */
    private reconnect(): void {
        this.reconnection$ = interval(this.reconnectInterval)
        .pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$));

        this.reconnection$.subscribe(
            () => this.connect(),
            () => {
            },
            () => {
                this.reconnection$ = null;
                if (!this.websocket$) {
                    this.wsMessages$.complete();
                    this.connection$.complete();
                }
            });
    }


    /*
    * on message event
    * */
    public on(): Observable<any> {
        return this.wsMessages$.pipe(
            map((message: any) => message)
        );
    }

    public dummyMessage() {
        if (this.isConnected) {
            this.websocket$.next('data');
        } else {
            this.wsMessages$.next('dummy');
        }
    }

    /*
    * on message to server
    * */
    public send(data: any = {}): void {
        if (this.isConnected) {
            this.websocket$.next(data);
        } else {
            console.error('Send error!');
        }
    }

    public ngOnDestroy() {
        this.unsubscribe();
    }

    public changeWSServer() {
        this.unsubscribe();
        this.initConnection();
    }

    private unsubscribe() {
        this.websocketSub && this.websocketSub.unsubscribe();
        this.statusSub && this.statusSub.unsubscribe();
    }
}
