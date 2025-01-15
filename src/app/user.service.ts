import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8083/api/users';



  private usernameSource = new BehaviorSubject<string | null>(null); 
  currentUsername = this.usernameSource.asObservable(); 

  // constructor(private http: HttpClient) {}



  constructor(private http: HttpClient) {
    // Check if there is a username saved in localStorage on app initialization
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameSource.next(storedUsername);
    }
  }



  // transferMoneyByMobile(
  //   senderId: number,
  //   receiverMobile: string,
  //   amount: number
  // ): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/transfer`, {
  //     senderId,
  //     receiverMobile,
  //     amount,
  //   });
  // }



  // isBrowser(): boolean {
  //   return typeof window !== 'undefined';
  // }



  



  signup(user: any): Observable<any> {
    console.log('Sending signup request:', user); 
    return this.http.post(`${this.apiUrl}/signup`, user, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error during signup:', error); 
        const errorMsg = error.error || 'Signup failed.'; 
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      catchError((error) => {
        console.error('Error during login:', error); // Log backend error
        const errorMsg = error.error || 'Login failed.';
        return throwError(() => new Error(errorMsg));
      })
    );
  }
  
// 
private senderIdSubject = new BehaviorSubject<number | null>(null);

setSenderId(senderId: number | null): void {
  sessionStorage.setItem('senderId', senderId?.toString() || '');
  this.senderIdSubject.next(senderId);
}

// Get the current sender ID
getSenderId(): number | null {
  const senderId = sessionStorage.getItem('senderId');
  return senderId ? parseInt(senderId, 10) : null;
}


clearUserData(): void {
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('senderId');
  this.senderIdSubject.next(null);
}





setUsername(username: string | null) {
  this.usernameSource.next(username); // Update the username
}



  googleLogin(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/google-login`, { token }).pipe(
      catchError((error) => {
        console.error('Google login error:', error);
        return throwError(() => new Error(error.error || 'Google login failed.'));
      })
    );
  }
  googleSignupOrLogin(token: string): Observable<any> {
    // Send the Google token to your backend for verification and login/signup
    return this.http.post(`${this.apiUrl}/google-signup-login`, { token });
  }
  forgotPassword(email: string) {
    return this.http.post('http://localhost:8083/api/users/forgot-password', { email });
  }
  // Fetch all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-all-users`).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error(error.error || 'Failed to fetch users.'));
      })
    );
  }

  getUserBalance(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/balance`);
  }


  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // getAllUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/get-all-users`).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching users:', error); // Log the error in the console
  //       return throwError(() => new Error(error.error || 'Failed to fetch users.'));
  //     })
  //   );
  // }
  
  // transferMoney(transactionData: any) {
  //   return this.http.post(`${this.apiUrl}/transfer`, transactionData, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   }).pipe(
  //     catchError((error) => {
  //       console.error('Error during money transfer:', error);
  //       const errorMsg = error.error || 'Transaction failed.';
  //       return throwError(() => new Error(errorMsg));
  //     })
  //   );
  // }
}
