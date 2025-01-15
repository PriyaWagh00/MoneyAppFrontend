// import { Component, OnInit } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { UserService } from '../user.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterModule,CommonModule],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent implements OnInit {
//   username: string | null = null;

//   constructor(private userService: UserService,private router:Router) {}

//   ngOnInit(): void {
   
//     this.userService.currentUsername.subscribe((username) => {
//       this.username = username;
//     });
//   }
//   logout(){
//     this.router.navigate(['/login']);
//     alert("logout done");
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';
import { Notification } from '../notification/models/notification'; // Import Notification interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  notifications: Notification[] = []; // Store notifications
  unreadCount: number = 0; // Track unread notifications count
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUsername.subscribe((username) => {
      this.username = username;
    });

    // Subscribe to unread notifications count from the notification service
    this.notificationService.getUnreadCount().subscribe((count) => {
      this.unreadCount = count;
    });

    this.loadNotifications(); // Load notifications when component is initialized
  }

  // Open the notification component and navigate to the notifications page
  openNotificationComponent(): void {
    this.router.navigate(['/notifications']);  // Navigate to the notifications page
  }

  // Fetch the notifications and unread count for the logged-in user
  loadNotifications(): void {
    const userId = this.getUserId();
    if (userId === null) {
      this.errorMessage = 'User not logged in.';
      return;
    }

    this.notificationService.getNotifications(userId).subscribe({
      next: (data: Notification[]) => {
        console.log('Notifications:', data); // Debugging
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

  // Mark all notifications as read
  markAsRead(): void {
    const userId = this.getUserId();
    if (userId === null) {
      this.errorMessage = 'User not logged in.';
      return;
    }

    this.notificationService.markAsRead(userId).subscribe({
      next: () => {
        this.notifications.forEach((notification: Notification) => notification.read = true); // Mark notifications as read
        this.unreadCount = 0;
      },
      error: (err) => {
        this.errorMessage = 'Error marking notifications as read.';
        console.error('Error marking notifications as read:', err);
      },
    });
  }

  // Get the user ID from session storage
  private getUserId(): number | null {
    const userId = window.sessionStorage.getItem('senderId');
    return userId ? parseInt(userId, 10) : null;
  }

  // Logout the user and navigate to the login page
  logout(): void {
    this.router.navigate(['/login']);
    alert('Logout done');
  }
}



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'] // Corrected the property name
// })
// export class HeaderComponent implements OnInit {
//   username: string | null = null;

//   constructor(private userService: UserService, private router: Router) {}

//   ngOnInit(): void {
//     // Fetch the username from localStorage if the page is refreshed
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       this.username = storedUsername;
//     }

//     // Subscribe to username updates
//     this.userService.currentUsername.subscribe((username) => {
//       this.username = username;

//       // Store the username in localStorage
//       if (username) {
//         localStorage.setItem('username', username);
//       }
//     });
//   }

//   logout(): void {
//     // Clear username from both localStorage and UserService
//     this.username = null;
//     localStorage.removeItem('username');
//     this.userService.setUsername(null);

//     // Redirect to login page
//     this.router.navigate(['/login']);
//   }
// }
