import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 1,
    name: 'Minimal Oak Side Table',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  },
  {
    id: 2,
    name: 'Linen Comfort Sofa',
    price: 1299,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80',
  },
  {
    id: 3,
    name: 'Ceramic Vase Set',
    price: 89,
    originalPrice: 129,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
  },
  {
    id: 4,
    name: 'Wool Area Rug',
    price: 459,
    originalPrice: null,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1601887370915-c7426fe5159a?w=800&q=80',
  },
  {
    id: 5,
    name: 'Modern Floor Lamp',
    price: 189,
    originalPrice: 249,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
  },
];

export default function BestSellers() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#E8E3DB]/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#2C2420] mb-4">
            Best Sellers
          </h2>
          <p className="font-body text-lg text-[#3A3A3A] max-w-2xl mx-auto">
            Our most loved pieces, curated for your perfect space
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          <div className="flex lg:grid lg:grid-cols-5 gap-6 lg:gap-8 min-w-max lg:min-w-0">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="flex-shrink-0 w-72 lg:w-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className="bg-[#FEFDFB] rounded-2xl soft-shadow overflow-hidden group cursor-pointer transition-all duration-300 hover:soft-shadow-lg"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#E8E3DB]/20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} alternate view`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-[#E8C4C4] text-[#2C2420] px-3 py-1 rounded-full text-xs font-semibold">
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="font-body font-semibold text-base text-[#2C2420] mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-[#D4AF6A] text-[#D4AF6A]" />
                      <span className="text-sm font-medium text-[#3A3A3A]">
                        {product.rating}
                      </span>
                      <span className="text-sm text-[#3A3A3A]/60">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-body font-bold text-lg text-[#2C2420]">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-body text-sm text-[#3A3A3A]/50 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      size="sm"
                      className="w-full bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full soft-shadow transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
