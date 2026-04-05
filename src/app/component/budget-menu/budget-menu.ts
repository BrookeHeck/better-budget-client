import {Component, computed, EventEmitter, inject, OnInit, Output, Signal} from '@angular/core';
import {UserStore} from '../../store/user-store';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'budget-menu',
  imports: [
    Menubar,
    Avatar,
    Button,
    RouterLink
  ],
  templateUrl: './budget-menu.html',
})
export class BudgetMenu implements OnInit {
  @Output() switchMode: EventEmitter<void> = new EventEmitter();

  protected readonly userStore = inject(UserStore);

  protected menuItems: Signal<MenuItem[]> = computed(() => {
    return this.userStore.authenticated() ? this.userItems : this.authItems;
  });

  protected darkMode: boolean = false;

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
      label: 'Budget',
      icon: 'pi pi-wallet',
      routerLink: '/budget'
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

  ngOnInit() {
    const mode = localStorage.getItem('mode');
    if(mode === 'dark') {
      this.toggleMode();
    }
  }

  protected logout() {
    this.userStore.logout();
  }

  protected toggleMode() {
    this.darkMode = !this.darkMode;
    const mode = this.darkMode ? 'dark' : 'light';
    localStorage.setItem('mode', mode);
    this.switchMode.emit();
  }
}
