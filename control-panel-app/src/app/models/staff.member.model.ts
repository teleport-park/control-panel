import { Group } from './group.model';

export class StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  isEnabled: boolean = undefined;
  staffGroupId: number;
  staffGroupName: string = undefined;
  group: Group;
}
