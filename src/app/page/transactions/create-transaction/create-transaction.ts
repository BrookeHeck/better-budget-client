import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {AccountStore} from '../../../store/account-store';
import {TransactionStore} from '../../../store/transaction-store';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserStore} from '../../../store/user-store';
import {Account} from '../../../model/account/Account';
import {AccountRadioList} from '../../../component/account-radio-list/account-radio-list';
import {Transaction} from '../../../model/transaction/transaction';
import {TransactionItemTable} from '../transaction-item-table/transaction-item-table';
import {TransactionForm} from '../transaction-form/transaction-form';
import {RouterLink} from '@angular/router';

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
  templateUrl: 'create-transaction.html'
})
export class CreateTransaction implements OnInit {
  protected accountStore = inject(AccountStore);
  protected transactionStore = inject(TransactionStore);
  private userStore = inject(UserStore);

  protected accountId: number;
  protected accounts: Signal<Account[][]> = computed(() =>
    [this.accountStore.checking(), this.accountStore.saving(), this.accountStore.credit()]
  );


  protected createdTransaction: Transaction = new Transaction();

  ngOnInit() {
    if(!this.accountStore.accounts().length) {
      this.accountStore.loadAllAccounts(this.userStore.user().userId);
    }
  }

  setSelectedAccount(account: Account) {
    this.accountId = account.accountId;
  }

  async createTransaction(transaction: Transaction) {
    transaction.userId = this.userStore.user().userId;
    transaction.accountId = this.accountId;
    this.createdTransaction = await this.transactionStore.createTransaction(transaction);
  }

}
