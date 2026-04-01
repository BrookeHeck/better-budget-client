import { Routes } from '@angular/router';
import {Login} from './page/auth/login/login';
import {Register} from './page/auth/register/register';
import {AccountsHome} from './page/accounts/accounts-home/accounts-home';
import {TransactionHome} from './page/transactions/transaction-home/transaction-home';
import {RecurringPaymentsHome} from './page/recurring-payments/recurring-payment-home/recurring-payments-home';
import {Reports} from './page/reports/reports';
import {BudgetHome} from './page/budget/budget-home/budget-home';
import {CreateExpense} from './page/transactions/create-expense/create-expense';
import {TransactionDetail} from './page/transactions/transaction-detail/transaction-detail';
import {CreateDeposit} from './page/transactions/create-deposit/create-deposit';
import {AccountTransfer} from './page/accounts/account-transfer/account-transfer';
import {BudgetCategoryOverview} from './page/budget/budget-category-overview/budget-category-overview';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'accounts', component: AccountsHome },
  { path: 'account-transfer', component: AccountTransfer },
  { path: 'budget', component: BudgetHome },
  { path: 'category-overview/:budgetCategoryId/:month/:year', component: BudgetCategoryOverview},
  { path: 'transactions', component: TransactionHome },
  { path: 'create-expense', component: CreateExpense },
  { path: 'create-deposit', component: CreateDeposit },
  { path: 'transaction-detail/:transactionId', component: TransactionDetail },
  { path: 'recurring-payments', component: RecurringPaymentsHome },
  { path: 'reports', component: Reports },
];
