import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';

@Component({
  selector: 'transaction-home',
  imports: [
    Card,
    Button
  ],
  templateUrl: './transaction-home.html',
})
export class TransactionHome {
}
