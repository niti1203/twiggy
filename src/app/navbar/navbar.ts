import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlistService } from '../services/wishlist';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cartCount = 0;
  wishlistCount = 0;
  isDarkMode = false;
  isLoginPage = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {
    this.loadTheme();
    this.checkCurrentPage();
  }

  ngOnInit() {
    // Subscribe to cart count changes
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Subscribe to wishlist count changes
    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });

    // Listen to route changes
    this.router.events.subscribe(() => {
      this.checkCurrentPage();
    });
  }

  /**
   * Check if current page is login
   */
  private checkCurrentPage(): void {
    this.isLoginPage = this.router.url === '/login';
  }

  /**
   * Load theme from localStorage
   */
  private loadTheme(): void {
    const savedTheme = localStorage.getItem('twiggy_theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  /**
   * Toggle between dark and light mode
   */
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('twiggy_theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  /**
   * Apply theme to document
   */
  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  /**
   * Navigate to cart page
   */
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  /**
   * Navigate to wishlist page
   */
  goToWishlist(): void {
    this.router.navigate(['/favorites']);
  }

  /**
   * Logout and navigate to login
   */
  logout(): void {
    this.router.navigate(['/login']);
  }
}
