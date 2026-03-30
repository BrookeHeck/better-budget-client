import {Component} from '@angular/core';
import {PageHeader} from '../../../component/page-header/page-header';
import {FormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {DatePipe} from '@angular/common';
import {FloatLabel} from 'primeng/floatlabel';
import {CategoryOverview} from '../category-overview/category-overview';

@Component({
  selector: 'budget-home',
  imports: [
    PageHeader,
    FormsModule,
    DatePicker,
    DatePipe,
    FloatLabel,
    CategoryOverview
  ],
  templateUrl: 'budget-home.html'
})
export class BudgetHome {
  date: Date = new Date();
  maxDate: Date = new Date();

  onDateSelection() {
    // TODO: update budget data shown
  }

}
