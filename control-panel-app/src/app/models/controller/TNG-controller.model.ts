import { GameController } from './game-controller.model';

export class TNGController extends GameController {
  /**
   * secret key
   */
  secretKey: string;
  /**
   * type
   */
  readonly TYPE: string = 'TNG';

  constructor() {
    super();
  }
}
