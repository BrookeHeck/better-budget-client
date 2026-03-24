import {Component, inject, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Account} from '../../../model/account/Account';
import {AccountForm} from '../account-form/account-form';
import {Button} from 'primeng/button';
import {AccountStore} from '../../../store/account-store';
import {UserStore} from '../../../store/user-store';
import {TableModule} from 'primeng/table';
import {AccountTypeDisplay} from '../../../model/account/account-type';
import {AccountTable} from '../account-table/account-table';
import {AccountsOverview} from '../accounts-overview/accounts-overview';
import {PageHeader} from '../../../component/page-header/page-header';
import {RouterLink} from '@angular/router';
import {ConfirmDialog} from '../../../component/confirm-dialog/confirm-dialog';
import {TransactionStore} from '../../../store/transaction-store';

@Component({
  selector: 'accounts-home',
  imports: [
    Dialog,
    AccountForm,
    Button,
    TableModule,
    AccountTable,
    AccountsOverview,
    PageHeader,
    RouterLink,
    ConfirmDialog
  ],
  templateUrl: './accounts-home.html',
})
export class AccountsHome implements OnInit {
  protected accountStore = inject(AccountStore);
  private userStore = inject(UserStore);
  private transactionStore = inject(TransactionStore);

  protected readonly AccountTypeDisplay = AccountTypeDisplay;

  protected showForm: boolean = false;
  protected selectedAccount: Account = new Account();

  private accountIdForDeletion: number;
  protected showConfirmDialog: boolean = false;

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
    this.accountIdForDeletion = accountId;
    this.showConfirmDialog = true;
  }

  async onConfirmDelete(confirmDelete: boolean) {
    if(confirmDelete) {
      try {
        await this.accountStore.deleteAccount(this.accountIdForDeletion);
        this.transactionStore.removeTransactionsOnAccountDeletion(this.accountIdForDeletion);
      } catch (e) {
        console.log(e);
      }
    }
    this.showConfirmDialog = false;
    this.accountIdForDeletion = null;
  }
}
