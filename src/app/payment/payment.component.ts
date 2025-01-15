// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-payment',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './payment.component.html',
//   styleUrl: './payment.component.css'
// })
// export class PaymentComponent implements OnInit {
//   user: any; // To hold the selected user's data
//   amount: number = 0;
//   pin: string = '';
//   showPinInput: boolean = false;
//   showDoneMessage: boolean = false;

//   // Dummy PIN for validation
//   private correctPin = '1234';

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     // Get the selected user data passed from the previous page
//     this.user = history.state.user;
//   }

//   // Method to handle the payment process after pin validation
//   pay() {
//     if (this.amount > 0) {
//       // Ask for PIN if not entered yet
//       if (!this.showPinInput) {
//         this.showPinInput = true;
//         return;
//       }

//       // Validate PIN
//       if (this.pin === this.correctPin) {
//         this.showDoneMessage = true;
//         setTimeout(() => {
//           this.showDoneMessage = false;
//           console.log('Payment Successful to', this.user.name, 'Amount:', this.amount);
//         }, 2000); // Show "Done" for 2 seconds
//       } else {
//         alert('Incorrect PIN. Please try again.');
//       }
//     } else {
//       alert('Please enter a valid amount.');
//     }
//   }
// }




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TService } from '../t.service';

@Component({
  selector: 'app-payment',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  user: any; // Selected user's data
  amount: number = 0; // Amount to be transferred
  pin: string = ''; // User-entered PIN
  message: string = ''; // Feedback message
  showPinInput: boolean = false; // Show PIN input field
  isLoading: boolean = false; // Show loading indicator during transaction

  private correctPin = '1234'; // Dummy PIN for validation
  private senderId: number | null = null; // Logged-in user ID

  constructor(private userService: UserService, private router: Router,private userservic:TService) {}

  ngOnInit(): void {
    // Get the logged-in user ID from session
    const loggedInSenderId = sessionStorage.getItem('senderId');
    if (loggedInSenderId) {
      this.senderId = parseInt(loggedInSenderId, 10);
    } else {
      this.message = 'User not logged in!';
      this.router.navigate(['/login']);
    }

    // Get the selected user data passed from the previous page
    this.user = history.state.user;
  }

  // Request PIN for transaction
  requestPin(): void {
    if (this.amount > 0) {
      this.showPinInput = true; // Show PIN input field
    } else {
      this.message = 'Please enter a valid amount.';
    }
  }

  // Transfer money
  pay(): void {
    if (!this.pin || this.pin !== this.correctPin) {
      this.message = 'Invalid PIN. Transaction cancelled.';
      return;
    }

    if (this.senderId && this.user?.mobile && this.amount > 0) {
      this.isLoading = true; // Show loading indicator

      this.userservic
        .transferMoneyByMobile(this.senderId, this.user.mobile, this.amount)
        .subscribe({
          next: (response) => {
            this.message = response.message || 'Transaction successful!';
            this.isLoading = false; // Hide loading indicator
            setTimeout(() => {
              this.router.navigate(['/transfer']); // Redirect after success
            }, 2000);
          },
          error: (error) => {
            console.error('Transaction Error:', error);
            this.message = error.error?.message || 'Transaction failed!';
            this.isLoading = false; // Hide loading indicator
          },
        });
    } else {
      this.message = 'Transaction details are incomplete.';
    }
  }
}
