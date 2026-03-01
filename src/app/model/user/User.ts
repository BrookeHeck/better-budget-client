import {UserStatus} from './UserStatus';

export class User {
  userId: number | null = null;
  email: string | null = null;
  password: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  status: UserStatus | null = null;

  constructor() {}
}
