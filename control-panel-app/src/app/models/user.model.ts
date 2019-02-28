export class User {
  id: number;
  index: number;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  registered: string;
  gender: 'male' | 'female';
  desc: string;
  address: string;
  phone: string;
  isActive: boolean;

  constructor() {
    this.registered = new Date().toLocaleString();
  }
//TODO resolve issue with date format
  // getAge(): number {
  //   return this.dateOfBirth ? Math.floor((new Date().getTime() - Date.parse(this.dateOfBirth)) / 3.15576e+10) : null;
  // }

}
