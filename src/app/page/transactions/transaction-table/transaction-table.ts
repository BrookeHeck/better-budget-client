import {Component, inject, Input} from '@angular/core';
import {Transaction} from '../../../model/transaction/transaction';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {CurrencyPipe, NgClass} from '@angular/common';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Account} from '../../../model/account/Account';
import {TransactionStore} from '../../../store/transaction-store';
import {ConfirmDialog} from '../../../component/confirm-dialog/confirm-dialog';
import {TransactionType} from '../../../model/transaction/transaction-type';
import {BudgetCategory} from '../../../model/budget-category/budget-category';
import {TransactionTableFilter} from './transaction-table-filter/transaction-table-filter';

@Component({
  selector: 'transaction-table',
  imports: [
    Card,
    TableModule,
    CurrencyPipe,
    Button,
    RouterLink,
    NgClass,
    ConfirmDialog,
    TransactionTableFilter
  ],
  standalone: true,
  templateUrl: 'transaction-table.html'
})
export class TransactionTable {
  @Input() transactions: TransactionTableData[];

  private transactionStore = inject(TransactionStore);

  protected showConfirmDialog: boolean = false;
  private transactionIdToDelete: number;
  protected showFilters: boolean = false;

  toggleFilterDrawer() {
    this.showFilters = !this.showFilters;
  }

  onDeleteTransaction(transactionId: number) {
    this.showConfirmDialog = true;
    this.transactionIdToDelete = transactionId;
  }

  async onConfirmDeleteTransaction(confirm: boolean) {
    if(confirm) {
      try {
        await this.transactionStore.deleteTransaction(this.transactionIdToDelete);
      } catch (e) {
        console.log(e)
      }
    }
    this.transactionIdToDelete = null;
    this.showConfirmDialog = false;
  }


  protected readonly TransactionType = TransactionType;
}

export type TransactionTableData = {
  transaction: Transaction,
  account: Account
  category: BudgetCategory
}
