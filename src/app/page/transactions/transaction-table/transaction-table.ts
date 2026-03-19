import {Component, Input} from '@angular/core';
import {Transaction} from '../../../model/transaction/transaction';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'transaction-table',
  imports: [
    Card,
    TableModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: 'transaction-table.html'
})
export class TransactionTable{
  @Input() transactions: Transaction[];

}
