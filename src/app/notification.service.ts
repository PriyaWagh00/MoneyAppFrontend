import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:8083'; // Your backend URL

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications/${userId}`);
  }

  markAsRead(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/mark-as-read/${userId}`, {});
  }

  private unreadCountSubject = new BehaviorSubject<number>(0);

  // constructor() {}

  // Get the current unread count as observable
  getUnreadCount(): Observable<number> {
    return this.unreadCountSubject.asObservable();
  }

  // Set the unread count
  setUnreadCount(count: number): void {
    this.unreadCountSubject.next(count);
  }
}
