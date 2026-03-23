import {Component, inject} from '@angular/core';
import {TransactionStore} from '../../../store/transaction-store';
import {FormControl} from '@angular/forms';
import {AccountStore} from '../../../store/account-store';
import {Account} from '../../../model/account/Account';
import {AccountRadioList} from '../../../component/account-radio-list/account-radio-list';
import {TransactionForm} from '../transaction-form/transaction-form';
import {Transaction} from '../../../model/transaction/transaction';
import {TransactionType} from '../../../model/transaction/transaction-type';
import {UserStore} from '../../../store/user-store';

@Component({
  selector: 'create-deposit',
  imports: [
    AccountRadioList,
    TransactionForm
  ],
  templateUrl: 'create-deposit.html'
})
export class CreateDeposit {
  private readonly transactionStore = inject(TransactionStore);
  private readonly accountStore = inject(AccountStore);
  private readonly userStore = inject(UserStore);

  protected accountId: number;
  protected transaction: Transaction = new Transaction();

  setAccountId(account: Account) {
    this.accountId = account.accountId;
  }

  async createDeposit(transaction: Transaction) {
    transaction.userId = this.userStore.user().userId;
    transaction.accountId = this.accountId;
    transaction.transactionType = TransactionType.DEPOSIT;
    this.transaction = await this.transactionStore.createTransaction(transaction);
    this.accountStore.updateAccountBalance(this.transaction.accountId, this.transaction.amount);
  }
}
