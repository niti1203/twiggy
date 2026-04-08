import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product: any = null;
  isDarkMode = false;
  cartCount = 0;

  constructor(
    private productService: Product,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = parseInt(params['id'], 10);
      this.product = this.productService.getProductById(productId);
      
      if (!this.product) {
        this.router.navigate(['/products']);
      }
    });
  }

  addToCart() {
    this.cartCount++;
    alert('Product added to cart!');
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
