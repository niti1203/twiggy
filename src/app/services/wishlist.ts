import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistItems: any[] = [];
  private wishlistCount = new BehaviorSubject<number>(0);
  wishlistCount$: Observable<number> = this.wishlistCount.asObservable();
  private readonly WISHLIST_STORAGE_KEY = 'twiggy_wishlist';

  constructor() {
    this.loadWishlistFromStorage();
  }

  /**
   * Load wishlist from localStorage
   */
  private loadWishlistFromStorage(): void {
    const stored = localStorage.getItem(this.WISHLIST_STORAGE_KEY);
    if (stored) {
      this.wishlistItems = JSON.parse(stored);
      this.wishlistCount.next(this.wishlistItems.length);
    }
  }

  /**
   * Save wishlist to localStorage
   */
  private saveWishlistToStorage(): void {
    localStorage.setItem(this.WISHLIST_STORAGE_KEY, JSON.stringify(this.wishlistItems));
  }

  addToWishlist(product: any) {
    const exists =
      this.wishlistItems.find(
        item => item.id === product.id
      );

    if (!exists) {
      this.wishlistItems.push(product);
      this.wishlistCount.next(this.wishlistItems.length);
      this.saveWishlistToStorage();
    }
  }

  removeFromWishlist(index: number) {
    this.wishlistItems.splice(index, 1);
    this.wishlistCount.next(this.wishlistItems.length);
    this.saveWishlistToStorage();
  }

  getWishlistItems() {
    return this.wishlistItems;
  }

}