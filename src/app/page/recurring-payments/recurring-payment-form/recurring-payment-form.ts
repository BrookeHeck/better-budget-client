import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RecurringPayment} from '../../../model/recurring-payment/recurring-payment';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PaymentInterval, PaymentIntervalDisplay} from '../../../model/recurring-payment/payment-interval';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {InputNumber} from 'primeng/inputnumber';
import {DatePicker} from 'primeng/datepicker';
import {Checkbox} from 'primeng/checkbox';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'recurring-payment-form',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    Select,
    InputNumber,
    DatePicker,
    Checkbox,
    Button,
    InputText
  ],
  templateUrl: 'recurring-payment-form.html',
})
export class RecurringPaymentForm implements OnInit, OnChanges {
  @Input() recurringPayment: RecurringPayment;
  @Output() submit: EventEmitter<RecurringPayment> = new EventEmitter();

  protected form: FormGroup;
  protected paymentIntervalOptions: {label: string, value: PaymentInterval}[];

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>(this.recurringPayment.name),
      paymentAmount: new FormControl<number>(this.recurringPayment.paymentAmount),
      paymentInterval: new FormControl<PaymentInterval>(this.recurringPayment.paymentInterval),
      nextPaymentDate: new FormControl<Date>(this.recurringPayment.nextPaymentDate),
      notifications: new FormControl<boolean>(this.recurringPayment.notifications)
    });
    this.paymentIntervalOptions = Object.values(PaymentInterval).map(p => (
      {label: PaymentIntervalDisplay[p], value: p}
    ));
  }

  ngOnChanges(changes: SimpleChanges<RecurringPaymentForm>) {
    const currVal: RecurringPayment = changes.recurringPayment?.currentValue;
    if(currVal && this.form) {
      currVal.nextPaymentDate = new Date(currVal.nextPaymentDate);
      this.form.reset({...changes.recurringPayment.currentValue})
    }
  }

  onSubmit() {
    const {paymentAmount, paymentInterval, nextPaymentDate, notifications, name} = this.form.getRawValue();
    this.submit.emit({...this.recurringPayment, paymentAmount, paymentInterval, nextPaymentDate, notifications, name});
  }

}
