import {TransactionType} from './transaction-type';

export class Transaction {
  transactionId: number;
  transactionType: TransactionType;
  categoryId: number;
  amount: number;
  description: string;
  dateOfTransaction: Date;
  accountId: number;
  userId: number;
}
