import {Component, inject, Input} from '@angular/core';
import {TransactionItem} from '../../../model/transaction/transactionItem';
import {TableModule} from 'primeng/table';
import {InputText} from 'primeng/inputtext';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Transaction} from '../../../model/transaction/transaction';
import {TransactionItemRequests} from '../../../service/http-requests/transaction-item-requests';

@Component({
  selector: 'transaction-item-table',
  imports: [
    TableModule,
    InputText,
    CurrencyPipe,
    FormsModule,
    ButtonDirective,
    Ripple
  ],
  standalone: true,
  templateUrl: 'transaction-item-table.html'
})
export class TransactionItemTable {
  @Input() transactionItems: TransactionItem[];
  @Input() transaction: Transaction;

  transactionItemService = inject(TransactionItemRequests);

  isAddingItem: boolean = false;

  onRowEditInit(item: TransactionItem) {

  }

  async onRowEditSave(item: TransactionItem) {
    if(!item.transactionItemId) await this.createTransactionItem(item);
    else {
      await this.transactionItemService.updateTransactionItem(item);
    }
  }

  onRowEditCancel(item: TransactionItem, index: number) {
    if(this.isAddingItem && !item.transactionId && !item.transactionItemId) {
      this.transactionItems.pop();
      this.isAddingItem = false;
    }
  }

  onRowCreate() {
    this.isAddingItem = true;
    this.transactionItems.push(new TransactionItem());
  }

  async onRowDelete(item: TransactionItem) {
    await this.transactionItemService.deleteTransactionItem(item.transactionItemId);
    setTimeout(() =>
      this.transactionItems = this.transactionItems.filter(i => i.transactionItemId !== item.transactionItemId), 100);
  }

  async createTransactionItem(item: TransactionItem) {
    this.isAddingItem = false;
    item.transactionId = this.transaction.transactionId;
    const createdItem: TransactionItem = await this.transactionItemService.createTransactionItem(item);
    this.transactionItems[this.transactionItems.length - 1].transactionItemId = createdItem.transactionItemId;
  }


}
