import { CashBoxController, GateController, TVRController } from '../controller';
import { StaffMember, Visitor } from '..';

export type ControllerType = TVRController | GateController | CashBoxController;

export type UserType = Visitor | StaffMember;
