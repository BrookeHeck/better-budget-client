import {inject, Injectable} from '@angular/core';
import {HttpRequestHandler} from './http-request-handler';
import {TransactionItem} from '../../model/transaction/transaction-item';
import {HttpParams} from '@angular/common/http';
import {DateService} from '../util/date-service';

@Injectable({
  providedIn: 'root'
})
export class TransactionItemRequests {
  private readonly http = inject(HttpRequestHandler);
  private readonly dateService = inject(DateService);
  private readonly endpoint = 'transaction-item'

  public getTransactionItemsForTransaction(transactionId: number): Promise<TransactionItem[]> {
    return this.http.get<TransactionItem[]>(`${this.endpoint}/${transactionId}`)
  }

  public getTransactionItemsForBudgetCategory(
    budgetCategoryId: number, month: number, year: number): Promise<TransactionItem[]> {
    const date: string = this.dateService.formatDate(new Date(year, month, 1));
    const params: HttpParams = new HttpParams().set('date', date);
    return this.http.get<TransactionItem[]>(`${this.endpoint}/budget/${budgetCategoryId}`, params);
  }

  public createTransactionItem(transactionItem: TransactionItem): Promise<TransactionItem> {
    return this.http.post<TransactionItem, TransactionItem>(this.endpoint, transactionItem);
  }

  public updateTransactionItem(transactionItem: TransactionItem): Promise<TransactionItem> {
    return this.http.put<TransactionItem, TransactionItem>(this.endpoint, transactionItem);
  }

  public deleteTransactionItem(transactionItemId: number): Promise<void> {
    return this.http.delete(`${this.endpoint}/${transactionItemId}`);
  }

}
