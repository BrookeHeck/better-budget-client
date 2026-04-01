export enum PaymentInterval {
  WEEKLY='WEEKLY',
  BIMONTHLY='BIMONTHLY',
  MONTHLY='MONTHLY',
  QUARTERLY='QUARTERLY',
  BIANNUALLY='BIANNUALLY',
  ANNUALLY='ANNUALLY',
}


export const PaymentIntervalDisplay: Record<PaymentInterval, string> = {
  [PaymentInterval.WEEKLY]: 'Weekly',
  [PaymentInterval.BIMONTHLY]: 'Bi-Monthly',
  [PaymentInterval.MONTHLY]: 'Monthly',
  [PaymentInterval.QUARTERLY]: 'Quarterly',
  [PaymentInterval.BIANNUALLY]: 'Bi-Annually',
  [PaymentInterval.ANNUALLY]: 'Annually',
};
