import { Group } from './group.model';
import { StaffMember } from './staff.member.model';

export class StaffMemberResponse extends StaffMember {
  group: Group = new Group();
  constructor(staffGroupName = null, staffGroupId = null) {
    super();
    this.staffGroupName = staffGroupName;
    this.staffGroupId = staffGroupId;
  }

  getOwnProperties() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      passport: this.passport,
      employmentDate: this.employmentDate,
      firingDate: this.firingDate,
      higherEducation: this.higherEducation,
      fired: this.fired,
      staffGroupName: this.staffGroupName,
      isEnabled: this.isEnabled
    }
  }
}
