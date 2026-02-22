import {inject, Injectable} from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';
import {User} from '../../models/user/User';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRequests {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/user';

  public async login(email: string, password: string): Promise<User> {
    const authHeader = 'Basic: ' + btoa(`${email}:${password}`);
    return firstValueFrom(
      this.http.post<User>(`${this.baseUrl}/login`, null, {headers: {Authorization: authHeader}})
    );
  }

  public async register(user: User): Promise<User> {
    return firstValueFrom(this.http.post<User>(`${this.baseUrl}/register`, user));
  }
}
