// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Omit<Address, 'id' | 'userId' | 'isDefault'>;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  addedAt: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  createdAt: string;
}

// Filter Types
export interface ProductFilters {
  category: string;
  priceRange: [number, number];
  rating: number | null;
  inStock: boolean;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
  searchQuery: string;
}
