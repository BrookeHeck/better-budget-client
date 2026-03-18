import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Account} from '../../../model/account/Account';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {AccountTypeDisplay} from '../../../model/account/account-type';
import {Card} from 'primeng/card';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'account-table',
  imports: [
    TableModule,
    Button,
    Card,
    CurrencyPipe
  ],
  templateUrl: 'account-table.html'
})
export class AccountTable{
  @Input() accounts: Account[];
  @Input() title: string;

  @Output() editAccount: EventEmitter<Account> = new EventEmitter();
  @Output() deleteAccount: EventEmitter<number> = new EventEmitter();

  protected readonly AccountTypeDisplay = AccountTypeDisplay;
}
