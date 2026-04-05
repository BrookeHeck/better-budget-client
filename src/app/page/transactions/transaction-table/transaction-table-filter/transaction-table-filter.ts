import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {TransactionStore} from '../../../../store/transaction-store';
import {Drawer} from 'primeng/drawer';
import {AccountStore} from '../../../../store/account-store';
import {BudgetStore} from '../../../../store/budget-store';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DateService} from '../../../../service/util/date-service';
import {UserStore} from '../../../../store/user-store';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {Account} from '../../../../model/account/Account';
import {BudgetCategory} from '../../../../model/budget-category/budget-category';

@Component({
  selector: 'transaction-table-filter',
  imports: [
    Drawer,
    DatePicker,
    ReactiveFormsModule,
    FloatLabel,
    Select,
    Button
  ],
  templateUrl: 'transaction-table-filter.html'
})
export class TransactionTableFilter implements OnInit {
  @Input() visible: boolean;
  @Output() hide: EventEmitter<void> = new EventEmitter();
  @Output() filterSummary: EventEmitter<string[]> = new EventEmitter();

  private readonly transactionStore = inject(TransactionStore);
  protected readonly accountStore = inject(AccountStore);
  protected readonly budgetStore = inject(BudgetStore);
  private readonly userStore = inject(UserStore);
  private readonly dateService = inject(DateService);

  filterForm: FormGroup;
  startDate: Date;
  endDate: Date;

  ngOnInit() {
    this.startDate = this.dateService.getCurrentMonthStartDate();
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0);
    this.filterForm  = new FormGroup({
      startDate: new FormControl<Date>(this.startDate),
      endDate: new FormControl<Date>(this.endDate),
      account: new FormControl<Account>(null),
      category: new FormControl<BudgetCategory>(null)
    });
    this.emitFilterSummary(this.startDate, this.endDate);
  }

  protected async applyFilters() {
    const userId = this.userStore.user().userId;
    const {startDate, endDate, account, category} = this.filterForm.value;
    await this.transactionStore
      .loadAllTransactions(userId, startDate, endDate, account?.accountId, category?.budgetCategoryId);
    this.hide.emit();
    this.emitFilterSummary(startDate, endDate, account, category);
  }

  protected clearFilters() {
    this.filterForm.reset({startDate: this.startDate, endDate: this.endDate, account: null, category: null});
    this.applyFilters();
  }

  private emitFilterSummary(startDate: Date, endDate: Date, account?: Account, category?: BudgetCategory) {
    const summary = [`Start Date: ${this.getDateString(startDate)}`, `End Date: ${this.getDateString(endDate)}`];
    if(account) summary.push(`Account: ${account?.name}`);
    if(category) summary.push(`Category: ${category?.name}`)
    this.filterSummary.emit(summary);
  }

  private getDateString(date: Date): string {
    return date?.toISOString().split("T")[0];
  }

}
