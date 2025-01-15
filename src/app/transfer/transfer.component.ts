// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../user.service';
// import { Router, RouterModule } from '@angular/router';
// import { SharedataService } from '../sharedata.service';

// @Component({
//   selector: 'app-transfer',
//   standalone: true,
//   imports: [CommonModule,RouterModule],
//   templateUrl: './transfer.component.html',
//   styleUrl: './transfer.component.css'
// })
// export class TransferComponent implements OnInit {
//   users: any[] = [];

//   constructor(private userService: UserService, private router: Router,private sharedDataService: SharedataService) {}



// ngOnInit(): void {
//   // Fetch the list of users from the backend
//   this.userService.getAllUsers().subscribe((data) => {
//     this.users = data;
//   });
// }


//   transferMoney(user: any): void {
//     this.router.navigate(['/payment'], { state: { user } });
//   }

//   // transferMoney(user: any): void {
//   //   console.log('Selected user:', user);  // Ensure this logs the selected user object
//   //   this.router.navigate(['/payment'], { state: { user } });
//   // }
  
// }





import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the list of users from the backend
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Navigate to the payment page with the selected user's data
  transferMoney(user: any): void {
    this.router.navigate(['/payment'], { state: { user } });
  }
}
