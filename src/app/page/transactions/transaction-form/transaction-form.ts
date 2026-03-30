import {Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {DatePicker} from 'primeng/datepicker';
import {Transaction} from '../../../model/transaction/transaction';
import {Button} from 'primeng/button';
import {NgTemplateOutlet} from '@angular/common';
import {Textarea} from 'primeng/textarea';
import {BudgetStore} from '../../../store/budget-store';
import {Select} from 'primeng/select';
import {TransactionType} from '../../../model/transaction/transaction-type';

@Component({
  selector: 'transaction-form',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    InputNumber,
    DatePicker,
    Button,
    NgTemplateOutlet,
    Textarea,
    Select
  ],
  templateUrl: 'transaction-form.html',
})
export class TransactionForm implements OnInit{
  @Input() transaction: Transaction;
  @Input() buttonTemplate: TemplateRef<any>;
  @Input() transactionType: TransactionType;

  @Output() submit: EventEmitter<Transaction> = new EventEmitter();

  protected budgetStore = inject(BudgetStore);

  protected form: FormGroup;

  ngOnInit() {
    const date = this.transaction.dateOfTransaction ? new Date(this.transaction.dateOfTransaction) : null;
    this.form = new FormGroup({
      amount: new FormControl<number>({value: this.transaction.amount, disabled: !!this.transaction.transactionId}),
      categoryId: new FormControl<number>(this.transaction.categoryId),
      dateOfTransaction: new FormControl<Date>(date),
      description: new FormControl<string>(this.transaction.description)
    });
  }

  submitTransaction(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const {amount , description, categoryId, dateOfTransaction} = this.form.value;
    this.submit.emit({...this.transaction, amount, description, categoryId, dateOfTransaction});
  }

  protected readonly TransactionType = TransactionType;
}
