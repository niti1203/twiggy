import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth';

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
    private fb: FormBuilder
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
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Mock Google login - In production, integrate with Google OAuth
    setTimeout(() => {
      const googleUser = {
        name: 'John Doe',
        email: 'john.doe@gmail.com'
      };

      if (this.auth.loginWithGoogle(googleUser)) {
        this.successMessage = 'Google login successful! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 500);
      } else {
        this.isLoading = false;
        this.errorMessage = 'Failed to login with Google. Please try again.';
      }
    }, 1000);
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
