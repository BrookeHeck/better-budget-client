import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {AccountStore} from '../../../store/account-store';
import {TransactionStore} from '../../../store/transaction-store';
import {Message} from 'primeng/message';
import {FormsModule} from '@angular/forms';
import {UserStore} from '../../../store/user-store';
import {Account} from '../../../model/account/Account';
import {AccountRadioList} from '../../../component/account-radio-list/account-radio-list';

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
    Message,
    FormsModule,
    AccountRadioList,
  ],
  templateUrl: 'create-transaction.html'
})
export class CreateTransaction implements OnInit {
  protected accountStore = inject(AccountStore);
  protected transactionStore = inject(TransactionStore);
  private userStore = inject(UserStore);

  protected selectedAccount: number;
  protected accounts: Signal<Account[][]> = computed(() =>
    [this.accountStore.checking(), this.accountStore.saving(), this.accountStore.credit()]
  );

  ngOnInit() {
    this.accountStore.loadAllAccounts(this.userStore.user().userId);
  }

  setSelectedAccount(account: Account) {
    this.selectedAccount = account.accountId;
  }

}
