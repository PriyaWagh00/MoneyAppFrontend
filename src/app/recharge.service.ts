import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RechargeService {
  private apiUrl = 'http://localhost:8083/api/plans'; // Backend URL

  constructor(private http: HttpClient) {}

  getPlans(provider: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?provider=${provider}`);
  }
}
