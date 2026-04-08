import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../product';
import { GeolocationService, LocationData } from '../geolocation.service';
import { SizeChartService, ClothingSize, ShoeSize } from '../size-chart.service';
import { GoogleAuthService, GoogleUser } from '../google-auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  // Product data
  product: any = null;
  
  // UI state
  isDarkMode = false;
  cartCount = 0;

  // Geolocation
  location: LocationData | null = null;
  locationLoading = true;

  // Size chart
  clothingSizes: ClothingSize[] = [];
  shoeSizes: ShoeSize[] = [];
  isShoeProduct = false;
  isClothingProduct = false;
  selectedSize: string = '';
  selectedShoeSize: string = '';

  // Google Auth
  currentUser: GoogleUser | null = null;
  showSizeChart = false;

  // Quantity
  quantity = 1;

  constructor(
    private productService: Product,
    private route: ActivatedRoute,
    private router: Router,
    private geolocationService: GeolocationService,
    private sizeChartService: SizeChartService,
    private googleAuthService: GoogleAuthService
  ) {}

  ngOnInit() {
    // Load product
    this.route.params.subscribe(params => {
      const productId = parseInt(params['id'], 10);
      this.product = this.productService.getProductById(productId);
      
      if (!this.product) {
        this.router.navigate(['/products']);
      } else {
        this.initializeSizeInfo();
      }
    });

    // Load location
    this.geolocationService.locationData$.subscribe(location => {
      this.location = location;
      this.locationLoading = location?.isLoading || false;
    });

    // Load current user
    this.googleAuthService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Load size charts
    this.clothingSizes = this.sizeChartService.getClothingSizes();
    this.shoeSizes = this.sizeChartService.getShoeSizes();
  }

  /**
   * Initialize size information for product
   */
  initializeSizeInfo(): void {
    if (!this.product) return;

    const subcategory = this.product.subcategory.toLowerCase();
    
    this.isShoeProduct = this.sizeChartService.isShoeProduct(subcategory);
    this.isClothingProduct = this.sizeChartService.isClothingProduct(subcategory);

    // Set default size
    if (this.isClothingProduct) {
      this.selectedSize = 'm'; // Default to Medium
    } else if (this.isShoeProduct) {
      this.selectedShoeSize = '7'; // Default to US 7
    }
  }

  /**
   * Add to cart
   */
  addToCart(): void {
    if ((this.isClothingProduct && !this.selectedSize) || 
        (this.isShoeProduct && !this.selectedShoeSize)) {
      alert('Please select a size!');
      return;
    }

    const sizeInfo = this.isClothingProduct ? 
      `Size: ${this.selectedSize.toUpperCase()}` : 
      `Shoe Size: US ${this.selectedShoeSize}`;

    this.cartCount += this.quantity;
    alert(`${this.product.name} (Qty: ${this.quantity}, ${sizeInfo}) added to cart!`);
    this.quantity = 1; // Reset quantity
  }

  /**
   * Buy now
   */
  buyNow(): void {
    if ((this.isClothingProduct && !this.selectedSize) || 
        (this.isShoeProduct && !this.selectedShoeSize)) {
      alert('Please select a size!');
      return;
    }
    alert(`Proceeding to checkout for ${this.product.name}...`);
  }

  /**
   * Toggle shoe size chart
   */
  toggleSizeChart(): void {
    this.showSizeChart = !this.showSizeChart;
  }

  /**
   * Get selected size details
   */
  getSelectedClothingSize(): ClothingSize | undefined {
    return this.sizeChartService.getClothingSizeById(this.selectedSize);
  }

  /**
   * Get selected shoe size details
   */
  getSelectedShoeSize(): ShoeSize | undefined {
    return this.sizeChartService.getShoeSizeById(this.selectedShoeSize);
  }

  /**
   * Navigate back
   */
  goBack(): void {
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

  /**
   * Logout
   */
  logout(): void {
    this.googleAuthService.signOut();
    this.router.navigate(['/login']);
  }

  /**
   * Increase quantity
   */
  increaseQuantity(): void {
    this.quantity++;
  }

  /**
   * Decrease quantity
   */
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
