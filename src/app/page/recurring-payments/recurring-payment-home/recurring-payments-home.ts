import {Component, inject, OnInit} from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {Button} from 'primeng/button';
import {RecurringPayment} from '../../../model/recurring-payment/recurring-payment';
import {Dialog} from 'primeng/dialog';
import {RecurringPaymentForm} from '../recurring-payment-form/recurring-payment-form';
import {RecurringPaymentStore} from '../../../store/recurring-payment-store';
import {UserStore} from '../../../store/user-store';
import {Card} from 'primeng/card';
import {RecurringPaymentTable} from '../recurring-payment-table/recurring-payment-table';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'recurring-payments',
  imports: [
    PageHeader,
    Button,
    Dialog,
    RecurringPaymentForm,
    Card,
    RecurringPaymentTable,
    SelectButton,
    FormsModule
  ],
  templateUrl: './recurring-payments-home.html',
})
export class RecurringPaymentsHome implements OnInit {
  protected readonly recurringPaymentStore = inject(RecurringPaymentStore);
  private readonly userStore = inject(UserStore);

  protected showCreateEditDialog: boolean;
  protected recurringPayment: RecurringPayment = new RecurringPayment();

  protected selectButtonOptions: splitButtonOption[] = ['Table', 'Calender'];
  protected selectedOption: splitButtonOption = 'Table';

  ngOnInit() {
    this.recurringPaymentStore.loadRecurringPaymentsForUser(this.userStore.user().userId);
  }

  protected openCreateEditDialog(recurringPayment?: RecurringPayment) {
    if(recurringPayment) this.recurringPayment = {...recurringPayment};
    this.showCreateEditDialog = true;
  }

  protected closeCreateEditDialog() {
    this.showCreateEditDialog = false;
    this.recurringPayment = new RecurringPayment();
  }

  protected submitForm(recurringPayment: RecurringPayment) {
    recurringPayment.recurringPaymentId ?
      this.updateRecurringPayment(recurringPayment) :
      this.createRecurringPayment(recurringPayment);
    this.closeCreateEditDialog();
  }

  private async createRecurringPayment(recurringPayment: RecurringPayment): Promise<void> {
    recurringPayment.userId = this.userStore.user().userId;
    await this.recurringPaymentStore.createRecurringPayment(recurringPayment);
  }

  private async updateRecurringPayment(recurringPayment: RecurringPayment): Promise<void> {
    await this.recurringPaymentStore.updateRecurringPayment(recurringPayment);
  }
}

type splitButtonOption = 'Calender' | 'Table';
