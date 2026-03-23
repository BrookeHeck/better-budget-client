import {Component, Input} from '@angular/core';
import {Transaction} from '../../../model/transaction/transaction';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {CurrencyPipe, NgClass} from '@angular/common';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Account} from '../../../model/account/Account';

@Component({
  selector: 'transaction-table',
  imports: [
    Card,
    TableModule,
    CurrencyPipe,
    Button,
    RouterLink,
    NgClass
  ],
  standalone: true,
  templateUrl: 'transaction-table.html'
})
export class TransactionTable {
  @Input() transactions: TransactionTableData[];

}

export type TransactionTableData = {
  transaction: Transaction,
  account: Account
}
