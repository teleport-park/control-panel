export class StaffMember {
    id: string = null;
    name: string = null;
    display_name: string = null;
    created_at: string = null;
    updated_at: string = null;
    hired_at: string = null;
    fired_at: string = null;
    passport: string = '';
    high_education: boolean = false;
    roles: string[] = [];

    constructor() {
    }
}

export class StaffMemberRequest {
    id: string = '';
    name: string = '';
    hired_at: string = null;
    fired_at: string = null;
    passport: string = '';
    high_education: boolean = false;
    roles: string[] = [];

    constructor(staff: StaffMember) {
        Object.keys(this).forEach((key: string) => {
            this[key] = staff[key];
        });
    }
}
