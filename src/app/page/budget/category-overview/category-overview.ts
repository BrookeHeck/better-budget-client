import {Component, computed, inject, Input, OnInit, Signal, SimpleChanges} from '@angular/core';
import {BudgetStore} from '../../../store/budget-store';
import {UserStore} from '../../../store/user-store';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CurrencyPipe} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {CategoryForm} from '../category-form/category-form';
import {BudgetCategory} from '../../../model/budget-category/budget-category';
import {TransactionStore} from '../../../store/transaction-store';

@Component({
  selector: 'category-overview',
  imports: [
    Card,
    TableModule,
    Button,
    CurrencyPipe,
    Dialog,
    CategoryForm
  ],
  templateUrl: 'category-overview.html'
})
export class CategoryOverview implements OnInit {
  @Input() date: Date;

  protected readonly budgetStore = inject(BudgetStore);
  private readonly  userStore = inject(UserStore);
  protected readonly transactionStore = inject(TransactionStore);

  protected categoryDialogVisible: boolean = false;
  protected budgetCategory = new BudgetCategory();

  protected categoryToAmount: Signal<Map<number, number>> = computed(() => {
    const categoryMap: Map<number, number> = new Map();
    this.transactionStore.transactions().forEach(t => {
      const sum = categoryMap.get(t.categoryId);
      categoryMap.set(t.categoryId, sum ? sum + t.amount : t.amount);
    })
    this.budgetStore.categories().forEach(c => {
      if (!categoryMap.get(c.budgetCategoryId))
        categoryMap.set(c.budgetCategoryId, 0);
    });
    return categoryMap;
  })

  ngOnInit() {
    this.budgetStore.getBudgetCategoriesForUser(this.userStore.user().userId);
  }

  ngOnChanges(changes: SimpleChanges<CategoryOverview>) {
    if (changes.date?.currentValue) {
      const startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
      const endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
      this.transactionStore.loadAllTransactions(this.userStore.user().userId, startDate, endDate);
    }
  }

  onCategoryDialogClose() {
    this.categoryDialogVisible = false;
    this.budgetCategory = new BudgetCategory();
  }

  openCategoryDialog() {
    this.categoryDialogVisible = true;
  }

  async submitCategoryForm(budgetCategory: BudgetCategory) {
    if(budgetCategory.budgetCategoryId) {
      await this.budgetStore.updateBudgetCategory(budgetCategory);
    } else if(!budgetCategory.budgetCategoryId) {
      budgetCategory.active = true;
      budgetCategory.userId = this.userStore.user().userId;
      await this.budgetStore.createBudgetCategory(budgetCategory);
    }
    this.onCategoryDialogClose();
  }

  selectBudgetCategory(budgetCategory: BudgetCategory) {
    this.budgetCategory = budgetCategory;
    this.openCategoryDialog();
  }
}
