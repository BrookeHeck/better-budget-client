import { Routes } from '@angular/router';
import {Login} from './page/auth/login/login';
import {Register} from './page/auth/register/register';
import {AccountsHome} from './page/accounts/accounts-home/accounts-home';
import {TransactionHome} from './page/transactions/transaction-home/transaction-home';
import {RecurringPayments} from './page/recurring-payments/recurring-payments';
import {Reports} from './page/reports/reports';
import {BudgetHome} from './page/budget/budget-home/budget-home';
import {CreateExpense} from './page/transactions/create-expense/create-expense';
import {TransactionDetail} from './page/transactions/transaction-detail/transaction-detail';
import {CreateDeposit} from './page/transactions/create-deposit/create-deposit';
import {AccountTransfer} from './page/accounts/account-transfer/account-transfer';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'accounts', component: AccountsHome },
  { path: 'account-transfer', component: AccountTransfer },
  { path: 'budget', component: BudgetHome },
  { path: 'transactions', component: TransactionHome },
  { path: 'create-expense', component: CreateExpense },
  { path: 'create-deposit', component: CreateDeposit },
  { path: 'transaction-detail/:transactionId', component: TransactionDetail },
  { path: 'recurring-payments', component: RecurringPayments },
  { path: 'reports', component: Reports },
];
