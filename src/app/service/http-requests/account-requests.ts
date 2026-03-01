import {inject, Injectable} from '@angular/core';
import {HttpRequestHandler} from './http-request-handler';
import {Account} from '../../model/account/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountRequests {
  private readonly http = inject(HttpRequestHandler);
  private readonly endpoint = 'account';

  public getUserAccounts(userId: number): Promise<Account[]> {
    return this.http.get<Account[]>(`${this.endpoint}/${userId}`);
  }

  public getAccount(accountId: number): Promise<Account> {
    return this.http.get<Account>(`${this.endpoint}/${accountId}`);
  }

  public createAccount(account: Account): Promise<Account> {
    return this.http.post<Account, Account>(this.endpoint, account);
  }

  public updateAccount(account: Account): Promise<Account> {
    return this.http.put<Account, Account>(this.endpoint, account);
  }

  public deleteAccount(accountId: Account): Promise<void> {
    return this.http.delete(`${this.endpoint}/${accountId}`);
  }
}
