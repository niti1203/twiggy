import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  isDarkMode = false;
  isLoading = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to cart items
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    // Subscribe to total price
    this.cartService.totalPrice$.subscribe(price => {
      this.totalPrice = price;
    });

    // Subscribe to total quantity
    this.cartService.cartCount$.subscribe(count => {
      this.totalQuantity = count;
    });

    // Check for dark mode
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  /**
   * Remove item from cart
   */
  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id, item.size);
  }

  /**
   * Increase quantity
   */
  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item.id, item.size);
  }

  /**
   * Decrease quantity
   */
  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item.id, item.size);
  }

  /**
   * Update quantity on input change
   */
  updateQuantity(item: CartItem, quantity: string): void {
    const qty = parseInt(quantity, 10);
    if (!isNaN(qty) && qty > 0) {
      this.cartService.updateQuantity(item.id, item.size, qty);
    }
  }

  /**
   * Clear all items from cart
   */
  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
    }
  }

  /**
   * Continue shopping
   */
  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  /**
   * Checkout
   */
  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.isLoading = true;
    
    // Simulate checkout process
    setTimeout(() => {
      alert('✅ Order placed successfully!\n\nTotal: ₹' + this.totalPrice);
      this.cartService.clearCart();
      this.isLoading = false;
      this.router.navigate(['/products']);
    }, 1500);
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
   * Get item subtotal
   */
  getItemSubtotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  /**
   * Format price for display
   */
  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }
}
