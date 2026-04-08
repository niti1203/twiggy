import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { Auth } from '../auth';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  // Product data
  product: any = null;
  
  // UI state
  isDarkMode = false;

  constructor(
    private productService: Product,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth
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
   * Logout
   */
  logout(): void {
    this.auth.logout();
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
}
