// // import { Component, OnInit } from '@angular/core';
// // import { TransactionService } from '../transaction.service';
// import { CommonModule } from '@angular/common';
// import { HistoryService } from '../history.service';
// import { Component, OnInit } from '@angular/core';
// // import { TransferService } from '../transfer.service';

// @Component({
//   selector: 'app-history',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './history.component.html',
//   styleUrl: './history.component.css'
// })
// export class HistoryComponent  implements OnInit {
//   transactions: any[] = [];
//   errorMessage: string | null = null;

//   constructor(private transactionService:HistoryService) {}

//   ngOnInit(): void {
//     const userId = sessionStorage.getItem('senderId'); // Fetch logged-in user ID from sessionStorage
//     if (userId) {
//       this.loadTransactionHistory(parseInt(userId, 10));
//     } else {
//       this.errorMessage = 'User not logged in.';
//     }
//   }

//   loadTransactionHistory(userId: number): void {
//     this.transactionService.getTransactionHistory(userId).subscribe({
//       next: (data) => {
//         this.transactions = data;
//       },
//       error: (err) => {
//         this.errorMessage = 'Error fetching transaction history.';
//         console.error(err);
//       }
//     });
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HistoryService } from '../history.service';

// @Component({
//   selector: 'app-history',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './history.component.html',
//   styleUrls: ['./history.component.css'],
// })
// export class HistoryComponent implements OnInit {
//   transactions: any[] = [];
//   errorMessage: string | null = null;

//   constructor(private historyService: HistoryService) {}

//   ngOnInit(): void {
//     const userId = sessionStorage.getItem('senderId'); // Fetch logged-in user ID
//     if (userId) {
//       this.getTransactionHistory(parseInt(userId, 10));
//     } else {
//       this.errorMessage = 'User not logged in.';
//     }
//   }

//   getTransactionHistory(userId: number): void {
//     this.historyService.getTransactionHistory(userId).subscribe({
//       next: (data) => {
//         this.transactions = this.removeDuplicates(data); // Remove duplicates before assigning
//       },
//       error: (err) => {
//         this.errorMessage = 'Error fetching transaction history.';
//         console.error(err);
//       },
//     });
//   }

//   // Function to remove duplicate transactions
//   private removeDuplicates(transactions: any[]): any[] {
//     const uniqueTransactions = new Map(); // Map to store unique transactions
//     transactions.forEach((transaction) => {
//       const uniqueKey = `${transaction.timestamp}-${transaction.amount}-${transaction.type}-${transaction.to}`;
//       uniqueTransactions.set(uniqueKey, transaction); // Overwrite if duplicate
//     });
//     return Array.from(uniqueTransactions.values()); // Convert back to an array
//   }
  
// }






import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../history.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  transactions: any[] = [];
  errorMessage: string | null = null;

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('senderId'); // Fetch logged-in user ID
    if (userId) {
      this.getTransactionHistory(parseInt(userId, 10));
    } else {
      this.errorMessage = 'User not logged in.';
    }
  }

  // getTransactionHistory(userId: number): void {
  //   this.historyService.getTransactionHistory(userId).subscribe({
  //     next: (data) => {
  //       this.transactions = this.removeDuplicates(data); // Remove duplicates before assigning
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Error fetching transaction history.';
  //       console.error(err);
  //     },
  //   });
  // }



  // getTransactionHistory(userId: number): void {
  //   this.historyService.getTransactionHistory(userId).subscribe({
  //     next: (data) => {
  //       this.transactions = this.removeDuplicates(data); // Remove duplicates before assigning
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Error fetching transaction history.';
  //       console.error(err);
  //     },
  //   });
  // }

  getTransactionHistory(userId: number): void {
    this.historyService.getTransactionHistory(userId).subscribe({
      next: (data) => {
        // If the backend already sends the failed transactions properly, use this directly
        this.transactions = this.removeDuplicates(data);
      },
      error: (err) => {
        this.errorMessage = 'Error fetching transaction history.';
        console.error(err);
      },
    });
  }
  
  

  // Function to remove duplicate transactions
  // private removeDuplicates(transactions: any[]): any[] {
  //   const uniqueTransactions = new Map(); // Map to store unique transactions
  //   transactions.forEach((transaction) => {
  //     const uniqueKey = `${transaction.timestamp}-${transaction.amount}-${transaction.type}-${transaction.to}`;
  //     uniqueTransactions.set(uniqueKey, transaction); // Overwrite if duplicate
  //   });
  //   return Array.from(uniqueTransactions.values()); // Convert back to an array
  // }


  private removeDuplicates(transactions: any[]): any[] {
    const uniqueTransactions = new Map<string, any>(); // Use a map for uniqueness
    transactions.forEach((transaction) => {
      const uniqueKey = `${transaction.timestamp}-${transaction.amount}-${transaction.type}-${transaction.to || transaction.from}`;
      uniqueTransactions.set(uniqueKey, transaction); // Overwrite if duplicate
    });
    return Array.from(uniqueTransactions.values());
  }
  

  // Function to download the transaction history as a PDF file
//   downloadStatementPDF(): void {
//     const doc = new jsPDF();
    
//     // Title
//     doc.setFontSize(18);
//     doc.text('Transaction History', 20, 20);

//     // Set font for the table content
//     doc.setFontSize(12);

//     // Table headers
//     const headers = ['Type', 'Timestamp', 'From/To', 'Amount'];
//     let yPosition = 30;  // Starting Y position for the table
    
//     // Header row
//     doc.text(headers[0], 20, yPosition);
//     doc.text(headers[1], 60, yPosition);
//     doc.text(headers[2], 120, yPosition);
//     doc.text(headers[3], 180, yPosition);
    
//     // Increase Y position for the data rows
//     yPosition += 10;
    
//     // Add table content rows
//     this.transactions.forEach(transaction => {
//       doc.text(transaction.type, 20, yPosition);
//       doc.text(new Date(transaction.timestamp).toLocaleString(), 60, yPosition);
//       doc.text(transaction.type === 'Sent' ? transaction.to : transaction.from, 120, yPosition);
//       doc.text(transaction.amount.toString(), 180, yPosition);
//       yPosition += 10;
//     });

//     // Save the generated PDF file
//     doc.save('transaction-history.pdf');
//   }
// }


downloadStatementPDF(): void {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.text('Transaction History', 20, 20);

  // Set font for the table content
  doc.setFontSize(12);

  // Table headers
  const headers = ['Type', 'Timestamp', 'From/To', 'Amount', 'Status'];
  let yPosition = 30; // Starting Y position for the table
  
  // Header row
  headers.forEach((header, index) => {
    doc.text(header, 20 + index * 40, yPosition);
  });
  
  // Increase Y position for the data rows
  yPosition += 10;
  
  // Add table content rows
  this.transactions.forEach(transaction => {
    const type = transaction.status === 'FAILED' ? 'Failed' : transaction.type;
    const fromTo = transaction.status === 'FAILED' ? `Reason: ${transaction.reason}` : (transaction.type === 'Sent' ? transaction.to : transaction.from);
    doc.text(type, 20, yPosition);
    doc.text(new Date(transaction.timestamp).toLocaleString(), 60, yPosition);
    doc.text(fromTo, 120, yPosition);
    doc.text(transaction.amount.toString(), 180, yPosition);
    yPosition += 10;
  });

  // Save the generated PDF file
  doc.save('transaction-history.pdf');
}
}