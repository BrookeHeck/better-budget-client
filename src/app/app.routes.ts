import { Routes } from '@angular/router';
import {Login} from './page/auth/login/login';
import {Register} from './page/auth/register/register';
import {Dashboard} from './page/dashboard/dashboard/dashboard';
import {AccountsHome} from './page/accounts/accounts-home/accounts-home';
import {TransactionHome} from './page/transactions/transaction-home/transaction-home';
import {RecurringPayments} from './page/recurring-payments/recurring-payments';
import {Reports} from './page/reports/reports';
import {BudgetHome} from './page/budget/budget-home';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'dashboard', component: Dashboard},
  { path: 'accounts', component: AccountsHome},
  { path: 'budget', component: BudgetHome},
  { path: 'transactions', component: TransactionHome},
  { path: 'recurring-payments', component: RecurringPayments},
  { path: 'reports', component: Reports}
];
