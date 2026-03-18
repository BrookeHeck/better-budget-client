import {User} from '../model/user/User';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {AuthResponse, UserRequests} from '../service/http-requests/user-requests';

type UserState = {
  user: User | null;
  token: string;
  isLoading: boolean;
  authenticated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  authenticated: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userRequestService = inject(UserRequests)) => ({
    async login(email: string, password: string): Promise<void> {
      patchState(store, { isLoading: true });
      const res: AuthResponse = await userRequestService.login(email, password);
      localStorage.setItem('user', JSON.stringify(res));
      patchState(store, { user: res.user, token: res.token, isLoading: false, authenticated: true });
    },
    logout() {
      localStorage.clear()
      patchState(store, initialState)
    },
    loadUserFromStorage() {
      const storage: string = localStorage.getItem('user');
      if(storage) {
        const user: AuthResponse = JSON.parse(storage);
        patchState(store, {user: user.user, token: user.token, authenticated: true})
      }
    }
  }))
);
