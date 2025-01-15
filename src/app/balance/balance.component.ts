// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-balance',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './balance.component.html',
//   styleUrls: ['./balance.component.css'], // Fixed 'styleUrl' typo
// })
// export class BalanceComponent implements OnInit {
//   balance: number | null = null; // To store the balance
//   userId: number | null = null; // Store logged-in user ID

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     // Fetch user ID from sessionStorage
//     const storedUserId = sessionStorage.getItem('senderId');
//     this.userId = storedUserId ? parseInt(storedUserId, 10) : null;

//     if (this.userId) {
//       this.getBalance();
//     } else {
//       console.error('User ID not found. Please log in.');
//     }
//   }

//   getBalance(): void {
//     if (!this.userId) return;

//     this.http.get<{ balance: number }>(`http://localhost:8083/api/users/${this.userId}/balance`)
//       .subscribe({
//         next: (response) => {
//           this.balance = response.balance;
//         },
//         error: (err) => {
//           console.error('Error fetching balance:', err);
//           this.balance = null; // Reset balance on error
//         }
//       });
//   }
// }

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'], // Updated to include CSS styles
})
export class BalanceComponent implements OnInit {
  balance: number | null = null; // To store the balance
  userId: number | null = null; // Store logged-in user ID
  pin: string = ''; // PIN entered by the user
  correctPin: string = '1234'; // Hardcoded PIN for now
  pinVerified: boolean = false; // Whether the PIN is correct
  showSuccessMark: boolean = false; // To display checkmark on success

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch user ID from sessionStorage
    const storedUserId = sessionStorage.getItem('senderId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;

    if (!this.userId) {
      console.error('User ID not found. Please log in.');
    }
  }

  verifyPin(): void {
    if (this.pin === this.correctPin) {
      this.pinVerified = true;
      this.getBalance();
    } else {
      alert('Incorrect PIN. Please try again.');
    }
  }

  getBalance(): void {
    if (!this.userId) return;

    this.http.get<{ balance: number }>(`http://localhost:8083/api/users/${this.userId}/balance`)
      .subscribe({
        next: (response) => {
          this.balance = response.balance;
          this.showSuccessMark = true; // Show success checkmark
        },
        error: (err) => {
          console.error('Error fetching balance:', err);
          this.balance = null; // Reset balance on error
        },
      });
  }
}

