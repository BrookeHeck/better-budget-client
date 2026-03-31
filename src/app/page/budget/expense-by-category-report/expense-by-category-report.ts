import {Component, computed, inject, Input, OnInit, Signal, SimpleChanges} from '@angular/core';
import {BudgetStore} from '../../../store/budget-store';
import {UserStore} from '../../../store/user-store';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CurrencyPipe, NgTemplateOutlet} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {CategoryForm} from '../category-form/category-form';
import {BudgetCategory} from '../../../model/budget-category/budget-category';
import {TransactionStore} from '../../../store/transaction-store';
import {MeterGroup, MeterItem} from 'primeng/metergroup';
import {Divider} from 'primeng/divider';
import {ChartComponent} from "ng-apexcharts";
import {RouterLink} from '@angular/router';
import {ChartOptions} from '../../../model/chart-options';

@Component({
  selector: 'expense-by-category-report',
  imports: [
    Card,
    Button,
    Dialog,
    CategoryForm,
    NgTemplateOutlet,
    MeterGroup,
    Divider,
    CurrencyPipe,
    ChartComponent,
    RouterLink,
  ],
  templateUrl: 'expense-by-category-report.html'
})
export class ExpenseByCategoryReport implements OnInit {
  @Input() date: Date;

  protected readonly budgetStore = inject(BudgetStore);
  private readonly  userStore = inject(UserStore);
  protected readonly transactionStore = inject(TransactionStore);

  protected categoryDialogVisible: boolean = false;
  protected budgetCategory = new BudgetCategory();

  protected categoryToAmount: Signal<Map<number, MeterItem>> = computed(() => {
    const categoryMap: Map<number, MeterItem> = new Map();
    this.transactionStore.expenses().forEach(t => {
      const currSum: number = categoryMap.get(t.categoryId)?.value;
      const sum: number = currSum ? -t.amount + currSum: -t.amount;
      categoryMap.set(t.categoryId, {value: sum, color: 'var(--p-primary-color)'});
    })
    this.budgetStore.categories().forEach(c => {
      if (!categoryMap.get(c.budgetCategoryId))
        categoryMap.set(c.budgetCategoryId, {value: 0});
    });
    return categoryMap;
  });

  protected chartOptions: Signal<Partial<ChartOptions>> = computed(() => {
    const series: number[] = [];
    const labels: string[] = [];
    this.budgetStore.categories().forEach(c => {
      labels.push(c.name);
      series.push(this.categoryToAmount().get(c.budgetCategoryId)?.value)
    });
    return {series, chart: {type: "pie"}, labels};
  });

  ngOnInit() {
    this.budgetStore.getBudgetCategoriesForUser(this.userStore.user().userId);
  }

  ngOnChanges(changes: SimpleChanges<ExpenseByCategoryReport>) {
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
}
