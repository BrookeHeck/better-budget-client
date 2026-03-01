import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public getCurrentMonthStartDate(): Date {
    const date = new Date();
    date.setDate(1);
    return date;
  }

  public getYearStartDate(year: number): Date {
    const date = new Date();
    date.setFullYear(year, 0, 1);
    return date;
  }

  public getYearEndDate(year: number): Date {
    const date = new Date();
    date.setFullYear(year, 11, 31);
    return date;
  }
}
