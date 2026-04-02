import {PaymentInterval} from './payment-interval';

export class RecurringPayment {
  recurringPaymentId: number;
  name: string;
  amount: number;
  paymentInterval: PaymentInterval;
  nextPaymentDate: Date;
  notifications: boolean;
  userId: number;
}
