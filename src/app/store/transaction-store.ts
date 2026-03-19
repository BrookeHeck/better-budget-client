import {Transaction} from '../model/transaction/transaction';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {TransactionRequests} from '../service/http-requests/transaction-requests';

type TransactionState = {
  transactions: Transaction[],
  loading: boolean
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
}

export const TransactionStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, transactionService = inject(TransactionRequests)) => ({
    async loadAllTransactions(userId: number, startDate?: Date, endDate?: Date) {
      patchState(store, {loading: true});
      const transactions = await transactionService.getTransactionsWithinDateRange(userId, startDate, endDate);
      patchState(store, {loading: false, transactions});
    },
    async createTransaction(transaction: Transaction): Promise<Transaction> {
      patchState(store, {loading: true});
      const created = await transactionService.createTransaction(transaction);
      patchState(store, state => ({
        loading: false, transactions: [...state.transactions, created]
      }))
      return created;
    },
    async updateTransaction(transaction: Transaction) {
      patchState(store, {loading: true});
      const updated = await transactionService.updateTransaction(transaction);
      patchState(store, state => {
        const transactions = state.transactions.map(t => t.transactionId === updated.transactionId ? updated : t);
        return {loading: false, transactions};
      })
    },
    async deleteTransaction(transactionId: number) {
      patchState(store, {loading: true});
      await transactionService.deleteTransaction(transactionId);
      patchState(store, state => {
        const transactions = state.transactions.filter(t => t.transactionId !== transactionId);
        return {loading: false, transactions};
      })
    }
  }))
)
