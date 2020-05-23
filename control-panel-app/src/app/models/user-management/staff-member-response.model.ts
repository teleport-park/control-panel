import { Group } from './group.model';
import { StaffMember } from './staff/staff.member.model';

export class StaffMemberResponse extends StaffMember {
  group: Group = new Group();
  constructor(staffGroupName = null, staffGroupId = null) {
    super();
  }
}
