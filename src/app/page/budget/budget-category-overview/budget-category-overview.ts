import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {BudgetStore} from '../../../store/budget-store';
import {TransactionItemRequests} from '../../../service/http-requests/transaction-item-requests';
import {ActivatedRoute} from '@angular/router';
import {TransactionItem} from '../../../model/transaction/transaction-item';
import {BudgetCategory} from '../../../model/budget-category/budget-category';
import {PageHeader} from '../../../component/page-header/page-header';
import {Button} from 'primeng/button';
import {UserStore} from '../../../store/user-store';
import {Card} from 'primeng/card';
import {NgTemplateOutlet} from '@angular/common';
import {Divider} from 'primeng/divider';
import {ChartOptions} from '../../../model/chart-options';
import {ChartComponent} from 'ng-apexcharts';

@Component({
  selector: 'budget-category-overview',
  imports: [
    PageHeader,
    Button,
    Card,
    NgTemplateOutlet,
    Divider,
    ChartComponent
  ],
  templateUrl: 'budget-category-oveview.html'
})
export class BudgetCategoryOverview implements OnInit {
  private readonly budgetStore = inject(BudgetStore);
  private readonly transactionItemService = inject(TransactionItemRequests);
  private readonly userStore = inject(UserStore);
  private readonly route = inject(ActivatedRoute);

  private items: WritableSignal<TransactionItem[]> = signal([]);
  protected loading: WritableSignal<boolean> = signal(true);

  private categoryId: WritableSignal<number> = signal(0);
  protected category: Signal<BudgetCategory> = computed(() =>
    this.budgetStore.categories().find(c => c.budgetCategoryId === this.categoryId())
  )

  protected itemsToAmount: Signal<Map<string, number>> = computed(() => {
    const map: Map<string, number> = new Map();
    this.items().forEach(i => {
      const currSum: number = map.get(i.category);
      const sum = currSum ? currSum + i.amount : i.amount;
      map.set(i.category, sum);
    });
    return map;
  });
  protected itemsTotal: Signal<number> = computed(() => {
    let sum = 0;
    for(const amount of this.itemsToAmount().values()) {
      sum = sum + amount;
    }
    return sum;
  })

  protected chartOptions: Signal<Partial<ChartOptions>> = computed(() => {
    const series: number[] = [];
    const labels: string[] = [];
    for(const entry of this.itemsToAmount().entries()) {
      labels.push(entry[0]);
      series.push(entry[1])
    }
    return {series, chart: {type: "pie"}, labels};
  });

  ngOnInit() {
    const categoryId: number = Number(this.route.snapshot.params['budgetCategoryId']);
    this.loadTransactionItems(categoryId);
    if(!this.budgetStore.categories().length) {
      this.budgetStore.getBudgetCategoriesForUser(this.userStore.user().userId);
    }
    this.categoryId.update(() => categoryId);
  }

  private async loadTransactionItems(categoryId: number) {
    const month: number = Number(this.route.snapshot.params['month']);
    const year: number = Number(this.route.snapshot.params['year'])
    const items =
      await this.transactionItemService.getTransactionItemsForBudgetCategory(categoryId, month, year);
    this.items.update(() => items);
    this.loading.update(() => false);
  }

  protected openEditCategoryDialog() {

  }

  protected onLockBudgetCategory() {

  }

  private onConfirmLockBudgetCategory() {

  }
}
