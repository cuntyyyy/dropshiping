import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products as allProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

// Get first 5 products as bestsellers
const products = allProducts.slice(0, 5);

export default function BestSellers() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

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
                <Link to={`/product/${product.id}`}>
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
                      <div className="absolute top-3 left-3 bg-[#E8C4C4] text-[#2C2420] px-3 py-1 rounded-full text-xs font-semibold">
                        Sale
                      </div>
                    )}
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleToggleWishlist(e, product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                        isInWishlist(product.id) 
                          ? 'bg-[#E8C4C4] text-[#2C2420]' 
                          : 'bg-white/80 text-[#3A3A3A] hover:bg-white hover:text-[#E8C4C4]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
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
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full soft-shadow transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
