import { CashBoxController, GateController, TVRController } from '../controller';
import { Visitor } from '..';

export type ControllerType = TVRController | GateController | CashBoxController;

export type UserType = Visitor;
