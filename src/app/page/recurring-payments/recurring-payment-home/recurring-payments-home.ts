import { Component } from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {Button} from 'primeng/button';
import {RecurringPayment} from '../../../model/recurring-payment/recurring-payment';
import {Dialog} from 'primeng/dialog';
import {RecurringPaymentForm} from '../recurring-payment-form/recurring-payment-form';

@Component({
  selector: 'recurring-payments',
  imports: [
    PageHeader,
    Button,
    Dialog,
    RecurringPaymentForm
  ],
  templateUrl: './recurring-payments-home.html',
})
export class RecurringPaymentsHome {
  protected showCreateEditDialog: boolean;
  protected recurringPayment: RecurringPayment = new RecurringPayment();

  protected openCreateEditDialog(recurringPayment?: RecurringPayment) {
    if(recurringPayment) this.recurringPayment = recurringPayment;
    this.showCreateEditDialog = true;
  }

  protected closeCreateEditDialog() {
    this.showCreateEditDialog = false;
    this.recurringPayment = new RecurringPayment();
  }

  protected submitForm(recurringPayment: RecurringPayment) {
    this.closeCreateEditDialog();
  }


}
