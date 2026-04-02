import {Component, computed, Input, OnChanges, Signal, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {RecurringPayment} from '../../../model/recurring-payment/recurring-payment';
import {Button} from 'primeng/button';

@Component({
  selector: 'recurring-payment-calendar',
  imports: [
    Button
  ],
  templateUrl: 'recurring-payment-calendar.html'
})
export class RecurringPaymentCalendar implements OnChanges {
  @Input() recurringPayments: RecurringPayment[];

  protected selectedDate: WritableSignal<Date> = signal(new Date());
  private calendarEvents: WritableSignal<RecurringPayment[]> = signal([]);
  protected calendarData: Signal<CalendarDay[]> = computed(() => {
    const lastDay: Date = this.getLastDateOfMonth(this.selectedDate());
    const firstDay: Date = this.getFirstDateOfMonth(this.selectedDate())
    let dayTracker = firstDay.getDay();
    const calendar: CalendarDay[] = [];
    for (let i: number = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), i);
      const events: RecurringPayment[] =
        this.calendarEvents().filter(e => this.isSameDay(date, e.nextPaymentDate));
      calendar.push({dayOfWeek: dayTracker, dayOfMonth: i, events});
      dayTracker = dayTracker === 6 ? 0 : dayTracker + 1;
    }
    return calendar;
  });

  ngOnChanges(changes: SimpleChanges<RecurringPaymentCalendar>) {
    const value: RecurringPayment[] = changes.recurringPayments?.currentValue;
    if(value) {
      this.calendarEvents.update(() =>
        value.map(p => ({...p, nextPaymentDate: new Date(p.nextPaymentDate)}))
      );
    }
  }

  private isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  private getFirstDateOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getLastDateOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  protected selectNextMonth(): void {
    this.selectedDate.update(date => new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  }

  protected selectCurrentMonth(): void {
    this.selectedDate.update(() => new Date());
  }

  protected selectPreviousMonth(): void {
    this.selectedDate.update(date => new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  }

  protected readonly Array = Array;
}

type CalendarDay = {
  dayOfWeek: number;
  dayOfMonth: number;
  events: RecurringPayment[];
}
