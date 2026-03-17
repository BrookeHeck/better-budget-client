import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from '../../../model/account/Account';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountType, AccountTypeDisplay} from '../../../model/account/account-type';
import { InputNumberModule } from 'primeng/inputnumber';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';

@Component({
  standalone: true,
  selector: 'account-form',
  imports: [InputNumberModule, ReactiveFormsModule, Card, FloatLabel, Button, InputText, Select],
  templateUrl: './account-form.html'
})
export class AccountForm implements OnInit{
  @Input() account: Account;

  @Output() submit: EventEmitter<Account> = new EventEmitter();

  form: FormGroup;
  typeOptions: {label: string, value: string} = Object.keys(AccountType).map(type => ({
    value: type,
    key: AccountTypeDisplay[type]
  }))

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>(this.account.name),
      balance: new FormControl<number>(this.account.balance),
      type: new FormControl<AccountType>(this.account.type)
    });
    if(this.account.accountId) {
      this.form.controls.type.disable();
    }
  }

  onSubmit() {
    const {name, balance, type} = this.form.getRawValue();
    this.submit.emit({
      ...this.account, name, balance, type
    })
  }
}
