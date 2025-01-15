

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TService } from '../t.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
})
export class MobileComponent {
  senderId: number | null = null; // Logged-in user ID
  receiverMobile: string = '+91 '; // Receiver's mobile number
  receiverName: string = ''; // Receiver's name fetched from the backend
  amount: number = 0; // Amount to be transferred
  pin: string = ''; // User-entered PIN
  message: string = ''; // Feedback message for user
  isPinRequired: boolean = false; // Flag to show/hide PIN input



    // isPinRequired: boolean = false; // Toggle to show/hide PIN input
  isDialpadVisible: boolean = false; // Toggle for dialpad visibility
  dialpad: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  isDragging = false;
  startX = 0;
  startY = 0;
  initialLeft = 0;
  initialTop = 0;

  constructor(private transactionService: TService, private router: Router) {}

  ngOnInit() {
    const loggedInSenderId = sessionStorage.getItem('senderId');
    if (loggedInSenderId) {
      this.senderId = parseInt(loggedInSenderId, 10);
    } else {
      this.message = 'User not logged in!';
      this.router.navigate(['/login']);
    }
  }

  // Fetch username when mobile number changes
  onMobileInput(): void {
    if (this.receiverMobile.length >= 10) {
      const mobileNumber = this.receiverMobile.startsWith('+91')
        ? this.receiverMobile.trim()
        : `+91 ${this.receiverMobile.trim()}`;

      console.log('Sending Mobile Number to Backend:', mobileNumber);

      this.transactionService.getUsernameByMobile(mobileNumber).subscribe({
        next: (response: any) => {
          console.log('Response from Backend:', response);
          if (response && response.name) {
            this.receiverName = response.name; // Display the username
          } else {
            this.receiverName = 'User not found';
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error from Backend:', error);
          if (error.status === 404) {
            this.receiverName = 'User not found';
          } else {
            this.receiverName = 'Error fetching username';
          }
        },
      });
    } else {
      this.receiverName = ''; // Clear username if mobile number is invalid
    }
  }

  // Request PIN for transaction
  requestPin(): void {
    if (this.senderId && this.receiverMobile && this.amount > 0) {
      if (this.receiverName && this.receiverName !== 'User not found') {
        this.isPinRequired = true; // Show PIN input if all inputs are valid
      } else {
        this.message = 'Receiver information is incomplete.';
      }
    } else {
      this.message = 'Please provide valid inputs for receiver mobile and amount.';
    }
  }

  // Transfer money
  onTransferMoney(): void {
    if (!this.pin || this.pin !== '1234') {
      this.message = 'Invalid PIN. Transaction cancelled.';
      return;
    }

    this.transactionService.transferMoneyByMobile(this.senderId!, this.receiverMobile, this.amount).subscribe({
      next: (response: any) => {
        if (response && response.status === 'success') {
          this.message = response.message || 'Transaction successful!';
          this.resetForm();
        } else {
          this.message = response.message || 'Transaction ';
        }
      },
      error: (error: HttpErrorResponse) => {
        const backendMessage = error.error?.message;
        this.message = backendMessage || 'Transaction --.';
      },
    });
  }



  // onTransferMoney(): void {
  //   if (!this.pin || this.pin !== '1234') {
  //     this.message = 'Invalid PIN. Transaction cancelled.';
  //     return;
  //   }

  //   this.transactionService.transferMoneyByMobile(this.senderId!, this.receiverMobile, this.amount).subscribe({
  //     next: (response: any) => {
  //       if (response && response.status === 'success') {
  //         this.message = response.message || 'Transaction successful!';
  //         this.resetForm();
  //       } else if (response.status === 'FAILED') {
  //         this.message = response.message || 'Transaction failed due to insufficient funds.';
  //         this.router.navigate(['/failed']); // Redirect to the failed page
  //       }
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       const backendMessage = error.error?.message;
  //       this.message = backendMessage || 'Transaction failed due to an error.';
  //       this.router.navigate(['/failed']); // Redirect to the failed page
  //     },
  //   });
  // }



  // Reset the form after transaction
  resetForm(): void {
    this.receiverMobile = '+91 ';
    this.receiverName = ''; // Reset username
    this.amount = 0;
    this.pin = '';
    this.isPinRequired = false;
  }

  // Logout logic
  onLogout(): void {
    sessionStorage.clear(); // Clear session
    this.message = 'Logged out successfully!';
    this.router.navigate(['/login']); // Redirect to login page
  }



  // Toggle dialpad visibility
  toggleDialpad() {
    this.isDialpadVisible = !this.isDialpadVisible;
  }

  // Add a number to the mobile input
  addNumber(num: string) {
    this.receiverMobile += num;
  }

  // Start dragging the dialpad
  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;

    const dialpad = document.getElementById('dialpad');
    const rect = dialpad?.getBoundingClientRect();
    this.initialLeft = rect?.left ?? 0;
    this.initialTop = rect?.top ?? 0;

    dialpad?.classList.add('dragging');
  }

  // Stop dragging the dialpad
  stopDrag() {
    this.isDragging = false;
    document.getElementById('dialpad')?.classList.remove('dragging');
  }

  
  dragDialpad(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;

      const dialpad = document.getElementById('dialpad');
      dialpad!.style.left = `${this.initialLeft + deltaX}px`;
      dialpad!.style.top = `${this.initialTop + deltaY}px`;
    }
  }

  
}
