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

  private readonly transactionStore = inject(TransactionStore);
  protected readonly accountStore = inject(AccountStore);
  protected readonly budgetStore = inject(BudgetStore);
  private readonly userStore = inject(UserStore);
  private readonly dateService = inject(DateService);

  filterForm: FormGroup;

  ngOnInit() {
    const startDate = this.dateService.getCurrentMonthStartDate();
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    this.filterForm  = new FormGroup({
      startDate: new FormControl<Date>(startDate),
      endDate: new FormControl<Date>(endDate),
      account: new FormControl<number>(null),
      category: new FormControl<number>(null)
    })
  }

  async applyFilters() {
    const userId = this.userStore.user().userId;
    const {startDate, endDate, account, category} = this.filterForm.value;
    await this.transactionStore.loadAllTransactions(userId, startDate, endDate, account, category);
    this.hide.emit();
  }

}
