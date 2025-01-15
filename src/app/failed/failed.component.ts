import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed',
  standalone: true,
  imports: [],
  templateUrl: './failed.component.html',
  styleUrl: './failed.component.css'
})
export class FailedComponent {
  message: string = 'Your transaction could not be completed. Please try again later.';

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/home']); // Redirect to home page or transaction history page
  }
}