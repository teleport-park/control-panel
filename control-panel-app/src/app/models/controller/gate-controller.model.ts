import { BaseController } from './base-controller.model';

export enum GateStatus {
  'OPEN' = 'open',
  'CLOSED' = 'closed',
  'BLOCKED' = 'blocked'
}

export class GateController extends BaseController {
  /**
   * gate status
   */
  status: GateStatus;
  /**
   * data
   */
  data: any;

  /**
   * type
   */
  readonly type: string = 'GATE';

  constructor() {
    super();
  }

  isOpen() { return this.status === GateStatus.OPEN; }
  isClosed() { return this.status === GateStatus.CLOSED; }
  isBlocked() { return this.status === GateStatus.BLOCKED; }
}
