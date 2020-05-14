import moment, { Moment } from 'moment';
import { InitService } from '../../services/init.service';

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
    age: number;

    /**
     * display name
     */
    display_name: string;

    nickname: string;

    birthday: any;

    balance: {
        amount: number,
        currency: string
    }[] | null;

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
