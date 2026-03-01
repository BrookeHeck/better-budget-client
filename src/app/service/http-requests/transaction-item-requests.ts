import {inject, Injectable} from '@angular/core';
import {HttpRequestHandler} from './http-request-handler';
import {TransactionItem} from '../../model/transaction/transactionItem';

@Injectable({
  providedIn: 'root'
})
export class TransactionItemRequests {
  private readonly http = inject(HttpRequestHandler);
  private readonly endpoint = 'transaction-item'

  public getTransactionItemsForTransaction(transactionId: number): Promise<TransactionItem[]> {
    return this.http.get<TransactionItem[]>(`${this.endpoint}/${transactionId}`)
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
