import { SchemaValidation } from '../../intefaces';
import { validateSchema } from '../../../utils/utils';
import StaffSchema from './staff-schema.json';

export class StaffMember implements SchemaValidation {
    readonly INSTANCE_NAME: string = 'StaffMember';
    id: string = null;
    name: string = null;
    display_name: string = null;
    created_at: string = null;
    updated_at: string = null;
    hired_at: string = null;
    fired_at: string = null;
    passport: string = null;
    high_education: boolean = false;
    roles: string[] = [];

    constructor() {
    }

    public validate(data: object): string[] {
        return validateSchema(Object.keys(data), StaffSchema);
    }
}

export class StaffMemberRequest {
    id: string = '';
    name: string = '';
    hired_at: string = null;
    fired_at: string = null;
    passport: string = null;
    high_education: boolean = false;
    roles: string[] = [];

    constructor(staff: StaffMember) {
        Object.keys(this).forEach((key: string) => {
            this[key] = staff[key];
        });
    }
}
