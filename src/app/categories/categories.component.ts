

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
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
          // this.router.navigate(['/home']);
          alert('payment done');
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || 'An Error Occure';
          this.message = 'Error: ' + errorMessage;
        }
      });
    } else {
      this.message = 'Please provide valid inputs for receiver ID and amount.';
    }
  }
  
  onLogout(): void {
    sessionStorage.clear(); // Clear session
    this.message = 'Logged out successfully!';
    alert("logout done");
    this.router.navigate(['/login']); // Redirect to login page
  }
}







