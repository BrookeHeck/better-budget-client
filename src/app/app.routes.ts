import { Routes } from '@angular/router';
import {Login} from './page/auth/login/login';
import {Register} from './page/auth/register/register';
import {Dashboard} from './page/dashboard/dashboard/dashboard';
import {AccountsOverview} from './page/accounts/accounts-overview/accounts-overview';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'dashboard', component: Dashboard},
  { path: 'accounts', component: AccountsOverview}
];
