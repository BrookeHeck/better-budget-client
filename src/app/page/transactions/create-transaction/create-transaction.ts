import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {AccountStore} from '../../../store/account-store';
import {TransactionStore} from '../../../store/transaction-store';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserStore} from '../../../store/user-store';
import {Account} from '../../../model/account/Account';
import {AccountRadioList} from '../../../component/account-radio-list/account-radio-list';
import {Transaction} from '../../../model/transaction/transaction';
import {FloatLabel} from 'primeng/floatlabel';
import {InputNumber} from 'primeng/inputnumber';
import {Textarea} from 'primeng/textarea';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';

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
    FloatLabel,
    InputNumber,
    Textarea,
    InputText,
    DatePicker,
  ],
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

  protected detailForm = new FormGroup({
    amount: new FormControl<number>(null),
    description: new FormControl<string>(null),
    category: new FormControl<string>(null),
    dateOfTransaction: new FormControl<Date>(null)
  });
  createdTransaction: Transaction;

  ngOnInit() {
    this.accountStore.loadAllAccounts(this.userStore.user().userId);
  }

  setSelectedAccount(account: Account) {
    this.accountId = account.accountId;
  }

  async createTransaction() {
    const {amount, description, category, dateOfTransaction } = this.detailForm.value;
    const userId = this.userStore.user().userId;
    this.createdTransaction = await this.transactionStore.createTransaction(
      {amount, description, category, dateOfTransaction, userId, accountId: this.accountId, transactionId: null}
    );
  }

}
