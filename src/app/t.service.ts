


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TService {
//   private apiUrl = 'http://localhost:8083/api/transactions/transfer'; // Backend API URL

//   constructor(private http: HttpClient) {}

//   transferMoneyByMobile(senderId: number, receiverMobile: string, amount: number): Observable<any> {
//     const requestPayload = { senderId, receiverMobile, amount };
//     return this.http.post<any>(this.apiUrl, requestPayload);
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TService {
  private apiUrl = 'http://localhost:8083/api/users'; // Base API URL for user-related actions
  private Url = 'http://localhost:8083/api/transactions/transfer';
  constructor(private http: HttpClient) {}

  // // Method to transfer money by mobile
  // transferMoneyByMobile(senderId: number, receiverMobile: string, amount: number): Observable<any> {
  //   const requestPayload = { senderId, receiverMobile, amount };
  //   return this.http.post<any>(`${this.apiUrl}/transfer`, requestPayload);
  // }


    transferMoneyByMobile(senderId: number, receiverMobile: string, amount: number): Observable<any> {
    const requestPayload = { senderId, receiverMobile, amount };
    return this.http.post<any>(this.Url, requestPayload);
  }

  // Method to fetch username by mobile number
  getUsernameByMobile(mobile: string): Observable<any> {
    const url = `http://localhost:8083/api/users/get-username-by-mobile/${mobile}`;
    console.log('API URL:', url); // Log the URL for debugging
    return this.http.get<any>(url);
  }
  
}
