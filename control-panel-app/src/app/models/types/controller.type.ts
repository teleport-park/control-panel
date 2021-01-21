import { CashBoxController, GateController, TVRController } from '../controller';
import { StaffMember, Visitor } from '..';

export type ControllerType = any | TVRController | GateController | CashBoxController;

export type UserType = Visitor | StaffMember;
