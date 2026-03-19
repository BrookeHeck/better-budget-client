import {Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {PageHeader} from '../../../component/page-header/page-header';
import {RouterLink} from '@angular/router';
import {TransactionTable} from '../transaction-table/transaction-table';
import {TransactionStore} from '../../../store/transaction-store';
import {UserStore} from '../../../store/user-store';

@Component({
  selector: 'transaction-home',
  imports: [
    Button,
    PageHeader,
    RouterLink,
    TransactionTable
  ],
  templateUrl: './transaction-home.html',
})
export class TransactionHome implements OnInit {
  protected transactionStore = inject(TransactionStore);
  protected userStore = inject(UserStore);

  ngOnInit() {
    this.transactionStore.loadAllTransactions(this.userStore.user().userId);
  }
}
