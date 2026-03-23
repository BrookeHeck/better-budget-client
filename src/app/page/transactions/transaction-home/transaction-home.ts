import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {Button} from 'primeng/button';
import {PageHeader} from '../../../component/page-header/page-header';
import {RouterLink} from '@angular/router';
import {TransactionTable, TransactionTableData} from '../transaction-table/transaction-table';
import {TransactionStore} from '../../../store/transaction-store';
import {UserStore} from '../../../store/user-store';
import {FloatLabel} from 'primeng/floatlabel';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {Card} from 'primeng/card';
import {Dialog} from 'primeng/dialog';
import {CreateDeposit} from '../create-deposit/create-deposit';
import {AccountStore} from '../../../store/account-store';
import {Account} from '../../../model/account/Account';

@Component({
  selector: 'transaction-home',
  imports: [
    Button,
    PageHeader,
    RouterLink,
    TransactionTable,
    FloatLabel,
    DatePicker,
    InputNumber,
    InputText,
    Card,
    Dialog,
    CreateDeposit
  ],
  templateUrl: './transaction-home.html',
  standalone: true
})
export class TransactionHome implements OnInit {
  protected transactionStore = inject(TransactionStore);
  protected userStore = inject(UserStore);
  private accountStore = inject(AccountStore);

  protected showDepositDialog: boolean = false;

  protected tableData: Signal<TransactionTableData[]> = computed(() =>
    this.transactionStore.transactions().map(transaction => {
      const account: Account = this.accountStore.accounts().find(a => transaction.accountId === a.accountId);
      return {transaction, account};
    })
  )

  ngOnInit() {
    this.transactionStore.loadAllTransactions(this.userStore.user().userId);
    if(!this.accountStore.accounts().length) {
      this.accountStore.loadAllAccounts(this.userStore.user().userId);
    }
  }

  openDepositDialog(): void {
    this.showDepositDialog = true;
  }
}
