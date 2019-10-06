export class StaffMember {
    id: string;
    active: boolean;
    name: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    passport: string;
    hiredAt: Date;
    firedAt: Date;
    higherEducation: boolean;
    roles: string[] = [];
}
