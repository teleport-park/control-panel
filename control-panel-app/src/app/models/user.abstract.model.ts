import { Moment } from 'moment';
import moment from 'moment';

export abstract class UserAbstract {

  /**
   * user name
   */
  userName = '';

  /**
   * DOB
   */
  dateOfBirth: any = null;

  /**
   * age
   */
  age: number = null;

  /**
   * gender
   */
  gender: 'male' | 'female' = 'male';

  constructor() {}
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
