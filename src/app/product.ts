import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {

  products = [

    /* ---------------- WOMEN ---------------- */

    {
      id: 1,
      name: 'Hand Bag',
      price: 2500,
      category: 'women',
      subcategory: 'bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3'
    },

    {
      id: 2,
      name: 'Crop Top',
      price: 1200,
      category: 'women',
      subcategory: 'tops',
      image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38'
    },

    {
      id: 3,
      name: 'Evening Dress',
      price: 3200,
      category: 'women',
      subcategory: 'dresses',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
    },

    {
      id: 4,
      name: 'Necklace Set',
      price: 900,
      category: 'women',
      subcategory: 'accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'
    },

    {
      id: 5,
      name: 'Women Shoes',
      price: 1800,
      category: 'women',
      subcategory: 'shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2'
    },

    {
      id: 6,
      name: 'Red Heels',
      price: 2600,
      category: 'women',
      subcategory: 'heels',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
    },

    {
      id: 7,
      name: 'Blue Jeans',
      price: 2100,
      category: 'women',
      subcategory: 'jeans',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
    },

    /* ---------------- MEN ---------------- */

    {
      id: 8,
      name: 'Men Shoes',
      price: 2400,
      category: 'men',
      subcategory: 'shoes',
      image: 'https://images.unsplash.com/photo-1528701800489-20be3c3a5c3c'
    },

    {
      id: 9,
      name: 'Leather Wallet',
      price: 1500,
      category: 'men',
      subcategory: 'wallet',
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc'
    },

    {
      id: 10,
      name: 'Men Belt',
      price: 900,
      category: 'men',
      subcategory: 'belts',
      image: 'https://images.unsplash.com/photo-1593032465171-8d0f2d5f9d57'
    },

    {
      id: 11,
      name: 'Formal Shirt',
      price: 1800,
      category: 'men',
      subcategory: 'shirts',
      image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38'
    },

    {
      id: 12,
      name: 'Casual T-Shirt',
      price: 900,
      category: 'men',
      subcategory: 't-shirts',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'
    },

    {
      id: 13,
      name: 'Men Shorts',
      price: 850,
      category: 'men',
      subcategory: 'shorts',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c'
    },

    {
      id: 14,
      name: 'Formal Pants',
      price: 1700,
      category: 'men',
      subcategory: 'pants',
      image: 'https://images.unsplash.com/photo-1593032465171-8d0f2d5f9d57'
    },

    {
      id: 15,
      name: 'Office Tie',
      price: 600,
      category: 'men',
      subcategory: 'tie',
      image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad'
    },

    /* ---------------- CHILDREN ---------------- */

    {
      id: 16,
      name: "Johnson's Baby Kit",
      price: 1500,
      category: 'children',
      subcategory: 'baby kit',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8'
    },

    {
      id: 17,
      name: 'Baby Diapers',
      price: 950,
      category: 'children',
      subcategory: 'diapers',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db'
    },

    {
      id: 18,
      name: 'Baby Pads',
      price: 400,
      category: 'children',
      subcategory: 'pads',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8'
    },

    {
      id: 19,
      name: 'Milk Bottle',
      price: 350,
      category: 'children',
      subcategory: 'milk bottle',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb'
    },

    {
      id: 20,
      name: 'Toy Car',
      price: 600,
      category: 'children',
      subcategory: 'toys',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb'
    },

    /* ---------------- APPLIANCES ---------------- */

    {
      id: 21,
      name: 'Small Fan',
      price: 2100,
      category: 'appliances',
      subcategory: 'fan',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c'
    },

    {
      id: 22,
      name: 'Water Pipes',
      price: 900,
      category: 'appliances',
      subcategory: 'pipes',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952'
    },

    {
      id: 23,
      name: 'Home Decor',
      price: 1200,
      category: 'appliances',
      subcategory: 'decor',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4'
    },

    {
      id: 24,
      name: 'Wooden Table',
      price: 4200,
      category: 'appliances',
      subcategory: 'table',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
    },

    {
      id: 25,
      name: 'Chair',
      price: 1800,
      category: 'appliances',
      subcategory: 'chair',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657'
    },

    {
      id: 26,
      name: 'Flower Vase',
      price: 700,
      category: 'appliances',
      subcategory: 'vase',
      image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9'
    }

  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string) {
    if (category === 'all') {
      return this.products;
    }
    return this.products.filter(product => product.category === category);
  }

  searchProducts(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.subcategory.toLowerCase().includes(lowerQuery)
    );
  }

}