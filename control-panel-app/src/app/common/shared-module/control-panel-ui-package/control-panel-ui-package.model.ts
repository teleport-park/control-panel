import { Payment } from '../control-panel-ui-payment';

export interface Package {
  packageInfo: PackageInfo;
  payments: Payment[];
}

export interface PackageInfo {
  id: number;
  name: string;
  amount: number;
  currency: string;
}
