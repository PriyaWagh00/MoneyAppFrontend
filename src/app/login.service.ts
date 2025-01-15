// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8084/api/login';  // Your backend URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginRequest = { email, password };
    return this.http.post<any>(this.apiUrl, loginRequest);
  }
}
