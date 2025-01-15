// import { Component } from '@angular/core';
// import { Router, RouterModule, RouterOutlet } from '@angular/router';
// import { HeaderComponent } from "./header/header.component";
// import { WalletComponent } from "./wallet/wallet.component";
// import { QuickActionComponent } from "./quick-action/quick-action.component";
// import { CategoriesComponent } from "./categories/categories.component";
// import { PfferComponent } from "./pffer/pffer.component";
// import { FooterComponent } from "./footer/footer.component";
// import { MoneyTransferComponent } from "./money-transfer/money-transfer.component";
// import { HomeComponent } from "./home/home.component";
// import { LoginComponent } from "./login/login.component";
// import { CommonModule } from '@angular/common';
// import { MobileComponent } from "./mobile/mobile.component";
// // import { CatComponent } from "./cat/cat.component";


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, RouterModule, HeaderComponent, WalletComponent, QuickActionComponent, PfferComponent, FooterComponent, MoneyTransferComponent, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   isHomePage: boolean = false;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     // Subscribe to route changes
//     this.router.events.subscribe(() => {
//       this.isHomePage = this.router.url === '/home'; // Check if the current route is 'home'
//     });
//   }
// }



import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { WalletComponent } from "./wallet/wallet.component";
import { QuickActionComponent } from "./quick-action/quick-action.component";
import { PfferComponent } from "./pffer/pffer.component";
import { FooterComponent } from "./footer/footer.component";
import { MoneyTransferComponent } from "./money-transfer/money-transfer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    WalletComponent,
    // QuickActionComponent,
    PfferComponent,
    FooterComponent,
    MoneyTransferComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class AppComponent {
  isHomePage: boolean = false;
  isLoginPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to check the current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'home' or 'login'
        this.isHomePage = this.router.url === '/home';
        this.isLoginPage = this.router.url === '/login';
      }
    });
  }
}




// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd, RouterModule } from '@angular/router';
// import { HeaderComponent } from "./header/header.component";
// import { WalletComponent } from "./wallet/wallet.component";
// import { QuickActionComponent } from "./quick-action/quick-action.component";
// import { PfferComponent } from "./pffer/pffer.component";
// import { FooterComponent } from "./footer/footer.component";
// import { MoneyTransferComponent } from "./money-transfer/money-transfer.component";
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     RouterModule,
//     HeaderComponent,
//     WalletComponent,
//     QuickActionComponent,
//     PfferComponent,
//     FooterComponent,
//     MoneyTransferComponent,
//     CommonModule
//   ],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   isHomePage: boolean = false;
//   isLoginPage: boolean = false;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
   
//     const isAuthenticated = this.checkAuthentication();

//     if (!isAuthenticated) {
    
//       this.router.navigate(['/login']);
//     }

  
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.isHomePage = this.router.url === '/home';
//         this.isLoginPage = this.router.url === '/login';
//       }
//     });
//   }

  
//   private checkAuthentication(): boolean {
 
//     const token = localStorage.getItem('authToken');
//     return !!token; 
//   }
// }
