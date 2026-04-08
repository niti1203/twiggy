import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService, CartItem } from '../cart.service';
import { WishlistService } from './wishlist';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../cart/cart.html',
  styleUrl: '../cart/cart.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  isDarkMode = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to cart items
    this.cartService.getCartItems$().subscribe(items => {
      this.cartItems = items;
      this.updateTotals();
    });
  }

  /**
   * Update total price and quantity
   */
  updateTotals(): void {
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalQuantity = this.cartService.getTotalQuantity();
  }

  /**
   * Remove item from cart
   */
  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id, item.size);
  }

  /**
   * Move item to wishlist
   */
  moveToWishlist(item: CartItem): void {
    this.wishlistService.addToWishlist(item);
    this.removeItem(item);
    alert('Moved to wishlist');
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
   * Proceed to checkout
   */
  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout...');
    // Redirect to checkout page (to be implemented)
  }

  /**
   * Continue shopping
   */
  continueShopping(): void {
    this.router.navigate(['/products']);
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
}