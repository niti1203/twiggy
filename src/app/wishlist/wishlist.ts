import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistService } from '../services/wishlist';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class WishlistComponent {
  wishlistItems: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadWishlist();
  }

  /**
   * Load wishlist items
   */
  loadWishlist() {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  /**
   * Remove item from wishlist
   */
  removeFromWishlist(index: number): void {
    this.wishlistService.removeFromWishlist(index);
    this.loadWishlist();
  }

  /**
   * Add item to cart
   */
  addToCart(product: any): void {
    this.cartService.addToCart(product, 1);
  }

  /**
   * Navigate to product detail
   */
  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  /**
   * Navigate back to products
   */
  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
