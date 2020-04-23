import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IWebSocketService {
    status: Observable<boolean>;
    on(): Observable<any>;
}

export interface WebSocketConfig {
    url: string;
    reconnectInterval?: number;
    reconnectAttempts?: number;
}

export const WsConfig = new InjectionToken('WebSocketConfig');
