import { Product, Category, BlogPost } from '@/types';

export const categories: Category[] = [
  {
    id: 'living',
    name: 'Living Room',
    slug: 'living',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    description: 'Create a space that reflects your style',
  },
  {
    id: 'dining',
    name: 'Dining',
    slug: 'dining',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    description: 'Gather around tables designed for connection',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    slug: 'bedroom',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    description: 'Your sanctuary for rest and renewal',
  },
  {
    id: 'decor',
    name: 'Decor',
    slug: 'decor',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    description: 'Details that make a house a home',
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    slug: 'outdoor',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    description: 'Extend your living space outdoors',
  },
];

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Minimal Oak Side Table',
    description: 'A beautifully crafted side table made from sustainable oak. Perfect for adding a touch of warmth to any room. Features clean lines and a natural finish that highlights the wood grain.',
    price: 299,
    originalPrice: 399,
    category: 'living',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    ],
    inStock: true,
    stockCount: 15,
    tags: ['bestseller', 'sale', 'wood'],
    createdAt: '2024-01-15',
  },
  {
    id: 'prod-002',
    name: 'Linen Comfort Sofa',
    description: 'Sink into pure comfort with our Linen Comfort Sofa. Upholstered in premium Belgian linen, this sofa combines timeless elegance with exceptional durability. Deep cushions and down-wrapped foam provide the perfect balance of support and softness.',
    price: 1299,
    originalPrice: null,
    category: 'living',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80',
    ],
    inStock: true,
    stockCount: 8,
    tags: ['bestseller', 'premium'],
    createdAt: '2024-01-10',
  },
  {
    id: 'prod-003',
    name: 'Ceramic Vase Set',
    description: 'A trio of handcrafted ceramic vases in varying heights. Each piece is wheel-thrown by skilled artisans and finished with a matte glaze. Perfect for displaying fresh flowers or as standalone decorative objects.',
    price: 89,
    originalPrice: 129,
    category: 'decor',
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    ],
    inStock: true,
    stockCount: 45,
    tags: ['sale', 'handmade'],
    createdAt: '2024-01-20',
  },
  {
    id: 'prod-004',
    name: 'Wool Area Rug',
    description: 'Add warmth and texture to your floors with this hand-knotted wool rug. Crafted using traditional techniques passed down through generations. The neutral palette complements any décor style.',
    price: 459,
    originalPrice: null,
    category: 'decor',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1601887370915-c7426fe5159a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
      'https://images.unsplash.com/photo-1601887370915-c7426fe5159a?w=800&q=80',
    ],
    inStock: true,
    stockCount: 12,
    tags: ['premium', 'handmade'],
    createdAt: '2024-01-08',
  },
  {
    id: 'prod-005',
    name: 'Modern Floor Lamp',
    description: 'Illuminate your space with this sculptural floor lamp. Features an adjustable brass arm and a linen drum shade that casts a warm, diffused light. The marble base adds stability and sophistication.',
    price: 189,
    originalPrice: 249,
    category: 'decor',
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    ],
    inStock: true,
    stockCount: 20,
    tags: ['sale', 'lighting'],
    createdAt: '2024-01-25',
  },
  {
    id: 'prod-006',
    name: 'Oak Dining Table',
    description: 'Gather around this stunning oak dining table. Its live-edge design celebrates the natural beauty of the wood, while the modern steel legs provide a contemporary contrast. Seats 6-8 comfortably.',
    price: 1599,
    originalPrice: 1899,
    category: 'dining',
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    ],
    inStock: true,
    stockCount: 5,
    tags: ['sale', 'premium', 'wood'],
    createdAt: '2024-01-12',
  },
  {
    id: 'prod-007',
    name: 'Velvet Dining Chairs (Set of 2)',
    description: 'Elevate your dining experience with these luxurious velvet chairs. The curved backrest provides excellent support, while the gold-finished legs add a touch of glamour. Sold as a set of 2.',
    price: 449,
    originalPrice: null,
    category: 'dining',
    rating: 4.7,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1617364852223-75e67b27cfe6?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617364852223-75e67b27cfe6?w=800&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
    ],
    inStock: true,
    stockCount: 18,
    tags: ['bestseller'],
    createdAt: '2024-01-18',
  },
  {
    id: 'prod-008',
    name: 'King Platform Bed Frame',
    description: 'Sleep in style on this minimalist platform bed. The low-profile design creates an airy feel, while the solid wood construction ensures lasting durability. Includes headboard and side rails.',
    price: 899,
    originalPrice: 1099,
    category: 'bedroom',
    rating: 4.8,
    reviews: 211,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    inStock: true,
    stockCount: 10,
    tags: ['sale', 'bestseller'],
    createdAt: '2024-01-05',
  },
  {
    id: 'prod-009',
    name: 'Linen Bedding Set',
    description: 'Transform your bed into a cloud with this premium linen bedding set. Includes duvet cover, fitted sheet, and two pillowcases. Pre-washed for exceptional softness from the first night.',
    price: 279,
    originalPrice: null,
    category: 'bedroom',
    rating: 4.9,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    inStock: true,
    stockCount: 35,
    tags: ['bestseller', 'premium'],
    createdAt: '2024-01-22',
  },
  {
    id: 'prod-010',
    name: 'Nightstand with Drawer',
    description: 'Keep essentials within reach with this elegant nightstand. Features a spacious drawer for storage and an open shelf for books or decorative items. Crafted from solid walnut.',
    price: 229,
    originalPrice: 299,
    category: 'bedroom',
    rating: 4.6,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80',
      'https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?w=800&q=80',
    ],
    inStock: true,
    stockCount: 22,
    tags: ['sale', 'wood'],
    createdAt: '2024-01-28',
  },
  {
    id: 'prod-011',
    name: 'Outdoor Lounge Chair',
    description: 'Relax in style with this weather-resistant lounge chair. The teak frame develops a beautiful patina over time, while the quick-dry cushions ensure comfort rain or shine.',
    price: 549,
    originalPrice: null,
    category: 'outdoor',
    rating: 4.7,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    ],
    inStock: true,
    stockCount: 14,
    tags: ['premium', 'outdoor'],
    createdAt: '2024-02-01',
  },
  {
    id: 'prod-012',
    name: 'Woven Storage Basket',
    description: 'Organize in style with this handwoven seagrass basket. Perfect for storing blankets, toys, or plants. Each piece is unique due to the natural variations in the material.',
    price: 59,
    originalPrice: 79,
    category: 'decor',
    rating: 4.5,
    reviews: 176,
    image: 'https://images.unsplash.com/photo-1619564703498-e5c62e2a10ec?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1619564703498-e5c62e2a10ec?w=800&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
    ],
    inStock: true,
    stockCount: 50,
    tags: ['sale', 'handmade'],
    createdAt: '2024-02-05',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'The Art of Minimalist Living',
    excerpt: 'Discover how thoughtful curation can transform your space into a sanctuary of calm and purpose.',
    content: '',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    author: 'Emma Chen',
    category: 'Lifestyle',
    createdAt: '2024-02-01',
  },
  {
    id: 'blog-002',
    title: 'Sustainable Materials in Modern Furniture',
    excerpt: 'Learn about the eco-friendly materials shaping the future of home design.',
    content: '',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    author: 'Marcus Webb',
    category: 'Design',
    createdAt: '2024-01-28',
  },
  {
    id: 'blog-003',
    title: 'Color Palettes for Every Season',
    excerpt: 'How to update your home with seasonal color trends without a complete redesign.',
    content: '',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80',
    author: 'Sofia Garcia',
    category: 'Tips',
    createdAt: '2024-01-20',
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category === categorySlug);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.tags.some(tag => tag.includes(lowercaseQuery))
  );
}

export function filterProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sortBy?: string;
}): Product[] {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!);
  }

  if (filters.minRating !== undefined) {
    filtered = filtered.filter(p => p.rating >= filters.minRating!);
  }

  if (filters.inStock) {
    filtered = filtered.filter(p => p.inStock);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }
  }

  return filtered;
}
