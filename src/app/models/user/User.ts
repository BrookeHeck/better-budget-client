import {UserStatus} from './UserStatus';

export interface User {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
}
