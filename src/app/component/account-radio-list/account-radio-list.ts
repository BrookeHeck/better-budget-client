import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Account} from '../../model/account/Account';
import {RadioButton} from 'primeng/radiobutton';
import {NgTemplateOutlet} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'account-radio-list',
  imports: [
    RadioButton,
    NgTemplateOutlet,
    FormsModule
  ],
  templateUrl: 'account-radio-list.html'
})
export class AccountRadioList {
  @Input() accounts: Account[][];
  @Input() selectedAccount: number;

  @Output() accountSelect = new EventEmitter<Account>();
}
