import {UserStatus} from './UserStatus';

export class User {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
}
