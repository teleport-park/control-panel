import { UserAbstract } from './user.abstract.model';

export class Avatar extends UserAbstract {
  /**
   * user id
   */
  userId: number = null;

  constructor() {
    super();
  }
}
