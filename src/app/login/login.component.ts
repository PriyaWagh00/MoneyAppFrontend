import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PayComponent } from "../pay/pay.component";
declare const gapi: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule, PayComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {
  loginModel = { email: '', password: '' };
  errorMessage: string | null = null;
  private clientId = '483257834303-f1jj6na7ak0ag64ppjsquumav8ldm6bh.apps.googleusercontent.com'; // Replace with your Google client ID

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadGoogleAPI();
  }

  private loadGoogleAPI(): void {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
  }

  private initializeGoogleSignIn(): void {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: this.clientId,
        scope: 'profile email',
      });
      this.attachSignInHandler(auth2);
    });
  }

  private attachSignInHandler(auth2: any): void {
    const button = document.getElementById('googleSignInButton');
    if (button) {
      auth2.attachClickHandler(
        button,
        {},
        (googleUser: any) => this.handleGoogleSignIn(googleUser),
        (error: any) => {
          console.error('Google Sign-In error:', error);
          this.errorMessage = 'Google Sign-In failed. Please try again.';
        }
      );
    }
  }

  private handleGoogleSignIn(googleUser: any): void {
    const token = googleUser.getAuthResponse().id_token;
    this.userService.googleSignupOrLogin(token).subscribe({
      next: (response: any) => {
        console.log('Google login/signup successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Google login/signup failed:', err);
        this.errorMessage = 'Google login/signup failed. Please try again.';
      },
    });
  }


  
//privious login below

  // onLoginSubmit(): void {
  //   if (this.loginModel.email) {
  //     this.loginModel.email = this.loginModel.email.toLowerCase();
  //   }
  
  //   if (!this.loginModel.email || !this.loginModel.password) {
  //     this.errorMessage = 'Email and password are required';
  //     return;
  //   }
  
  //   this.userService.login(this.loginModel).subscribe({
  //     next: (user) => {
  //       if (user && user.name) {

  //         this.userService.setUsername(user.name);
  //         sessionStorage.setItem('username', user.name);
  //         sessionStorage.setItem('senderId', user.id.toString()); 

  //         sessionStorage.setItem('userRole', user.role); 
         
  //         if (user.role === 'ADMIN') {
  //           this.router.navigate(['/admin']);
  //         } else {
  //           this.router.navigate(['/home']);
  //         }
  //       }
  //     },
  //     error: (err) => {
      
  //       this.errorMessage = err.error || 'Login failed. Please try again.';
  //     },
  //   });
  // }
  

//very imp login


  onLoginSubmit(): void {
    if (this.loginModel.email) {
      this.loginModel.email = this.loginModel.email.toLowerCase();
    }
  
    if (!this.loginModel.email || !this.loginModel.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }
  
    this.userService.login(this.loginModel).subscribe({
      next: (user) => {
        if (user && user.name) {
          this.userService.setUsername(user.name);
  
          // Save user data to sessionStorage
          sessionStorage.setItem('username', user.name);
          sessionStorage.setItem('senderId', user.id.toString()); // Save logged-in user ID
          sessionStorage.setItem('userRole', user.role);
  
          // Navigate based on user role
          if (user.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        this.errorMessage = err.error || 'Login failed. Please try again.';
      },
    });
  }
  


  // onLoginSubmit(): void {
  //   if (this.loginModel.email) {
  //     this.loginModel.email = this.loginModel.email.toLowerCase(); // Normalize email to lowercase
  //   }

  //   // Basic validation for email and password fields
  //   if (!this.loginModel.email || !this.loginModel.password) {
  //     this.errorMessage = 'Email and password are required';
  //     return;
  //   }

  //   // Call login service to authenticate the user
  //   this.userService.login(this.loginModel).subscribe({
  //     next: (user) => {
  //       if (user && user.name) {
  //         // Save user details in sessionStorage
  //         sessionStorage.setItem('username', user.name);
  //         sessionStorage.setItem('senderId', user.id.toString()); // Save logged-in user ID
  //         sessionStorage.setItem('userRole', user.role); // Save user role (ADMIN or USER)

  //         // Redirect based on the role
  //         if (user.role === 'ADMIN') {
  //           this.router.navigate(['/admin']);
  //         } else {
  //           this.router.navigate(['/home']);
  //         }
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       this.errorMessage = err.error?.message || 'Login failed. Please try again.';
  //     }
  //   });
  // }





onGoogleLogin(): void {
      console.log('Google Login button clicked');
    }
}

