export enum AccountType {
  CHECKING,
  SAVING,
  LOAN,
  CREDIT
}

export const AccountTypeDisplay: Record<AccountType, string> = {
  [AccountType.CHECKING]: 'Checking',
  [AccountType.SAVING]: 'Saving',
  [AccountType.LOAN]: 'Loan',
  [AccountType.CREDIT]: 'Credit Card'
};
