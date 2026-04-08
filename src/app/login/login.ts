import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { GoogleAuthService } from '../google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isDarkMode = false;
  isLoading = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private fb: FormBuilder,
    private googleAuthService: GoogleAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Check if user is already logged in
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/products']);
    }

    // Initialize Google Sign-In button
    this.googleAuthService.renderSignInButton('google-signin-button');

    // Subscribe to Google user changes for redirect
    this.googleAuthService.currentUser$.subscribe(user => {
      if (user && user.isLoggedIn) {
        this.successMessage = 'Google login successful! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 500);
      }
    });
  }

  login() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    // Simulate API call delay
    setTimeout(() => {
      if (this.auth.login(email, password)) {
        this.successMessage = 'Login successful! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 500);
      } else {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password';
        this.loginForm.reset();
      }
    }, 500);
  }

  loginWithGoogle() {
    // Google Sign-In button is rendered and handled by GoogleAuthService
    // This method can be called if needed for additional processing
    console.log('Google Sign-In initiated via button click');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  get emailError(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) {
      return 'Email is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'Password is required';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }
}
