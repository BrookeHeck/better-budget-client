import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestHandler {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/';

  public get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint);
  }

  public post(endpoint: string, body: any) {
    return this.http.post(this.baseUrl + endpoint, body);
  }

  public put(endpoint: string, body: any) {
    return this.http.put(this.baseUrl + endpoint, body);
  }

  public delete(endpoint: string) {
    return this.http.delete(this.baseUrl + endpoint);
  }

}
