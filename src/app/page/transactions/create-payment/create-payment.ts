import {Component, inject} from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {TransactionStore} from '../../../store/transaction-store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserStore} from '../../../store/user-store';
import {Account} from '../../../model/account/Account';
import {AccountRadioList} from '../../../component/account-radio-list/account-radio-list';
import {Transaction} from '../../../model/transaction/transaction';
import {TransactionItemTable} from '../transaction-item-table/transaction-item-table';
import {TransactionForm} from '../transaction-form/transaction-form';
import {RouterLink} from '@angular/router';
import {TransactionType} from '../../../model/transaction/transaction-type';
import {AccountStore} from '../../../store/account-store';

@Component({
  selector: 'create-transaction',
  imports: [
    PageHeader,
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    Button,
    Card,
    FormsModule,
    AccountRadioList,
    ReactiveFormsModule,
    TransactionItemTable,
    TransactionForm,
    RouterLink,
  ],
  standalone: true,
  templateUrl: 'create-payment.html'
})
export class CreatePayment {
  protected readonly transactionStore = inject(TransactionStore);
  private readonly userStore = inject(UserStore);
  private readonly accountStore = inject(AccountStore);

  protected accountId: number;

  protected createdTransaction: Transaction = new Transaction();

  setSelectedAccount(account: Account) {
    this.accountId = account.accountId;
  }

  async createTransaction(transaction: Transaction) {
    transaction.userId = this.userStore.user().userId;
    transaction.accountId = this.accountId;
    transaction.transactionType = TransactionType.PAYMENT;
    transaction.amount = -transaction.amount;
    this.createdTransaction = await this.transactionStore.createTransaction(transaction);
    this.accountStore.updateAccountBalance(this.createdTransaction.accountId, this.createdTransaction.amount);
  }

}
