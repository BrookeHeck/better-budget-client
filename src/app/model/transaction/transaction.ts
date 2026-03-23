import {TransactionType} from './transaction-type';

export class Transaction {
  transactionId: number;
  transactionType: TransactionType;
  category: string;
  amount: number;
  description: string;
  dateOfTransaction: Date;
  accountId: number;
  userId: number;
}
