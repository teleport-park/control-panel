import moment from 'moment';
import { Moment } from 'moment';

export class User {
  id: number;
  index: number;
  /**
   * @deprecated
   */
  firstName: string;
  /**
   * @deprecated
   */
  lastName: string;
  userName: string;
  nickName?: string;
  age: number;
  dateOfBirth: any;
  registered: any;
  gender: 'male' | 'female';
  desc: string;
  email: '';
  phone: string;
  statuses: string[];

  constructor() {
  }

  /**
   * get age
   * @param DOB
   */
  getAge(DOB?: Moment): number {
    if (DOB) {
      this.age =  Math.abs(DOB.diff(moment(), 'years'));
      return this.age;
    }
    if (this.dateOfBirth._isAMomentObject) {
      this.age = Math.abs(this.dateOfBirth.diff(moment(), 'years'));
      return this.age;
    }
    return null;
  }

  /**
   * set DOB
   * @param age
   */
  setDOB(age: number): Moment {
    this.dateOfBirth = moment().subtract(age, 'years');
    return this.dateOfBirth;
  }
}
