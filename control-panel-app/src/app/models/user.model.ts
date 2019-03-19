import * as moment from 'moment';
import { Moment } from 'moment';

export class User {
  id: string;
  index: number;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: any;
  registered: any;
  gender: 'male' | 'female';
  desc: string;
  address: string;
  email: '';
  phone: string;
  isActive: boolean;

  constructor() {
    this.registered = moment();
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
