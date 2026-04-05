import {inject, Injectable} from '@angular/core';
import {HttpRequestHandler} from './http-request-handler';
import {Transaction} from '../../model/transaction/transaction';
import {DateService} from '../util/date-service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionRequests {
  private readonly http = inject(HttpRequestHandler);
  private readonly dateService = inject(DateService);
  private readonly endpoint = 'transaction';

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
    return this.http.get<Transaction[]>(`${this.endpoint}/user/${userId}`, params);
  }

  public getTransactionsForFilters(
    userId: number, startDate?: Date, endDate?: Date, accountId?: number, categoryId?: number): Promise<Transaction[]> {
    if(!startDate || !endDate) {
      startDate = this.dateService.getCurrentMonthStartDate();
      endDate = new Date();
    }
    const startDateParam: string = this.dateService.formatDate(startDate);
    const endDateParam: string = this.dateService.formatDate(endDate);
    let params: HttpParams = new HttpParams()
      .set('startDate', startDateParam)
      .set('endDate', endDateParam);
    if(accountId) {
      params = params.set('account', accountId);
    }
    if(categoryId) {
      params = params.set('category', categoryId);
    }
    return this.getTransactions(userId, params);
  }

  public createTransferTransaction(to: Transaction, from: Transaction): Promise<TransferRequest> {
    return this.http.post<TransferRequest, TransferRequest>(`${this.endpoint}/transfer`, {to, from});
  }
}

type TransferRequest = {
  to: Transaction,
  from: Transaction
}
