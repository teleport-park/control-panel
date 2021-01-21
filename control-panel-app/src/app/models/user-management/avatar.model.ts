export class Avatar {
  /**
   * id
   */
  id: string;
  /**
   * user id
   */
  userId: number = null;
  /**
   * avatar name
   */
  userName = '';

  /**
   * avatar gender
   */
  gender: 'male' | 'female' = 'male';

  /**
   * avatar age
   */
  age: number = null;

  constructor() {
  }
}
