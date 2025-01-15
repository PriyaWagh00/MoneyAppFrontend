// import { Component, OnInit } from '@angular/core';
// import { TService } from '../t.service';
// import { UserService } from '../user.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-cat',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cat.component.html',
//   styleUrls: ['./cat.component.css']
// })
// export class CatComponent implements OnInit {
//   users: any[] = []; // List of users (excluding the logged-in user)
//   senderId: string | null = ''; // Sender's ID
//   receiverId: number | undefined; // Receiver's ID
//   amount: number | undefined; // Amount to transfer
//   pin: string = ''; // Pin for transaction
//   errorMessage: string = ''; // Error message
//   successMessage: string = ''; // Success message

//   constructor(
//     private userService: UserService,
//     private transactionService: TService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.senderId = sessionStorage.getItem('senderId'); // Fetch senderId from sessionStorage

//     if (!this.senderId) {
//       this.errorMessage = 'No sender ID found in session.';
//       return;
//     }

//     // Parse senderId into a number (it might be a string from sessionStorage)
//     const senderIdNumber = Number(this.senderId);
//     if (isNaN(senderIdNumber)) {
//       this.errorMessage = 'Invalid sender ID.';
//       return;
//     }

//     // Fetch the list of users (excluding the logged-in user)
//     this.userService.getAllUsers().subscribe((data) => {
//       this.users = data.filter((user) => user.id !== senderIdNumber); // Exclude the logged-in user
//     });
//   }

//   // Trigger the pay process
//   initiatePayment(receiver: any): void {
//     this.receiverId = receiver.id; // Set receiver ID
//     const amount = prompt('Enter the amount to transfer:');
//     if (amount) {
//       this.amount = parseFloat(amount);

//       if (isNaN(this.amount) || this.amount <= 0) {
//         this.errorMessage = 'Please enter a valid amount.';
//         return;
//       }

//       // Ask for pin before proceeding with the transaction
//       const enteredPin = prompt('Enter your PIN to confirm the transaction:');
//       if (enteredPin === '1234') {  // Example: Static PIN '1234'
//         this.confirmTransaction();
//       } else {
//         this.errorMessage = 'Invalid PIN. Transaction canceled.';
//       }
//     }
//   }

//   // Confirm the transaction and perform the money transfer
//   confirmTransaction(): void {
//     if (this.senderId && this.receiverId && this.amount) {
//       const transactionRequest = {
//         senderId: this.senderId,
//         receiverId: this.receiverId,
//         amount: this.amount
//       };

//       // Call the backend API to process the transaction
//       this.transactionService.transferMoney(transactionRequest).subscribe(
//         (response) => {
//           this.successMessage = 'Transaction successful!';
//           this.router.navigate(['/home']); // Redirect after successful transaction
//         },
//         (error) => {
//           this.errorMessage = error.error || 'Transaction failed. Please try again.';
//         }
//       );
//     } else {
//       this.errorMessage = 'Missing transaction details. Please try again.';
//     }
//   }
// }
