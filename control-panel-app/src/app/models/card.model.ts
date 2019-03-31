import { User } from './user.model';
import { StaffMember } from './staff.member.model';

export class Card {
  id: string;
  ownerId: number;
  ownerType: 'user' | 'staff';
  inventoryNumber: string;
  currentOwner: User | StaffMember;
  enabled: boolean;
}
