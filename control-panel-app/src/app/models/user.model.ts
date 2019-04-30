import { Avatar } from './avatar.model';
import { UserAbstract } from './user.abstract.model';
import { Moment } from 'moment';

export class User extends UserAbstract {
  /**
   * user id
   */
  id: number;
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

  /**
   * last visiy
   */
  lastVisit: Moment;

  constructor() {
    super();
  }

  getUserProperty() {
    return {
      userName: this.userName,
      nickName: this.nickName,
      age: this.age,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      email: this.email,
      phone: this.phone,
      registered: this.registered,
      desc: this.desc,
      lastVisit: this.lastVisit
    };
  }
}
