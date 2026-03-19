import {Component, inject, OnInit} from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {AccountStore} from '../../../store/account-store';
import {TransactionStore} from '../../../store/transaction-store';
import {Message} from 'primeng/message';
import {RadioButton} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';
import {NgTemplateOutlet} from '@angular/common';
import {UserStore} from '../../../store/user-store';

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
    RadioButton,
    FormsModule,
    NgTemplateOutlet
  ],
  templateUrl: 'create-transaction.html'
})
export class CreateTransaction implements OnInit {
  protected accountStore = inject(AccountStore);
  protected transactionStore = inject(TransactionStore);
  private userStore = inject(UserStore);

  selectedAccount: number;

  ngOnInit() {
    this.accountStore.loadAllAccounts(this.userStore.user().userId);
  }

}
