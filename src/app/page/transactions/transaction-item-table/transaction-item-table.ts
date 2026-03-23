import {Component, inject, Input, OnChanges, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {TransactionItem} from '../../../model/transaction/transaction-item';
import {TableModule} from 'primeng/table';
import {InputText} from 'primeng/inputtext';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Transaction} from '../../../model/transaction/transaction';
import {TransactionItemRequests} from '../../../service/http-requests/transaction-item-requests';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'transaction-item-table',
  imports: [
    TableModule,
    InputText,
    CurrencyPipe,
    FormsModule,
    ButtonDirective,
    Ripple,
    InputNumber
  ],
  standalone: true,
  templateUrl: 'transaction-item-table.html'
})
export class TransactionItemTable implements OnChanges {
  @Input() transactionItems: TransactionItem[];
  @Input() transaction: Transaction;

  tableData: WritableSignal<TransactionItem[]> = signal([]);

  transactionItemService = inject(TransactionItemRequests);

  ngOnChanges(changes: SimpleChanges) {
    const items = changes['transactionItems'].currentValue
    if(items) {
      this.tableData.update(() => [...items, new TransactionItem()])
    }
  }

  async onRowEditSave(item: TransactionItem) {
    if(!item.transactionItemId) await this.createTransactionItem(item);
    else {
      this.transactionItems = this.transactionItems.slice(0, -1)
      await this.transactionItemService.updateTransactionItem(item);
    }
  }

  async onRowDelete(item: TransactionItem) {
    await this.transactionItemService.deleteTransactionItem(item.transactionItemId);
    this.tableData.update(items => items.filter(i => i.transactionItemId !== item.transactionItemId))
  }

  async createTransactionItem(item: TransactionItem) {
    item.transactionId = this.transaction.transactionId;
    const createdItem: TransactionItem = await this.transactionItemService.createTransactionItem(item);
    this.tableData.update(items => [...items.slice(0, -1), createdItem, new TransactionItem()])
  }


}
