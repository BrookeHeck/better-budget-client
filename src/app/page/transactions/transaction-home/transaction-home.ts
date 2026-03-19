import {Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {PageHeader} from '../../../component/page-header/page-header';
import {RouterLink} from '@angular/router';
import {TransactionTable} from '../transaction-table/transaction-table';
import {TransactionStore} from '../../../store/transaction-store';
import {UserStore} from '../../../store/user-store';
import {FloatLabel} from 'primeng/floatlabel';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {Card} from 'primeng/card';

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
    Card
  ],
  templateUrl: './transaction-home.html',
  standalone: true
})
export class TransactionHome implements OnInit {
  protected transactionStore = inject(TransactionStore);
  protected userStore = inject(UserStore);

  ngOnInit() {
    this.transactionStore.loadAllTransactions(this.userStore.user().userId);
  }
}
