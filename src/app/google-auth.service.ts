import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isLoggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private currentUser = new BehaviorSubject<GoogleUser | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  // Google OAuth Client ID (You need to add your own from Google Cloud Console)
  private clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

  constructor() {
    this.loadUserFromStorage();
    this.initializeGoogleSignIn();
  }

  /**
   * Initialize Google Sign-In
   */
  initializeGoogleSignIn(): void {
    // Check if Client ID is configured
    if (this.clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      console.warn(
        '⚠️ Google OAuth Client ID not configured. ' +
        'To enable Google Sign-In:\n' +
        '1. Get Client ID from Google Cloud Console\n' +
        '2. Replace placeholder in google-auth.service.ts line 21\n' +
        '3. Email/Password auth still works with: test@example.com / 123456'
      );
      return;
    }

    // Check if Google library is available
    if ((window as any).google) {
      try {
        (window as any).google.accounts.id.initialize({
          client_id: this.clientId,
          callback: (response: any) => this.handleGoogleSignIn(response),
          auto_select: true,
          itp_support: true
        });
        console.log('✅ Google OAuth initialized successfully');
      } catch (error) {
        console.error('❌ Google OAuth initialization error:', error);
      }
    } else {
      console.warn('⚠️ Google library not loaded. Check internet connection.');
    }
  }

  /**
   * Handle Google Sign-In response
   */
  private handleGoogleSignIn(response: any): void {
    if (response.credential) {
      try {
        const decodedToken = this.decodeJWT(response.credential);
        const user: GoogleUser = {
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
          profilePicture: decodedToken.picture,
          isLoggedIn: true
        };

        this.currentUser.next(user);
        this.saveUserToStorage(user);
        console.log('✅ Google Sign-In successful:', user.email);
      } catch (error) {
        console.error('❌ Error processing Google Sign-In:', error);
      }
    }
  }

  /**
   * Sign in with Google (called when user clicks login button)
   */
  signInWithGoogle(): void {
    if ((window as any).google) {
      (window as any).google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          type: 'standard',
          size: 'large',
          logo_alignment: 'center',
          width: '380',
          theme: 'outline',
          text: 'signin_with'
        }
      );
    }
  }

  /**
   * Render Google Sign-In button
   */
  renderSignInButton(elementId: string): void {
    if (this.clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      console.warn('Google OAuth Client ID not configured. Sign-In button disabled.');
      return;
    }

    if ((window as any).google && document.getElementById(elementId)) {
      try {
        (window as any).google.accounts.id.renderButton(
          document.getElementById(elementId),
          {
            type: 'standard',
            size: 'large',
            logo_alignment: 'center',
            width: '100%',
            theme: 'outline',
            text: 'signin_with'
          }
        );
      } catch (error) {
        console.error('Error rendering Google Sign-In button:', error);
      }
    }
  }

  /**
   * Sign out
   */
  signOut(): void {
    if ((window as any).google) {
      (window as any).google.accounts.id.disableAutoSelect();
    }
    this.currentUser.next(null);
    localStorage.removeItem('googleUser');
  }

  /**
   * Get current user
   */
  getCurrentUser(): GoogleUser | null {
    return this.currentUser.value;
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.currentUser.value?.isLoggedIn || false;
  }

  /**
   * Decode JWT token (manual base64 decoding)
   */
  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Save user to localStorage
   */
  private saveUserToStorage(user: GoogleUser): void {
    localStorage.setItem('googleUser', JSON.stringify(user));
  }

  /**
   * Load user from localStorage
   */
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('googleUser');
    if (storedUser) {
      try {
        this.currentUser.next(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading user from storage:', error);
      }
    }
  }

  /**
   * Set Google Client ID (call this with your actual Google Client ID)
   */
  setClientId(clientId: string): void {
    this.clientId = clientId;
    this.initializeGoogleSignIn();
  }
}
