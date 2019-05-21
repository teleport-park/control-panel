import { Moment } from 'moment';
import moment from 'moment';

export abstract class UserAbstract {

  /**
   * DOB
   */
  birthday: any = null;

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
    if (moment.isMoment(this.birthday)) {
      this.age = Math.abs(this.birthday.diff(moment(), 'years'));
      return this.age;
    }
    return null;
  }

  /**
   * set DOB
   * @param age
   */
  setDOB(age: number): Moment {
    this.birthday = moment().subtract(age, 'years');
    return this.birthday;
  }
}
