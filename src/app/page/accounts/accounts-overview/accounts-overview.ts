import { Component } from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Account} from '../../../model/account/Account';
import {AccountForm} from '../account-form/account-form';
import {Button} from 'primeng/button';

@Component({
  selector: 'accounts-overview',
  imports: [
    Dialog,
    AccountForm,
    Button
  ],
  templateUrl: './accounts-overview.html',
})
export class AccountsOverview {
  showForm: boolean = false;
  selectedAccount: Account = new Account();

  openForm() {
    this.showForm = true
  }

  createAccount(account: Account) {
    console.log(account)
  }

}
