import {Component, computed, inject, Signal} from '@angular/core';
import {UserStore} from '../../store/user-store';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'b-header',
  imports: [
    Menubar,
    Avatar,
    Button,
    RouterLink
  ],
  templateUrl: './header.html',
})
export class Header {
  protected readonly userStore = inject(UserStore)

  protected menuItems: Signal<MenuItem[]> = computed(() => {
    return this.userStore.authenticated() ? this.userItems : this.authItems;
  })

  private authItems: MenuItem[] = [
    {
      label: 'Login',
      icon: 'pi pi-sign-in',
      routerLink: '/login',
    },
    {
      label: 'Register',
      icon: 'pi pi-user-plus',
      routerLink: '/register'
    }
  ];

  private userItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
    },
    {
      label: 'Accounts',
      icon: 'pi pi-dollar',
      routerLink: '/accounts',
    },
    {
      label: 'Transactions',
      icon: 'pi pi-credit-card',
      routerLink: '/transactions',
    },
    {
      label: 'Budget',
      icon: 'pi pi-wallet',
      routerLink: '/budget'
    },
    {
      label: 'Recurring Payments',
      icon: 'pi pi-replay',
      routerLink: '/recurring-payments'
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-bar',
      routerLink: 'reports',
    }
  ];

  protected logout() {
    this.userStore.logout();
  }
}
