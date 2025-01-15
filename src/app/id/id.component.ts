import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-id',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './id.component.html',
  styleUrl: './id.component.css'
})
export class IdComponent  implements OnInit{
receiverId: number = 0;
  amount: number = 0;
  message: string = '';
  senderId: number | null = null;

  constructor(private transactionService: TransactionService, private router: Router) {}

  ngOnInit() {
    // Check if the user is logged in (session validation)
    const loggedInSenderId = sessionStorage.getItem('senderId');
    if (loggedInSenderId) {
      this.senderId = parseInt(loggedInSenderId, 10);
      // this.router.navigate(['/home']); // Redirect to home if already logged in
    } else {
      this.message = 'User not logged in!';
      this.router.navigate(['/login']); // Redirect to login page if not logged in
    }
  }
  
  onSendMoney(): void {
    console.log('Before Transfer - senderId:', sessionStorage.getItem('senderId'));
  
    if (this.senderId && this.receiverId && this.amount > 0) {
      this.transactionService.transferMoney(this.senderId, this.receiverId, this.amount).subscribe({
        next: (response: any) => {
          this.message = response.message || 'Transaction successful!';
          console.log('After Transfer - senderId:', sessionStorage.getItem('senderId'));
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || 'send.';
          this.message = 's: ' + errorMessage;
        }
      });
    } else {
      this.message = 'Please provide valid inputs for receiver ID and amount.';
    }
  }
  
  onLogout(): void {
    sessionStorage.clear(); // Clear session
    this.message = 'Logged out successfully!';
    this.router.navigate(['/login']); // Redirect to login page
  }
}







