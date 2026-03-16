import {Component, computed, inject, Signal} from '@angular/core';
import {UserStore} from '../../store/user-store';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';

@Component({
  selector: 'b-header',
  imports: [
    Menubar
  ],
  templateUrl: './header.html',
})
export class Header {
  private readonly userStore = inject(UserStore)

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
    }
  ];
}
