import { Group } from './group.model';
import { Moment } from 'moment';
import moment from 'moment';

export class StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  isEnabled: boolean = undefined;
  staffGroupId: number;
  staffGroupName: string = undefined;
  passport = '';
  employmentDate: Moment = null;
  firingDate: Moment = null;
  group: Group;
  higherEducation = false;
  fired = false;

  /**
   * fire staff member
   * @param fire
   */
  dismiss(fire: boolean) {
    if (fire) {
      this.firingDate = moment();
      return;
    }
    this.firingDate = null;
  }
}
