import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule
} from '@angular/forms';

import { Product } from '../product';
import { Auth } from '../auth';
import { SearchService } from '../search.service';

/* NEW IMPORTS */

import { CartService } from '../cart.service';
import { WishlistService } from '../services/wishlist';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})

export class ProductList {

  cartCount = 0;

  isDarkMode = false;

  selectedCategory = 'all';

  searchText = '';

  isSearchFocused = false;

  showSuggestions = false;

  suggestions: any[] = [];

  products: any[] = [];

  filteredProducts: any[] = [];

  constructor(
    private productService: Product,
    private router: Router,
    private auth: Auth,
    private searchService: SearchService,
    private fb: FormBuilder,

    /* NEW SERVICES */

    private cartService: CartService,
    private wishlistService: WishlistService

  ) {

  }

  ngOnInit() {

    if (!this.auth.isAuthenticated()) {

      this.router.navigate(['/login']);

      return;

    }

    this.products =
      this.productService.getProducts();

    this.filteredProducts =
      this.products;

    this.searchService.initializeProducts(
      this.products
    );

    this.updateCartCount();

  }

  /* UPDATE CART COUNT */

  updateCartCount() {

    this.cartCount =
      this.cartService.getCartItems().length;

  }

  /* ADD TO CART */

  addToCart(product: any) {

    this.cartService.addToCart(product);

    this.updateCartCount();

    alert('Added to cart');

  }

  /* ADD TO WISHLIST */

  addToWishlist(product: any) {

    this.wishlistService.addToWishlist(product);

    alert('Added to wishlist');

  }

  /* SEARCH */

  onSearchInput(event: any) {

    const value =
      event.target.value;

    this.searchText =
      value;

    if (value.trim().length > 0) {

      this.suggestions =
        this.searchService.getSuggestedProducts(
          value,
          5
        );

      this.showSuggestions =
        true;

    } else {

      this.suggestions = [];

      this.showSuggestions =
        false;

    }

  }

  onSearchFocus() {

    this.isSearchFocused =
      true;

    if (
      this.searchText.trim().length > 0
    ) {

      this.showSuggestions =
        true;

    }

  }

  onSearchBlur() {

    setTimeout(() => {

      this.isSearchFocused =
        false;

      this.showSuggestions =
        false;

    }, 200);

  }

  selectSuggestion(product: any) {

    this.searchText =
      product.name;

    this.showSuggestions =
      false;

    this.search();

  }

  search() {

    if (
      this.searchText.trim().length === 0
    ) {

      this.filteredProducts =
        this.productService.getProductsByCategory(
          this.selectedCategory
        );

    } else {

      const searchResults =
        this.productService.searchProducts(
          this.searchText
        );

      this.filteredProducts =
        searchResults.filter(

          p =>
            this.selectedCategory === 'all'
            ||
            p.category === this.selectedCategory

        );

    }

  }

  /* CATEGORY */

  filterByCategory(category: string) {

    this.selectedCategory =
      category;

    this.searchText = '';

    this.showSuggestions =
      false;

    this.filteredProducts =
      this.productService.getProductsByCategory(
        category
      );

  }

  /* NAVIGATION */

  viewProduct(productId: number) {

    this.router.navigate([
      '/product',
      productId
    ]);

  }

  /* THEME */

  toggleTheme() {

    this.isDarkMode =
      !this.isDarkMode;

    if (this.isDarkMode) {

      document.body.classList.add(
        'dark-mode'
      );

    } else {

      document.body.classList.remove(
        'dark-mode'
      );

    }

  }

  /* LOGOUT */

  logout() {

    this.auth.logout();

    this.router.navigate([
      '/login'
    ]);

  }

}