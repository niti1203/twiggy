import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  category?: string;
  subcategory?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPrice.asObservable();

  private cartCount = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCount.asObservable();

  private readonly CART_STORAGE_KEY = 'twiggy_cart';
  private readonly CART_COUNT_STORAGE_KEY = 'twiggy_cart_count';

  constructor() {
    this.loadCartFromStorage();
  }

  /**
   * Add product to cart
   */
  addToCart(product: any, quantity: number = 1, size: string = ''): void {
    const items = this.cartItems.value;
    const existingItem = items.find(
      item => item.id === product.id && item.size === size
    );

    if (existingItem) {
      // Item already in cart, increase quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: size,
        category: product.category,
        subcategory: product.subcategory
      };
      items.push(cartItem);
    }

    this.updateCart(items);
  }

  /**
   * Remove product from cart
   */
  removeFromCart(productId: number, size: string): void {
    const items = this.cartItems.value.filter(
      item => !(item.id === productId && item.size === size)
    );
    this.updateCart(items);
  }

  /**
   * Increase quantity by 1
   */
  increaseQuantity(productId: number, size: string): void {
    const items = this.cartItems.value;
    const item = items.find(
      cartItem => cartItem.id === productId && cartItem.size === size
    );

    if (item) {
      item.quantity++;
      this.updateCart(items);
    }
  }

  /**
   * Decrease quantity by 1 (minimum 1)
   */
  decreaseQuantity(productId: number, size: string): void {
    const items = this.cartItems.value;
    const item = items.find(
      cartItem => cartItem.id === productId && cartItem.size === size
    );

    if (item && item.quantity > 1) {
      item.quantity--;
      this.updateCart(items);
    }
  }

  /**
   * Update quantity to specific value
   */
  updateQuantity(productId: number, size: string, quantity: number): void {
    if (quantity < 1) quantity = 1;
    
    const items = this.cartItems.value;
    const item = items.find(
      cartItem => cartItem.id === productId && cartItem.size === size
    );

    if (item) {
      item.quantity = quantity;
      this.updateCart(items);
    }
  }

  /**
   * Get cart items
   */
  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  /**
   * Get cart items as observable
   */
  getCartItems$(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  /**
   * Calculate total price
   */
  getTotalPrice(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

  /**
   * Get total quantity of items
   */
  getTotalQuantity(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  /**
   * Clear all items from cart
   */
  clearCart(): void {
    this.updateCart([]);
  }

  /**
   * Check if cart is empty
   */
  isCartEmpty(): boolean {
    return this.cartItems.value.length === 0;
  }

  /**
   * Check if product exists in cart
   */
  isProductInCart(productId: number, size: string): boolean {
    return this.cartItems.value.some(
      item => item.id === productId && item.size === size
    );
  }

  /**
   * Get specific cart item
   */
  getCartItem(productId: number, size: string): CartItem | undefined {
    return this.cartItems.value.find(
      item => item.id === productId && item.size === size
    );
  }

  /**
   * Private: Update cart and save to storage
   */
  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    this.totalPrice.next(this.calculateTotalPrice(items));
    this.cartCount.next(this.calculateTotalQuantity(items));
    this.saveCartToStorage(items);
  }

  /**
   * Private: Calculate total price
   */
  private calculateTotalPrice(items: CartItem[]): number {
    return items.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }

  /**
   * Private: Calculate total quantity
   */
  private calculateTotalQuantity(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Save cart to localStorage
   */
  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(
        this.CART_COUNT_STORAGE_KEY,
        this.calculateTotalQuantity(items).toString()
      );
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  /**
   * Load cart from localStorage
   */
  private loadCartFromStorage(): void {
    try {
      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      if (cartData) {
        const items: CartItem[] = JSON.parse(cartData);
        this.cartItems.next(items);
        this.totalPrice.next(this.calculateTotalPrice(items));
        this.cartCount.next(this.calculateTotalQuantity(items));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }
}
