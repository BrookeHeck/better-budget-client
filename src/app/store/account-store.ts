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

const accountStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withComputed(({accounts}) => ({
    checking: computed(() => accounts.filter(a => a.type === AccountType.CHECKING)),
    saving: computed(() => accounts.filter(a => a.type === AccountType.SAVING)),
    loan: computed(() => accounts.filter(a => a.type === AccountType.LOAN)),
    credit: computed(() => accounts.filter(a => a.type === AccountType.CREDIT)),
    assets: computed(() => accounts.reduce((accum, acc) =>
      acc.balance > 0 ? accum + acc.balance : accum
    ), 0),
    liabilities: computed(() => accounts.reduce((accum, acc) =>
      acc.balance < 0 ? accum + acc.balance : accum
    ), 0),
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
    async deleteAccount(accountId: Account) {
      patchState(store, {loading: true});
      await accountRequestService.deleteAccount(accountId);
      patchState(store, state => {
        const accounts = state.accounts.filter(a => a.accountId !== accountId);
        return {loading: false, accounts};
      })
    }
  }))
)
