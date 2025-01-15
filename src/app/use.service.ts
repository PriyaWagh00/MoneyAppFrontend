import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UseService {
  private usernameSource = new BehaviorSubject<string | null>(null);
  currentUsername = this.usernameSource.asObservable();

  private baseUrl = 'http://localhost:8083/api/transactions'; // Backend URL

  constructor(private http: HttpClient) {}

  // API call to send money
  sendMoney(transactionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-money`, transactionData);
  }

  // API call to fetch transaction history
  getTransactionHistory(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/history/${userId}`);
  }

  setUsername(username: string | null) {
    this.usernameSource.next(username);
  }

}
