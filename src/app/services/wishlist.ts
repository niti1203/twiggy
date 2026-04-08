import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistItems: any[] = [];

  addToWishlist(product: any) {

    const exists =
      this.wishlistItems.find(
        item => item.id === product.id
      );

    if (!exists) {
      this.wishlistItems.push(product);
    }

  }

  removeFromWishlist(index: number) {
    this.wishlistItems.splice(index, 1);
  }

  getWishlistItems() {
    return this.wishlistItems;
  }

}