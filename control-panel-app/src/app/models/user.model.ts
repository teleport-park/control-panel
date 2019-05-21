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
   * name
   */
  name: string;
  /**
   * nickname
   */
  nickname?: string;
  /**
   * registered
   */
  registered: any;
  /**
   * description
   */
  description: string;
  /**
   * email
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
   * last visit
   */
  lastVisit: Moment;

  constructor() {
    super();
  }

  /**
   *
   */
  getUserProperty() {
    return {
      name: this.name,
      nickName: this.nickname,
      age: this.age,
      dateOfBirth: this.birthday,
      gender: this.gender,
      email: this.email,
      phone: this.phone,
      registered: this.registered,
      description: this.description,
      lastVisit: this.lastVisit
    };
  }
}
