import { User } from './user-management/user.model';
import { StaffMember } from './user-management/staff.member.model';

export class Card {
  id: string;
  ownerId: number;
  ownerType: 'user' | 'staff';
  inventoryNumber: string;
  currentOwner: User | StaffMember;
  enabled: boolean;
}
