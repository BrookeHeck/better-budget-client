import {inject, Injectable} from '@angular/core';
import {HttpRequestHandler} from './http-request-handler';
import {RecurringPayment} from '../../model/recurring-payment/recurring-payment';

@Injectable({
  providedIn: 'root'
})
export class RecurringPaymentRequests {
  private http = inject(HttpRequestHandler);
  private readonly endpoint = 'recurring-payment'

  public getRecurringPaymentsForUser(userId: number): Promise<RecurringPayment[]> {
    return this.http.get<RecurringPayment[]>(`${this.endpoint}/${userId}`);
  }

  public createRecurringPayment(recurringPayment: RecurringPayment): Promise<RecurringPayment> {
    return this.http.post<RecurringPayment, RecurringPayment>(this.endpoint, recurringPayment);
  }

  public updateRecurringPayment(recurringPayment: RecurringPayment): Promise<RecurringPayment> {
    return this.http.put<RecurringPayment, RecurringPayment>(this.endpoint, recurringPayment);
  }

  public deleteRecurringPayment(id: number): Promise<void> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
