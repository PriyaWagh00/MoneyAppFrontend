// // src/app/transaction.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TransactionService {

//   private apiUrl = 'http://localhost:8083/api/transactions/transfer'; // Replace with your backend URL

//   constructor(private http: HttpClient) { }

//   // Send money API call
//   transferMoney(senderId: number, receiverId: number, amount: number): Observable<any> {
//     const body = { senderId, receiverId, amount };
//     return this.http.post(this.apiUrl, body);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8083/api/transactions/transfer'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Send money API call
  transferMoney(senderId: number, receiverId: number, amount: number): Observable<any> {
    const body = { senderId, receiverId, amount };
    return this.http.post(this.apiUrl, body);
  }
}
