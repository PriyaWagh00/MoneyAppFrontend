// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8084/api';  // Backend API URL

  constructor(private http: HttpClient) {}

 // auth.service.ts
signup(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, user)
      .pipe(
          catchError((error) => {
              console.error('Signup error:', error);  // Log the error for debugging
              return throwError(error);
          })
      );
}

login(credentials: any, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
          catchError((error) => {
              console.error('Login error:', error);  // Log the error for debugging
              return throwError(error);
          })
      );
}

}
