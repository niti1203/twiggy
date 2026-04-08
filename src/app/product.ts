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
      id: 4,
      name: 'Necklace Set',
      price: 900,
      category: 'women',
      subcategory: 'accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'
    },

    {
      id: 6,
      name: 'Shoes',
      price: 2600,
      category: 'men',
      subcategory: 'shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
    },



    {
      id: 12,
      name: 'Casual T-Shirt',
      price: 900,
      category: 'men',
      subcategory: 't-shirts',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'
    },

    
    /* ---------------- CHILDREN ---------------- */

    {
      id: 16,
      name: "Johnson's Baby Kit",
      price: 1500,
      category: 'children',
      subcategory: 'baby kit',
      image: 'https://images.unsplash.com/photo-1522531521a8f35d5b8ea8d1a3e2d3c4d5e6f7g8h?w=500&h=500&fit=crop'
    },

    {
      id: 19,
      name: 'Milk Bottle',
      price: 350,
      category: 'children',
      subcategory: 'milk bottle',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop'
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
      id: 25,
      name: 'Chair',
      price: 1800,
      category: 'appliances',
      subcategory: 'chair',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657'
    },


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