import {AccountType} from './account-type';

export interface Account {
  accountId: number;
  name: string;
  balance: number;
  accountType: AccountType;
  userId: number;
}
