import { Avatar } from './avatar.model';
import { UserAbstract } from './user.abstract.model';

export class User extends UserAbstract {
  /**
   * user id
   */
  id: number;
  /**
   * user index
   */
  index: number;
  /**
   * @deprecated
   */
  firstName: string;
  /**
   * @deprecated
   */
  lastName: string;
  /**
   * nickname
   */
  nickName?: string;
  /**
   * registered
   */
  registered: any;
  /**
   * description
   */
  desc: string;
  /**
   * emaol
   */
  email: '';
  /**
   * phone
   */
  phone: string;
  /**
   * statuses
   */
  statuses: string[];
  /**
   * user avatars
   */
  avatars?: Avatar[];

  constructor() {
    super();
  }
}
