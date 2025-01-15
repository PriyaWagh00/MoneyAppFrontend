// import { Component } from '@angular/core';
// import { UseService } from '../use.service'; // Custom service for transactions
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-quick-action',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './quick-action.component.html',
//   styleUrls: ['./quick-action.component.css'] // Fix typo: `styleUrl` -> `styleUrls`
// })
// export class QuickActionComponent {
//   receiverId: number = 0; // ID of the recipient
//   amount: number = 0; // Amount to send
//   transactionHistory: any = { sent: [], received: [] }; // Sent and received transaction history

//   constructor(private transactionService: UseService) {}

//   ngOnInit(): void {
//     this.getTransactionHistory(); // Fetch transaction history on load
//   }

//   // Method to send money
//   sendMoney(): void {
//     const loggedInUserId = parseInt(localStorage.getItem('loggedInUserId') || '0'); // Retrieve the logged-in user ID
//     if (!loggedInUserId) {
//       alert('User not logged in.');
//       return;
//     }

//     const transactionData = {
//       senderId: loggedInUserId,
//       receiverId: this.receiverId,
//       amount: this.amount,
//     };

//     this.transactionService.sendMoney(transactionData).subscribe({
//       next: (response) => {
//         alert('Transaction successful!');
//         this.getTransactionHistory(); // Refresh transaction history
//       },
//       error: (error) => {
//         console.error('Transaction error:', error);
//         alert(error.error || 'Transaction failed.');
//       },
//     });
//   }

//   // Method to fetch transaction history
//   getTransactionHistory(): void {
//     const loggedInUserId = parseInt(localStorage.getItem('loggedInUserId') || '0'); // Retrieve the logged-in user ID
//     if (!loggedInUserId) {
//       alert('User not logged in.');
//       return;
//     }

//     this.transactionService.getTransactionHistory(loggedInUserId).subscribe({
//       next: (response) => {
//         this.transactionHistory = response; // Update transaction history
//       },
//       error: (error) => {
//         console.error('Error fetching transaction history:', error);
//       },
//     });
//   }
// }



import { Component } from '@angular/core';
import { UseService } from '../use.service'; // Custom service for transactions
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TraService } from '../tra.service';

@Component({
  selector: 'app-quick-action',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.css'] // Fix typo: `styleUrl` -> `styleUrls`
})
export class QuickActionComponent {
  senderId: number = 0;
  receiverId: number = 0;
  amount: number = 0;
  transactionMessage: string = '';
  transactionHistory: any[] = [];
  userId: number = 0;

  constructor(private transactionService: TraService) {}

  // Handle money transfer
  transferMoney(): void {
    const data = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      amount: this.amount
    };

    this.transactionService.transferMoney(data).subscribe({
      next: (response) => {
        this.transactionMessage = response;
        this.fetchTransactionHistory(); // Update the transaction history after transfer
      },
      error: (error) => {
        this.transactionMessage = error.error || 'An error occurred.';
      }
    });
  }

  // Fetch transaction history
  fetchTransactionHistory(): void {
    if (this.userId) {
      this.transactionService.getTransactionHistory(this.userId).subscribe({
        next: (response) => {
          this.transactionHistory = response;
        },
        error: (error) => {
          this.transactionMessage = error.error || 'Unable to fetch transaction history.';
        }
      });
    } else {
      this.transactionMessage = 'Please enter a valid User ID.';
    }
  }
}