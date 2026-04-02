import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RecurringPayment} from '../../../model/recurring-payment/recurring-payment';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {TransactionType} from '../../../model/transaction/transaction-type';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'recurring-payment-table',
  imports: [
    TableModule,
    Button,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: 'recurring-payment-table.html'
})
export class RecurringPaymentTable {
  @Input() recurringPayments: RecurringPayment[];
  @Output() edit: EventEmitter<RecurringPayment> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  protected readonly TransactionType = TransactionType;
}
