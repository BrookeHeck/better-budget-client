import {Component, computed, inject, Signal} from '@angular/core';
import {Card} from 'primeng/card';
import {AccountStore} from '../../../store/account-store';
import {Divider} from 'primeng/divider';
import {CurrencyPipe, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'accounts-overview',
  imports: [
    Card,
    Divider,
    NgTemplateOutlet,
    CurrencyPipe,
  ],
  templateUrl: 'accounts-overview.html'
})
export class AccountsOverview {
  private accountStore = inject(AccountStore);

  protected checkingTotal: Signal<number> = computed(() => (
    this.accountStore.checking().reduce((accum, a) => (
      accum + a.balance
    ), 0)
  ));

  protected savingTotal: Signal<number> = computed(() => (
    this.accountStore.saving().reduce((accum, a) => (
      accum + a.balance
    ), 0)
  ))

  protected creditTotal: Signal<number> = computed(() => (
    this.accountStore.credit().reduce((accum, a) => (
      accum + a.balance
    ), 0)
  ))

  protected loanTotal: Signal<number> = computed(() => (
    this.accountStore.loan().reduce((accum, a) => (
      accum + a.balance
    ), 0)
  ));

  protected assets: Signal<number> = computed(() => (
    this.checkingTotal() + this.savingTotal()
  ));

  protected liabilities: Signal<number> = computed(() => (
    this.creditTotal() + this.loanTotal()
  ));

  protected total: Signal<number> = computed(() => (
    this.assets() + this.liabilities()
  ));



}
