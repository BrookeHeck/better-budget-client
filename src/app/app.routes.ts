import { Routes } from '@angular/router';
import {Login} from './page/auth/login/login';
import {Register} from './page/auth/register/register';
import {Dashboard} from './page/dashboard/dashboard/dashboard';
import {AccountsHome} from './page/accounts/accounts-home/accounts-home';
import {Transactions} from './page/transactions/transactions';
import {RecurringPayments} from './page/recurring-payments/recurring-payments';
import {Reports} from './page/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'dashboard', component: Dashboard},
  { path: 'accounts', component: AccountsHome},
  { path: 'transactions', component: Transactions},
  { path: 'recurring-payments', component: RecurringPayments},
  { path: 'reports', component: Reports}
];
