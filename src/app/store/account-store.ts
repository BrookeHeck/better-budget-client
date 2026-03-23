import {Account} from '../model/account/Account';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {AccountRequests} from '../service/http-requests/account-requests';
import {AccountType} from '../model/account/account-type';

type AccountState = {
  accounts: Account[],
  loading: boolean,
};

const initialState: AccountState = {
  accounts: [],
  loading: false,
};

export const AccountStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withComputed(store => ({
    checking: computed(() => store.accounts().filter(a => a.accountType === AccountType.CHECKING)),
    saving: computed(() => store.accounts().filter(a => a.accountType === AccountType.SAVING)),
    credit: computed(() => store.accounts().filter(a => a.accountType === AccountType.CREDIT)),
    loan: computed(() => store.accounts().filter(a => a.accountType === AccountType.LOAN)),
  })),
  withMethods((store, accountRequestService = inject(AccountRequests)) => ({
    async loadAllAccounts(userId: number) {
      patchState(store, {loading: true});
      const accounts = await accountRequestService.getUserAccounts(userId);
      patchState(store, {loading: false, accounts});
    },
    async createAccount(account: Account) {
      patchState(store, {loading: true});
      const created = await accountRequestService.createAccount(account);
      patchState(store, state => ({
        loading: false,
        accounts: [...state.accounts, created]
      }))
    },
    async updateAccount(account: Account) {
      patchState(store, {loading: true});
      const updated = await accountRequestService.updateAccount(account);
      patchState(store, state => {
        const accounts = state.accounts.map(a => a.accountId === account.accountId ? updated : a);
        return {loading: false, accounts};
      })
    },
    async deleteAccount(accountId: number) {
      patchState(store, {loading: true});
      await accountRequestService.deleteAccount(accountId);
      patchState(store, state => {
        const accounts = state.accounts.filter(a => a.accountId !== accountId);
        return {loading: false, accounts};
      })
    },
    updateAccountBalance(accountId: number, amount: number) {
      patchState(store, state => {
        const accounts = state.accounts.map(a => {
          if(a.accountId === accountId) {
            const balance = a.balance + amount;
            return {...a, balance}
          }
          return a;
        });
        return {accounts};
      })
    }
  }))
)
