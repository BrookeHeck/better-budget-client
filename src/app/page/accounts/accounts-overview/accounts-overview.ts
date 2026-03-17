import { Component } from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Account} from '../../../model/account/Account';
import {AccountForm} from '../account-form/account-form';

@Component({
  selector: 'accounts-overview',
  imports: [
    Dialog,
    AccountForm
  ],
  templateUrl: './accounts-overview.html',
})
export class AccountsOverview {
  showForm: boolean = false;
  selectedAccount: Account = new Account();

  toggleForm() {
    this.showForm = !this.showForm;
  }

  createAccount(account: Account) {

  }

}
