import { Injectable } from '@angular/core';

export interface ClothingSize {
  id: string;
  size: string;
  usSize: string;
  indianSize: string;
  description?: string;
}

export interface ShoeSize {
  id: string;
  usSize: number;
  ukSize: number;
  indianSize: number;
  euSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class SizeChartService {
  
  /**
   * Clothing sizes (XS to XXL)
   */
  private clothingSizes: ClothingSize[] = [
    {
      id: 'xs',
      size: 'XS',
      usSize: '0-2',
      indianSize: '28-30',
      description: 'Extra Small'
    },
    {
      id: 's',
      size: 'S',
      usSize: '4-6',
      indianSize: '32-34',
      description: 'Small'
    },
    {
      id: 'm',
      size: 'M',
      usSize: '8-10',
      indianSize: '36-38',
      description: 'Medium'
    },
    {
      id: 'l',
      size: 'L',
      usSize: '12-14',
      indianSize: '40-42',
      description: 'Large'
    },
    {
      id: 'xl',
      size: 'XL',
      usSize: '16-18',
      indianSize: '44-46',
      description: 'Extra Large'
    },
    {
      id: 'xxl',
      size: 'XXL',
      usSize: '20-22',
      indianSize: '48-50',
      description: 'Extra Extra Large'
    }
  ];

  /**
   * Shoe sizes (US 5 to US 14)
   */
  private shoeSizes: ShoeSize[] = [
    { id: '1', usSize: 5, ukSize: 4.5, indianSize: 5, euSize: 37 },
    { id: '2', usSize: 5.5, ukSize: 5, indianSize: 5.5, euSize: 38 },
    { id: '3', usSize: 6, ukSize: 5.5, indianSize: 6, euSize: 38 },
    { id: '4', usSize: 6.5, ukSize: 6, indianSize: 6.5, euSize: 39 },
    { id: '5', usSize: 7, ukSize: 6.5, indianSize: 7, euSize: 40 },
    { id: '6', usSize: 7.5, ukSize: 7, indianSize: 7.5, euSize: 40 },
    { id: '7', usSize: 8, ukSize: 7.5, indianSize: 8, euSize: 41 },
    { id: '8', usSize: 8.5, ukSize: 8, indianSize: 8.5, euSize: 42 },
    { id: '9', usSize: 9, ukSize: 8.5, indianSize: 9, euSize: 42 },
    { id: '10', usSize: 9.5, ukSize: 9, indianSize: 9.5, euSize: 43 },
    { id: '11', usSize: 10, ukSize: 9.5, indianSize: 10, euSize: 44 },
    { id: '12', usSize: 10.5, ukSize: 10, indianSize: 10.5, euSize: 44 },
    { id: '13', usSize: 11, ukSize: 10.5, indianSize: 11, euSize: 45 },
    { id: '14', usSize: 12, ukSize: 11.5, indianSize: 12, euSize: 46 },
    { id: '15', usSize: 13, ukSize: 12.5, indianSize: 13, euSize: 47 }
  ];

  constructor() {}

  /**
   * Get clothing sizes
   */
  getClothingSizes(): ClothingSize[] {
    return this.clothingSizes;
  }

  /**
   * Get shoe sizes
   */
  getShoeSizes(): ShoeSize[] {
    return this.shoeSizes;
  }

  /**
   * Get size by ID (clothing)
   */
  getClothingSizeById(id: string): ClothingSize | undefined {
    return this.clothingSizes.find(size => size.id === id);
  }

  /**
   * Get shoe size by ID
   */
  getShoeSizeById(id: string): ShoeSize | undefined {
    return this.shoeSizes.find(size => size.id === id);
  }

  /**
   * Check if product is shoes
   */
  isShoeProduct(subcategory: string): boolean {
    const shoeCategories = ['shoes', 'heels', 'boots', 'sneakers', 'sandals', 'flats'];
    return shoeCategories.includes(subcategory.toLowerCase());
  }

  /**
   * Check if product is clothing
   */
  isClothingProduct(subcategory: string): boolean {
    const clothingCategories = [
      'tops',
      'dresses',
      'jeans',
      'shirts',
      't-shirts',
      'pants',
      'shorts',
      'skirts',
      'jackets',
      'blazers',
      'coats'
    ];
    return clothingCategories.includes(subcategory.toLowerCase());
  }

  /**
   * Get size recommendation based on weight and height (optional helper)
   */
  recommendClothingSize(weight: number, height: number): ClothingSize | undefined {
    // Simple recommendation logic (weight in kg, height in cm)
    if (weight < 45 && height < 155) return this.getClothingSizeById('xs');
    if (weight < 55 && height < 165) return this.getClothingSizeById('s');
    if (weight < 70 && height < 175) return this.getClothingSizeById('m');
    if (weight < 85 && height < 185) return this.getClothingSizeById('l');
    if (weight < 100 && height < 195) return this.getClothingSizeById('xl');
    return this.getClothingSizeById('xxl');
  }
}
