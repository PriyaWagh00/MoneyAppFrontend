import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private apiUrl = 'http://localhost:8083/api/transactions';

  constructor(private http: HttpClient) {}

  transferMoney(senderId: number, receiverId: number, amount: number): Observable<any> {
    const payload = { senderId, receiverId, amount };
    return this.http.post(`${this.apiUrl}/transfer`, payload);
  }

  getTransactionHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history/${userId}`);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class TransferService {
//   private apiUrl = 'http://localhost:8083/api/payments'; // URL of your backend API for payments

//   constructor(private http: HttpClient) {}

//   processPayment(paymentData: any) {
//     return this.http.post(`${this.apiUrl}/process`, paymentData).pipe(
//       catchError((error) => {
//         console.error('Error processing payment:', error);
//         return throwError(() => new Error(error.error || 'Payment failed.'));
//       })
//     );
//   }
// }
