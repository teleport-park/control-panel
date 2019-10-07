import moment, { Moment } from 'moment';

export class Visitor {
    /**
     * user id
     */
    id: string;

    /**
     * created at
     */
    createdAt: Date;

    /**
     * updated at
     */
    updatedAt: Date;
    /**
     * name
     */
    name: string;
    /**
     * nickname
     */
    nickname?: string;

    gender: 'male' | 'female';
    /**
     * email
     */
    email: string;
    /**
     * phone
     */
    phone: string;

    /**
     * comment
     */
    comment = ' ';

    /**
     * DOB
     */
    birthyear: any = null;

    /**
     * age
     */
    age: number = null;

    /**
     * display name
     */
    displayName: string;

    get Age() {
        return this.age + '';
    }
    set Age(value: string) {
        this.age = parseInt(value, 2);
    }

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
        if (moment.isMoment(this.birthyear)) {
            this.age = Math.abs(this.birthyear.diff(moment(), 'years'));
            return this.age;
        }
        return null;
    }

    /**
     * set DOB
     * @param age
     */
    setDOB(age: number): Moment {
        this.birthyear = moment().subtract(age, 'years').year();
        return this.birthyear;
    }
}
