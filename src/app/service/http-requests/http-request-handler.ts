import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestHandler {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/api/v1/';

  public get<R>(endpoint: string, params?: HttpParams): Promise<R> {
    return params ?
      firstValueFrom(this.http.get<R>(this.baseUrl + endpoint, { params })) :
      firstValueFrom(this.http.get<R>(this.baseUrl + endpoint));
  }

  public post<B, R>(endpoint: string, body: B): Promise<R> {
    return firstValueFrom(this.http.post<R>(this.baseUrl + endpoint, body));
  }

  public put<B, R>(endpoint: string, body: B): Promise<R> {
    return firstValueFrom(this.http.put<R>(this.baseUrl + endpoint, body));
  }

  public delete(endpoint: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(this.baseUrl + endpoint));
  }

}
