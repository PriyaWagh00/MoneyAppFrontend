import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsService {
  private currentUsername: string | null = null;

  constructor() {}

  // Method to set username (stored in session or any other service state)
  setUsername(username: string | null): void {
    this.currentUsername = username;
  }

  // Method to get the current username (if needed)
  getUsername(): string | null {
    return this.currentUsername;
  }

  // Method to clear user data (called on logout)
  clearUserData(): void {
    this.currentUsername = null;
  }
}
