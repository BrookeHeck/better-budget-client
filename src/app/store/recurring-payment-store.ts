import {RecurringPayment} from '../model/recurring-payment/recurring-payment';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {RecurringPaymentRequests} from '../service/http-requests/recurring-payment-requests';

export type RecurringPaymentState = {
  recurringPayments: RecurringPayment[],
  loading: boolean,
};

const initialState: RecurringPaymentState = {
  recurringPayments: [],
  loading: false,
}

export const RecurringPaymentStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, paymentService = inject(RecurringPaymentRequests)) => ({
    async loadRecurringPaymentsForUser(userId: number): Promise<void> {
      patchState(store, {loading: true});
      const recurringPayments = await paymentService.getRecurringPaymentsForUser(userId);
      patchState(store, {loading: false, recurringPayments});
    },

    async createRecurringPayment(recurringPayment: RecurringPayment): Promise<void> {
      patchState(store, {loading: true});
      const created = await paymentService.createRecurringPayment(recurringPayment);
      patchState(store, (state) => {
        const recurringPayments = state.recurringPayments
          .map(p => p.recurringPaymentId === created.recurringPaymentId ? created : p);
        return {loading: false, recurringPayments}
      });
    },

    async updateRecurringPayment(recurringPayment: RecurringPayment): Promise<void> {
      patchState(store, {loading: true});
      const updated = await paymentService.updateRecurringPayment(recurringPayment);
      patchState(store, (state) => {
        const recurringPayments = state.recurringPayments
          .map(p => p.recurringPaymentId === updated.recurringPaymentId ? updated : p);
        return {loading: false, recurringPayments}
      });
    },

    async deleteRecurringPayment(recurringPaymentId: number): Promise<void> {
      patchState(store, {loading: true});
      await paymentService.deleteRecurringPayment(recurringPaymentId);
      patchState(store, (state) => {
        const recurringPayments = state.recurringPayments
          .filter(p => p.recurringPaymentId !== recurringPaymentId);
        return {loading: false, recurringPayments}
      });
    },
  }))
)
