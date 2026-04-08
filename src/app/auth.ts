import { Injectable } from '@angular/core';

export interface User {
  id?: string;
  name?: string;
  email: string;
  locationId?: string;
  isLoggedIn?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  isLoggedIn = false;
  currentUser: User | null = null;

  // Dummy credentials
  private DUMMY_CREDENTIALS = {
    email: 'test@example.com',
    password: '123456'
  };

  constructor() {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): boolean {
    // Validate dummy credentials
    if (email === this.DUMMY_CREDENTIALS.email && password === this.DUMMY_CREDENTIALS.password) {
      this.isLoggedIn = true;
      this.currentUser = {
        id: 'test-user-001',
        name: 'Test User',
        email: email,
        isLoggedIn: true
      };
      this.saveUserToStorage();
      return true;
    }
    return false;
  }

  loginWithGoogle(userData: { name: string; email: string }): boolean {
    this.isLoggedIn = true;
    this.currentUser = {
      id: 'google-user-' + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      isLoggedIn: true
    };
    this.saveUserToStorage();
    return true;
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  private saveUserToStorage(): void {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.isLoggedIn = true;
    }
  }

}