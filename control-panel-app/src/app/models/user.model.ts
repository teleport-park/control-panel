import * as moment from 'moment';
import { Moment } from "moment";

export class User {
  id: number;
  index: number;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: Moment;
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
//TODO resolve issue with date format
  // getAge(): number {
  //   return this.dateOfBirth ? Math.floor((new Date().getTime() - Date.parse(this.dateOfBirth)) / 3.15576e+10) : null;
  // }

}
