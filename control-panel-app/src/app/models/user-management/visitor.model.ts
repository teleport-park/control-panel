import moment, { Moment } from 'moment';
import { InitService } from '../../services/init.service';

export class Visitor {
    /**
     * user id
     */
    id: string = null;
    /**
     * name
     */
    name: string = null;

    /**
     * gender
     */
    gender: 'male' | 'female' | 'other' = null;

    /**
     * email
     */
    email: string = null;

    /**
     * phone
     */
    phone: string = null;

    /**
     * age
     */
    age: number = null;

    /**
     * display name
     */
    display_name: string = null;

    /**
     * birthday
     */
    birthday: any = null;

    /**
     * balance
     */
    balance: {
        amount: number,
        currency: string
    }[] | null = null;

    constructor(private init?: InitService) {
        if (init) {
            this.age = init.config.visitor_min_age;
        }
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
        this.birthday = moment().subtract(age, 'years');
        return this.birthday;
    }
}
