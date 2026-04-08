import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  // Product data
  product: any = null;
  
  // UI state
  isDarkMode = false;
  addToCartMessage = '';
  quantity = 1;

  constructor(
    private productService: Product,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Load product
    this.route.params.subscribe(params => {
      const productId = parseInt(params['id'], 10);
      this.product = this.productService.getProductById(productId);
      
      if (!this.product) {
        this.router.navigate(['/products']);
      }
    });
  }

  /**
   * Add to cart
   */
  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    
    // Show success message
    this.addToCartMessage = `✓ ${this.product.name} (Qty: ${this.quantity}) added to cart!`;
    
    // Clear message after 3 seconds
    setTimeout(() => {
      this.addToCartMessage = '';
    }, 3000);

    this.quantity = 1; // Reset quantity
  }

  /**
   * Buy now
   */
  buyNow(): void {
    this.cartService.addToCart(this.product, this.quantity);
    
    // Redirect to cart
    this.router.navigate(['/cart']);
  }

  /**
   * Increase quantity
   */
  increaseQuantity(): void {
    this.quantity++;
  }

  /**
   * Decrease quantity
   */
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  /**
   * Go to login
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Toggle theme
   */
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  /**
   * Navigate back
   */
  goBack(): void {
    this.router.navigate(['/products']);
  }

  /**
   * Calculate average rating from reviews
   */
  getAverageRating(): number {
    if (!this.product.reviews || this.product.reviews.length === 0) {
      return 0;
    }
    
    const totalRating = this.product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
    return totalRating / this.product.reviews.length;
  }

  /**
   * Convert rating number to stars
   */
  getStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    return stars;
  }
}
