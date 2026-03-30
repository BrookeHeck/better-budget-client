import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {Button} from 'primeng/button';
import {PageHeader} from '../../../component/page-header/page-header';
import {RouterLink} from '@angular/router';
import {TransactionTable, TransactionTableData} from '../transaction-table/transaction-table';
import {TransactionStore} from '../../../store/transaction-store';
import {UserStore} from '../../../store/user-store';
import {AccountStore} from '../../../store/account-store';
import {Account} from '../../../model/account/Account';
import {BudgetStore} from '../../../store/budget-store';
import {BudgetCategory} from '../../../model/budget-category/budget-category';

@Component({
  selector: 'transaction-home',
  imports: [
    Button,
    PageHeader,
    RouterLink,
    TransactionTable,
  ],
  templateUrl: './transaction-home.html',
  standalone: true
})
export class TransactionHome implements OnInit {
  protected transactionStore = inject(TransactionStore);
  protected userStore = inject(UserStore);
  private accountStore = inject(AccountStore);
  private budgetStore = inject(BudgetStore);

  protected tableData: Signal<TransactionTableData[]> = computed(() =>
    this.transactionStore.transactions().map(transaction => {
      const account: Account = this.accountStore.accounts().find(a => transaction.accountId === a.accountId);
      const category: BudgetCategory = this.budgetStore.categories()
        .find(c => transaction.categoryId === c.budgetCategoryId)
      return {transaction, account, category};
    })
  )

  ngOnInit() {
    const userId = this.userStore.user().userId;
    this.transactionStore.loadAllTransactions(userId);
    if(!this.accountStore.accounts().length) {
      this.accountStore.loadAllAccounts(userId);
    }
    if(!this.budgetStore.categories().length) {
      this.budgetStore.getBudgetCategoriesForUser(userId);
    }
  }
}
