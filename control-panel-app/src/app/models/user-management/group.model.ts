import { Permission } from '../permission.model';

export class Group {
  id: number;
  name: string;
  permissions: Permission[] | number[] = [];
}
