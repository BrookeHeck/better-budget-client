import {User} from '../models/user/User';
import {UserStatus} from '../models/user/UserStatus';
import {signalStore, withMethods, withState} from '@ngrx/signals';

type UserState = {
  user: User;
  token: string;
}

const initialState: UserState = {
  user: {
    userId: 1,
    email: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
    status: UserStatus.ACTIVE,
  },
  token: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods
);
