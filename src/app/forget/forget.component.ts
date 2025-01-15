// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ResetComponent } from "../reset/reset.component";
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-forget',
//   standalone: true,
//   imports: [FormsModule, CommonModule,RouterModule],
//   templateUrl: './forget.component.html',
//   styleUrl: './forget.component.css'
// })
// export class ForgetComponent {
//   email: string = '';
//   message: string = '';

//   constructor(private http: HttpClient) {}

//   onForgetPasswordSubmit() {
//     this.http
//       .post('http://localhost:8083/api/auth/forget-password', null, {
//         params: { email: this.email },
//         responseType: 'text',
//       })
//       .subscribe({
//         next: (response) => {
//           this.message = response;
//         },
//         error: (error) => {
//           this.message = 'An error occurred. Please try again later.';
//         },
//       });
//   }
// }





// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-forget',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterModule],
//   templateUrl: './forget.component.html',
//   styleUrl: './forget.component.css',
// })
// export class ForgetComponent {
//   email: string = '';
//   message: string = '';
//   captcha: string = '';
//   captchaInput: string = '';

//   constructor(private http: HttpClient) {
//     this.generateCaptcha(); // Generate CAPTCHA on load
//   }

//   // Generate a simple CAPTCHA (alphanumeric)
//   generateCaptcha(): void {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     this.captcha = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
//     this.captchaInput = ''; // Clear previous input
//   }

//   // Check if CAPTCHA input is valid
//   isCaptchaValid(): boolean {
//     return this.captchaInput === this.captcha;
//   }

//   // Submit form
//   onForgetPasswordSubmit(): void {
//     if (!this.isCaptchaValid()) {
//       this.message = 'Invalid CAPTCHA. Please try again.';
//       return;
//     }

//     this.http
//       .post('http://localhost:8083/api/auth/forget-password', null, {
//         params: { email: this.email },
//         responseType: 'text',
//       })
//       .subscribe({
//         next: (response) => {
//           this.message = response;
//         },
//         error: (error) => {
//           this.message = 'An error occurred. Please try again later.';
//         },
//       });
//   }
// }




import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  email: string = '';
  message: string = '';
  captcha: string = '';
  captchaInput: string = '';
  captchaError: boolean = false; // Flag for CAPTCHA error

  constructor(private http: HttpClient) {
    this.generateCaptcha(); // Generate CAPTCHA on load
  }

  // Generate a simple CAPTCHA (alphanumeric)
  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    this.captchaInput = ''; // Clear previous input
    this.captchaError = false; // Reset CAPTCHA error
  }

  // Check if CAPTCHA input is valid
  isCaptchaValid(): boolean {
    return this.captchaInput === this.captcha;
  }

  // Submit form
  onForgetPasswordSubmit(): void {
    if (!this.isCaptchaValid()) {
      this.captchaError = true; // Set CAPTCHA error flag
      this.message = 'Invalid CAPTCHA. Please try again.';
      return;
    }

    this.captchaError = false; // Clear CAPTCHA error
    this.http
      .post('http://localhost:8083/api/auth/forget-password', null, {
        params: { email: this.email },
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.message = response;
        },
        error: (error) => {
          this.message = 'An error occurred. Please try again later.';
        },
      });
  }
}
