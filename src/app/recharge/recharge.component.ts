import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RechargeService } from '../recharge.service';
import { TService } from '../t.service';

@Component({
  selector: 'app-recharge',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css'
})
export class RechargeComponent {
  mobileNumber: string = '';
  userName: string = '';
  mobileError: string = '';
  selectedProvider: string = '';
  plans: any[] = [
    { planId: 1, planName: '₹239 Plan - 1.5GB/day for 28 days', price: 239 },
    { planId: 2, planName: '₹300 Plan - 2GB/day for 28 days', price: 300 },
    { planId: 3, planName: '₹400 Plan - 3GB/day for 56 days', price: 400 },
  ];
  message: string = '';
  userId: number = 1; // Declare and assign a static value or dynamically assign as needed

  constructor(private rechargeService: RechargeService, private rechargeServic: TService) {}

  onMobileInput(): void {
    // Your logic for mobile number input validation and fetching username
  }

  fetchPlans(): void {
    if (this.selectedProvider) {
      this.getPlans(this.selectedProvider);
    }
  }

  getPlans(provider: string): void {
    this.rechargeService.getPlans(provider).subscribe(
      (plans) => {
        this.plans = plans;
      },
      (error) => {
        console.error('Error fetching plans:', error);
      }
    );
  }

 
}
