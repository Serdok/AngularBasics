import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://api.github.com/users';

  constructor(private httpClient: HttpClient) { }

  getUsers(maxUsers: number = 10): Observable<object> {
    return this.httpClient.get(`${this.apiUrl}?per_page=${maxUsers}`);
  }

  getUser(username: string): Observable<object> {
    return this.httpClient.get(`${this.apiUrl}/${username}`);
  }
}
