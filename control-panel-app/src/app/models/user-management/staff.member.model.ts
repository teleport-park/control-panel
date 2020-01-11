import { Moment } from 'moment';

export class StaffMember {
   id: string;
   name: string;
   display_name: string;
   created_at: string;
   updated_at: string;
   hired_at: string;
   fired_at: string;
   passport: string;
   high_education: boolean;
   roles: string[] = [];
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
