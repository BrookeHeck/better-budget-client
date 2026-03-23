import {Component, computed, EventEmitter, inject, Input, OnInit, Output, Signal} from '@angular/core';
import {Account} from '../../model/account/Account';
import {RadioButton} from 'primeng/radiobutton';
import {NgTemplateOutlet} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AccountStore} from '../../store/account-store';
import {UserStore} from '../../store/user-store';

@Component({
  selector: 'account-radio-list',
  imports: [
    RadioButton,
    NgTemplateOutlet,
    FormsModule
  ],
  standalone: true,
  templateUrl: 'account-radio-list.html'
})
export class AccountRadioList implements OnInit {
  @Input() selectedAccount: number;
  @Input() showLoanAccounts: boolean = false;
  @Output() accountSelect = new EventEmitter<Account>();

  protected readonly accountStore = inject(AccountStore);
  private readonly userStore = inject(UserStore);

  accounts: Signal<Account[][]> = computed(() =>
    [this.accountStore.checking(), this.accountStore.saving(), this.accountStore.credit()]
  );

  ngOnInit() {
    if(!this.accountStore.accounts().length) {
      this.accountStore.loadAllAccounts(this.userStore.user().userId);
    }
  }
}
