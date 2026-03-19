import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {PageHeader} from '../../../component/page-header/page-header';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'transaction-home',
  imports: [
    Button,
    PageHeader,
    RouterLink
  ],
  templateUrl: './transaction-home.html',
})
export class TransactionHome {
}
