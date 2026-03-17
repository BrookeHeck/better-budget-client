export enum AccountType {
  CHECKING='CHECKING',
  SAVING='SAVING',
  LOAN='LOAN',
  CREDIT='CREDIT'
}

export const AccountTypeDisplay: Record<AccountType, string> = {
  [AccountType.CHECKING]: 'Checking',
  [AccountType.SAVING]: 'Saving',
  [AccountType.LOAN]: 'Loan',
  [AccountType.CREDIT]: 'Credit Card'
};
