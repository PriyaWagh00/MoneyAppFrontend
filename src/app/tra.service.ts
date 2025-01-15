import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraService {
  private apiUrl = 'http://localhost:8083/api/transactions';

  constructor(private http: HttpClient) {}

  // Transfer money
  transferMoney(data: { senderId: number; receiverId: number; amount: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, data);
  }

  // Get transaction history
  getTransactionHistory(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${userId}`);
  }
}
