import {inject, Injectable} from '@angular/core';
import {HttpRequestHandler} from './http-request-handler';
import {Transaction} from '../../models/transaction/transaction';
import {DateService} from '../util/date-service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionRequests {
  private readonly http = inject(HttpRequestHandler);
  private readonly dateService = inject(DateService);
  private readonly endpoint = 'transaction';

  public getTransaction(transactionId): Promise<Transaction> {
    return this.http.get<Transaction>(`${this.endpoint}/${transactionId}`);
  }

  public createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http.post<Transaction, Transaction>(this.endpoint, transaction);
  }

  public updateTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http.put<Transaction, Transaction>(this.endpoint, transaction);
  }

  public deleteTransaction(transactionId: number): Promise<void> {
    return this.http.delete(`${this.endpoint}/${transactionId}`)
  }

  private getTransactions(userId: number, params: HttpParams): Promise<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.endpoint}/${userId}`, params);
  }

  public getTransactionsWithinDateRange(userId: number, startDate?: Date, endDate?: Date): Promise<Transaction[]> {
    if(!startDate || !endDate) {
      startDate = this.dateService.getCurrentMonthStartDate();
      endDate = new Date();
    }
    const startDateParam = this.dateService.formatDate(startDate);
    const endDateParam = this.dateService.formatDate(endDate);
    const params = new HttpParams();
    params.set('startDate', startDateParam);
    params.set('endDate', endDateParam);
    return this.getTransactions(userId, params);
  }

  public getTransactionsWithinYear(userId: number, year: number): Promise<Transaction[]> {
    const startDate = this.dateService.formatDate(this.dateService.getYearStartDate(year));
    const endDate = this.dateService.formatDate(this.dateService.getYearEndDate(year));
    const params = new HttpParams();
    params.set('startDate', startDate);
    params.set('endDate', endDate);
    return this.getTransactions(userId, params);
  }

}
