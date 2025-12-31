import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`}>
        <div
          className="bg-[#FEFDFB] rounded-2xl soft-shadow overflow-hidden group cursor-pointer transition-all duration-300 hover:soft-shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-[#E8E3DB]/20">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Sale Badge */}
            {product.originalPrice && (
              <div className="absolute top-3 left-3 bg-[#E8C4C4] text-[#2C2420] px-3 py-1 rounded-full text-xs font-semibold">
                Sale
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                inWishlist 
                  ? 'bg-[#E8C4C4] text-[#2C2420]' 
                  : 'bg-white/80 text-[#3A3A3A] hover:bg-white hover:text-[#E8C4C4]'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-[#2C2420]/50 flex items-center justify-center">
                <span className="bg-white text-[#2C2420] px-4 py-2 rounded-full font-semibold text-sm">
                  Out of Stock
                </span>
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
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full soft-shadow transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
