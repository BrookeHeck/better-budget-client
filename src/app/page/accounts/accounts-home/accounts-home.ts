import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Account} from '../../../model/account/Account';
import {AccountForm} from '../account-form/account-form';
import {Button} from 'primeng/button';
import {AccountStore} from '../../../store/account-store';
import {UserStore} from '../../../store/user-store';
import {TableModule} from 'primeng/table';
import {AccountType, AccountTypeDisplay} from '../../../model/account/account-type';
import {AccountTable} from '../account-table/account-table';
import {Card} from 'primeng/card';
import {AccountsOverview} from '../accounts-overview/accounts-overview';

@Component({
  selector: 'accounts-home',
  imports: [
    Dialog,
    AccountForm,
    Button,
    TableModule,
    AccountTable,
    Card,
    AccountsOverview
  ],
  templateUrl: './accounts-home.html',
})
export class AccountsHome implements OnInit {
  protected accountStore = inject(AccountStore);
  private userStore = inject(UserStore);

  protected readonly AccountTypeDisplay = AccountTypeDisplay;

  showForm: boolean = false;
  selectedAccount: Account = new Account();

  ngOnInit() {
    this.accountStore.loadAllAccounts(this.userStore.user().userId);
  }

  openForm() {
    this.showForm = true
  }

  closeForm() {
    this.showForm = false;
    this.selectedAccount = new Account();
  }

  setSelectedAccount(account: Account) {
    this.selectedAccount = account;
    this.openForm()
  }

  submitForm(account: Account) {
    account.userId = this.userStore.user().userId;
    this.selectedAccount.accountId ? this.updateAccount(account) : this.createAccount(account);
  }

  createAccount(account: Account) {
    try {
      this.accountStore.createAccount(account);
      this.closeForm()
    } catch (e) {
      console.log(e);
    }
  }

  updateAccount(account: Account) {
    try {
      account.accountId = this.selectedAccount.accountId;
      this.accountStore.updateAccount(account);
      this.closeForm()
    } catch (e) {
      console.log(e);
    }
  }

  deleteAccount(accountId: number) {
    try {
      this.accountStore.deleteAccount(accountId);
    } catch (e) {
      console.log(e);
    }
  }
}
