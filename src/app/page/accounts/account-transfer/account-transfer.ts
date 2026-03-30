import {Component, inject,} from '@angular/core';
import {AccountRadioList} from '../../../component/account-radio-list/account-radio-list';
import {Card} from 'primeng/card';
import {PageHeader} from '../../../component/page-header/page-header';
import {TransactionForm} from '../../transactions/transaction-form/transaction-form';
import {Transaction} from '../../../model/transaction/transaction';
import {TransactionStore} from '../../../store/transaction-store';
import {UserStore} from '../../../store/user-store';
import {Account} from '../../../model/account/Account';
import {TransactionType} from '../../../model/transaction/transaction-type';
import {AccountStore} from '../../../store/account-store';
import {Router} from '@angular/router';

@Component({
  selector: 'account-transfer',
  imports: [
    AccountRadioList,
    Card,
    PageHeader,
    TransactionForm
  ],
  templateUrl: 'account-transfer.html'
})
export class AccountTransfer {
  private readonly transactionStore = inject(TransactionStore);
  private readonly userStore = inject(UserStore);
  private readonly accountStore = inject(AccountStore);
  private readonly router = inject(Router);

  protected toAccount: Account;
  protected fromAccount: Account;

  protected transaction = new Transaction();

  setToAccount(account: Account) {
    this.toAccount = account;
  }

  setFromAccount(account: Account) {
    this.fromAccount = account;
  }

  async createTransfer(transaction: Transaction) {
    const to: Transaction = this.createTransaction(this.toAccount, transaction);
    const from: Transaction = this.createTransaction(this.fromAccount, transaction);
    from.amount = -from.amount;
    await this.transactionStore.createTransferTransaction(to, from);
    this.accountStore.updateAccountBalance(to.accountId, to.amount);
    this.accountStore.updateAccountBalance(from.accountId, from.amount);
    this.router.navigate(['/accounts']);
  }

  createTransaction(account: Account, transaction: Transaction) {
    const description = `${transaction.amount} transferred from ${this.fromAccount.name} to ${this.toAccount.name}.`
    return {
      ...transaction,
      userId: this.userStore.user().userId,
      accountId: account.accountId,
      description,
      transactionType: TransactionType.TRANSFER
    };
  }

  protected readonly TransactionType = TransactionType;
}
