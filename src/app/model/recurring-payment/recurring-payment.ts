import {PaymentInterval} from './payment-interval';

export class RecurringPayment {
  recurringPaymentId: number;
  name: string;
  paymentAmount: number;
  paymentInterval: PaymentInterval;
  nextPaymentDate: Date;
  notifications: boolean;
  userId: number;
}
