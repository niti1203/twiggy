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
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
      reviews: [
        {
          name: 'Priya Singh',
          rating: 5,
          comment: 'Beautiful handbag! Perfect quality and material. Very satisfied with my purchase.',
          date: '2024-04-01'
        },
        {
          name: 'Anjali Sharma',
          rating: 4,
          comment: 'Great design but slightly bigger than expected. Still love it!',
          date: '2024-03-28'
        },
        {
          name: 'Meera Patel',
          rating: 5,
          comment: 'Excellent craftsmanship. Will definitely buy again!',
          date: '2024-03-15'
        }
      ]
    },


    {
      id: 4,
      name: 'Necklace Set',
      price: 900,
      category: 'women',
      subcategory: 'accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
      reviews: [
        {
          name: 'Neha Gupta',
          rating: 5,
          comment: 'Absolutely stunning! The necklace set looks even better in person.',
          date: '2024-04-02'
        },
        {
          name: 'Kavya Reddy',
          rating: 4,
          comment: 'Very pretty and affordable. Received it quickly.',
          date: '2024-03-25'
        },
        {
          name: 'Isha Mathur',
          rating: 5,
          comment: 'Perfect for occasions. Highly recommend!',
          date: '2024-03-10'
        },
        {
          name: 'Divya Iyer',
          rating: 4,
          comment: 'Good quality, worth the price.',
          date: '2024-03-05'
        }
      ]
    },

    {
      id: 6,
      name: 'Shoes',
      price: 2600,
      category: 'men',
      subcategory: 'shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      reviews: [
        {
          name: 'Arjun Verma',
          rating: 5,
          comment: 'Best shoes I have ever worn! Super comfortable and stylish.',
          date: '2024-04-03'
        },
        {
          name: 'Rohit Kumar',
          rating: 4,
          comment: 'Great design and comfort. Bit pricey but worth it.',
          date: '2024-03-20'
        },
        {
          name: 'Vikram Singh',
          rating: 5,
          comment: 'Excellent quality and durability. Highly satisfied!',
          date: '2024-03-12'
        }
      ]
    },



    {
      id: 12,
      name: 'Casual T-Shirt',
      price: 900,
      category: 'men',
      subcategory: 't-shirts',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
      reviews: [
        {
          name: 'Akshay Patel',
          rating: 5,
          comment: 'Perfect fit and amazing fabric quality. Will buy more!',
          date: '2024-04-01'
        },
        {
          name: 'Nikhil Desai',
          rating: 4,
          comment: 'Good t-shirt, comfortable to wear daily.',
          date: '2024-03-22'
        },
        {
          name: 'Sanjay Nair',
          rating: 5,
          comment: 'Excellent value for money. Great product!',
          date: '2024-03-18'
        },
        {
          name: 'Harish Bhat',
          rating: 3,
          comment: 'Average quality. Expected better stitching.',
          date: '2024-03-05'
        }
      ]
    },

    {
      id: 23,
      name: 'Home Decor',
      price: 1200,
      category: 'appliances',
      subcategory: 'decor',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      reviews: [
        {
          name: 'Ravi Menon',
          rating: 5,
          comment: 'Beautiful decor piece! Adds elegance to my living room.',
          date: '2024-04-02'
        },
        {
          name: 'Suresh Iyer',
          rating: 5,
          comment: 'Excellent aesthetic. Very happy with the purchase!',
          date: '2024-03-28'
        },
        {
          name: 'Arun Sharma',
          rating: 4,
          comment: 'Good quality, though it took time to settle in place.',
          date: '2024-03-14'
        }
      ]
    },

    

    {
      id: 25,
      name: 'Chair',
      price: 1800,
      category: 'appliances',
      subcategory: 'chair',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657',
      reviews: [
        {
          name: 'Ramesh Kumar',
          rating: 5,
          comment: 'Incredibly comfortable chair! Perfect for long working hours.',
          date: '2024-04-03'
        },
        {
          name: 'Deepak Pillai',
          rating: 4,
          comment: 'Great design and very sturdy. Would recommend!',
          date: '2024-03-26'
        },
        {
          name: 'Mohan Das',
          rating: 5,
          comment: 'Amazing quality and build. Worth every penny!',
          date: '2024-03-16'
        },
        {
          name: 'Prakash Reddy',
          rating: 4,
          comment: 'Good comfort level. Delivery was quick.',
          date: '2024-03-08'
        }
      ]
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