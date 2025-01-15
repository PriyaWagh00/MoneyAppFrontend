import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { WalletComponent } from "../wallet/wallet.component";
import { MoneyTransferComponent } from "../money-transfer/money-transfer.component";
import { PfferComponent } from "../pffer/pffer.component";
import { QuickActionComponent } from "../quick-action/quick-action.component";
import { CategoriesComponent } from "../categories/categories.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/home'; // Check if the current route is 'home'
    });
  }
}