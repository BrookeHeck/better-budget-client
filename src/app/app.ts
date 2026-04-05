import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BudgetMenu} from './component/budget-menu/budget-menu';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetMenu, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('budget-client');

  toggleDarkMode() {
    const element = document.querySelector('html');
    // Toggle the class defined in your appConfig
    element?.classList.toggle('my-app-dark');
  }

}
