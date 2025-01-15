import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [FormsModule,CommonModule

  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  token: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  onResetPasswordSubmit() {
    this.http
      .post('http://localhost:8083/api/auth/reset-password', null, {
        params: { token: this.token, newPassword: this.newPassword },
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