import { BaseController } from './base-controller.model';
import { Amusement } from '../amusement.model';

export enum GameControllerStatus {
  'ONLINE' = 'online',
  'OFFLINE' = 'offline'
}

export class GameController {
  /**
   * status
   */
  status: GameControllerStatus;
  /**
   * amusements
   */
  amusements: Amusement[];
  /**
   * data
   */
  data: GameControllerData;

  constructor() {
  }

  /**
   * is online
   */
  isOnline(): boolean { return this.status === GameControllerStatus.ONLINE; }

  /**
   * is offline
   */
  isOffline(): boolean { return this.status === GameControllerStatus.OFFLINE; }
}

/**
 * controller data
 */
export class GameControllerData {
  cpu: {
    description: string;
  };
  lan: {
    description: string;
  };
}
