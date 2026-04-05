import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BudgetMenu} from './component/budget-menu/budget-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetMenu],
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
