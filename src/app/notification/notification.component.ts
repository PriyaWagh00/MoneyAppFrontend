import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { CommonModule } from '@angular/common';
import { Notification } from '../notification/models/notification';  // Import the Notification interface

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];  // Store the notifications as an array of Notification type
  errorMessage: string | null = null;
  unreadCount: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    const userId = this.getUserId();
    if (userId === null) {
      this.errorMessage = 'User not logged in.';
      return;
    }
  
    this.notificationService.getNotifications(userId).subscribe({
      next: (data: Notification[]) => {
        console.log('Notifications:', data);  // Debugging
        this.notifications = data;
        this.unreadCount = data.filter(notification => !notification.read).length;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching notifications.';
        console.error('Error fetching notifications:', err);
      },
    });
  }
  

  markAsRead(): void {
    const userId = this.getUserId();
    if (userId === null) {
      this.errorMessage = 'User not logged in.';
      return;
    }
  
    this.notificationService.markAsRead(userId).subscribe({
      next: () => {
        this.notifications.forEach((notification: Notification) => notification.read = true);  // Type notification as Notification
        this.unreadCount = 0;
      },
      error: (err) => {
        this.errorMessage = 'Error marking notifications as read.';
        console.error('Error marking notifications as read:', err);
      },
    });
  }
  

  openNotificationComponent(): void {
    this.loadNotifications();  // Reload notifications when the bell icon is clicked
  }

  private getUserId(): number | null {
    const userId = window.sessionStorage.getItem('senderId');
    return userId ? parseInt(userId, 10) : null;
  }
}
