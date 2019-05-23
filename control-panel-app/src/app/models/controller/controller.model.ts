/**
 * controller main model
 */
export class Controller {
  id: string;
  ip: string;
  status: string | 'online' | 'offline';
  description: string;
  data: ControllerData;
  constructor() {}
  isOnline(): boolean { return this.status === 'online'; }
  isOffline(): boolean { return this.status === 'offline'; }
}

/**
 * controller data
 */
export class ControllerData {
  cpu: {
    description: string;
  };
  lan: {
    description: string;
  };
}
