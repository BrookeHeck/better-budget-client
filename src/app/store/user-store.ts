import {User} from '../model/user/User';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {UserRequests} from '../service/http-requests/user-requests';

type UserState = {
  user: User | null;
  isLoading: boolean;
  authenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  authenticated: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userRequestService = inject(UserRequests)) => ({
    async login(email: string, password: string): Promise<void> {
      patchState(store, { isLoading: true });
      const user = await userRequestService.login(email, password);
      patchState(store, { user, isLoading: false, authenticated: true });
    },
  }))
);
