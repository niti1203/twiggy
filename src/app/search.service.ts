import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults$ = new BehaviorSubject<Product[]>([]);
  private allProducts: Product[] = [];

  constructor() {}

  initializeProducts(products: Product[]): void {
    this.allProducts = products;
  }

  getSearchResults(): Observable<Product[]> {
    return this.searchResults$.asObservable();
  }

  searchProducts(query: string): void {
    if (!query || query.trim().length === 0) {
      this.searchResults$.next([]);
      return;
    }

    const results = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(query.toLowerCase())
    );

    this.searchResults$.next(results);
  }

  autocomplete(query: Observable<string>): Observable<Product[]> {
    return query.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(q => {
        if (!q || q.trim().length === 0) {
          return [];
        }
        return this.allProducts.filter(product =>
          product.name.toLowerCase().includes(q.toLowerCase()) ||
          product.category.toLowerCase().includes(q.toLowerCase()) ||
          product.subcategory.toLowerCase().includes(q.toLowerCase())
        );
      })
    );
  }

  getSuggestedProducts(query: string, limit: number = 5): Product[] {
    if (!query || query.trim().length === 0) {
      return [];
    }

    return this.allProducts
      .filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);
  }
}
