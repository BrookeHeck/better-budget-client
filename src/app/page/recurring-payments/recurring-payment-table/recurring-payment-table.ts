import {Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {RecurringPayment} from '../../../model/recurring-payment/recurring-payment';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
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
export class RecurringPaymentTable implements OnChanges {
  @Input() recurringPayments: RecurringPayment[];
  @Output() edit: EventEmitter<RecurringPayment> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  protected tableData: WritableSignal<RecurringPayment[]> = signal([])

  ngOnChanges(changes: SimpleChanges<RecurringPaymentTable>) {
    if(changes.recurringPayments?.currentValue) {
      this.tableData.update(() => [...changes.recurringPayments.currentValue]);
    }
  }


}
