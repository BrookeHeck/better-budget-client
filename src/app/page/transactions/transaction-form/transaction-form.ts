import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Transaction} from '../../../model/transaction/transaction';
import {Button} from 'primeng/button';
import {NgTemplateOutlet} from '@angular/common';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'transaction-form',
  imports: [
    FloatLabel,
    ReactiveFormsModule,
    InputNumber,
    InputText,
    DatePicker,
    Button,
    NgTemplateOutlet,
    Textarea
  ],
  templateUrl: 'transaction-form.html',
})
export class TransactionForm implements OnInit{
  @Input() transaction: Transaction;
  @Input() showDescription: boolean = true;
  @Input() buttonTemplate: TemplateRef<any>;

  @Output() submit: EventEmitter<Transaction> = new EventEmitter();

  protected form;

  ngOnInit() {
    const date = this.transaction.dateOfTransaction ? new Date(this.transaction.dateOfTransaction) : null;
    this.form = new FormGroup({
      amount: new FormControl<number>({value: this.transaction.amount, disabled: !!this.transaction.transactionId}),
      category: new FormControl<string>(this.transaction.category),
      dateOfTransaction: new FormControl<Date>(date)
    });
    if(this.showDescription)
      this.form.addControl('description', new FormControl<string>(this.transaction.description));
  }

  submitTransaction(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const {amount , description, category, dateOfTransaction} = this.form.value;
    this.submit.emit({...this.transaction, amount, description, category, dateOfTransaction});
  }

}
