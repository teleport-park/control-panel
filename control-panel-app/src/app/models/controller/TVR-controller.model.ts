import { GameController } from './game-controller.model';

export class TVRController extends GameController {
  /**
   * type
   */
  readonly TYPE: string = 'TVR';

  constructor() {
    super();
  }
}
