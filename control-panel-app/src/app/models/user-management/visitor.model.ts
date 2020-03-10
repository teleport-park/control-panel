import moment, { Moment } from 'moment';

export class Visitor {
   /**
    * user id
    */
   id: string;
   /**
    * name
    */
   name: string;

   /**
    * gender
    */
   gender: 'male' | 'female' | 'other';

   /**
    * email
    */
   email: string;

   /**
    * phone
    */
   phone: string;

   /**
    * age
    */
   age: number = null;

   /**
    * display name
    */
   display_name: string;

    nickname: string;

   birthday: any;

   // get Age() {
   //     return this.age + '';
   // }
   // set Age(value: string) {
   //     this.age = parseInt(value, 2);
   // }

   constructor() {
   }

   /**
    * get age
    * @param DOB
    */
   getAge(DOB?: Moment): number {
       if (DOB) {
           this.age = Math.abs(DOB.diff(moment(), 'years'));
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
       this.birthday = moment().subtract(age, 'years').year();
       return this.birthday;
   }
}
