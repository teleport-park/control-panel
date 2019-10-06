import { Visitor } from './user-management/visitor.model';
import { StaffMember } from './user-management/staff.member.model';

export class Card {
  id: string;
  ownerId: number;
  ownerType: 'user' | 'staff';
  inventoryNumber: string;
  currentOwner: Visitor | StaffMember;
  enabled: boolean;
}
