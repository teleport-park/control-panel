import { Group } from './group.model';

export class StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  staffGroupId: number;
  group: Group;
}
