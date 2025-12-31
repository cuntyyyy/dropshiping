import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] noise-texture">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
            <h1 className="font-display text-4xl font-bold text-[#2C2420] mb-4">
              Product Not Found
            </h1>
            <p className="font-body text-[#3A3A3A] mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/shop">
              <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#F9F6F1] noise-texture">
      <Header />

      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <nav className="flex items-center gap-2 text-sm font-body text-[#3A3A3A]">
            <Link to="/" className="hover:text-[#A8C5D1] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-[#A8C5D1] transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to={`/shop?category=${product.category}`}
              className="hover:text-[#A8C5D1] transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2C2420] font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#E8E3DB]/20 mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-[#E8C4C4] text-[#2C2420] px-4 py-2 rounded-full font-semibold">
                    -{discount}%
                  </div>
                )}
                <button
                  onClick={() => toggleItem(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                    inWishlist
                      ? 'bg-[#E8C4C4] text-[#2C2420]'
                      : 'bg-white/80 text-[#3A3A3A] hover:bg-white hover:text-[#E8C4C4]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>

                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#2C2420]" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-[#2C2420]" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden transition-all ${
                        selectedImage === index
                          ? 'ring-2 ring-[#A8C5D1] ring-offset-2'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:py-4"
            >
              <div className="space-y-6">
                {/* Title & Rating */}
                <div>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#2C2420] mb-4">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-[#D4AF6A] text-[#D4AF6A]'
                              : 'text-[#E8E3DB]'
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-body font-medium text-[#3A3A3A]">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-[#3A3A3A]/60">|</span>
                    <span className="font-body text-[#3A3A3A]/60">
                      {product.reviews} reviews
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-bold text-[#2C2420]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="font-body text-xl text-[#3A3A3A]/50 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-[#E8C4C4] text-[#2C2420] px-3 py-1 rounded-full text-sm font-semibold">
                        Save ${product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="font-body text-lg text-[#3A3A3A] leading-relaxed">
                  {product.description}
                </p>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      product.inStock ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="font-body text-sm text-[#3A3A3A]">
                    {product.inStock
                      ? `In Stock (${product.stockCount} available)`
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* Quantity */}
                <div>
                  <label className="font-body font-semibold text-[#2C2420] block mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-[#E8E3DB]/50 rounded-full">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-3 hover:bg-[#E8E3DB] rounded-l-full transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-5 h-5 text-[#3A3A3A]" />
                      </button>
                      <span className="font-body font-semibold text-[#2C2420] w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity((q) => Math.min(product.stockCount, q + 1))
                        }
                        className="p-3 hover:bg-[#E8E3DB] rounded-r-full transition-colors"
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="w-5 h-5 text-[#3A3A3A]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full py-6 soft-shadow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="flex-1 bg-[#D4AF6A] hover:bg-[#D4AF6A]/90 text-[#2C2420] font-semibold rounded-full py-6 soft-shadow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8E3DB]">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-[#A8C5D1] mx-auto mb-2" />
                    <span className="font-body text-sm text-[#3A3A3A]">
                      Free Shipping
                    </span>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-[#A8C5D1] mx-auto mb-2" />
                    <span className="font-body text-sm text-[#3A3A3A]">
                      Secure Payment
                    </span>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-[#A8C5D1] mx-auto mb-2" />
                    <span className="font-body text-sm text-[#3A3A3A]">
                      30-Day Returns
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b border-[#E8E3DB] bg-transparent h-auto p-0 gap-8">
              <TabsTrigger
                value="description"
                className="font-accent text-base data-[state=active]:text-[#2C2420] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF6A] rounded-none pb-4 px-0"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="font-accent text-base data-[state=active]:text-[#2C2420] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF6A] rounded-none pb-4 px-0"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="font-accent text-base data-[state=active]:text-[#2C2420] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF6A] rounded-none pb-4 px-0"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-8">
              <div className="prose max-w-none">
                <p className="font-body text-lg text-[#3A3A3A] leading-relaxed">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-8">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b border-[#E8E3DB]">
                  <dt className="font-body text-[#3A3A3A]/60">Category</dt>
                  <dd className="font-body font-medium text-[#2C2420] capitalize">
                    {product.category}
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8E3DB]">
                  <dt className="font-body text-[#3A3A3A]/60">SKU</dt>
                  <dd className="font-body font-medium text-[#2C2420]">
                    {product.id.toUpperCase()}
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8E3DB]">
                  <dt className="font-body text-[#3A3A3A]/60">Availability</dt>
                  <dd className="font-body font-medium text-[#2C2420]">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8E3DB]">
                  <dt className="font-body text-[#3A3A3A]/60">Tags</dt>
                  <dd className="font-body font-medium text-[#2C2420]">
                    {product.tags.join(', ')}
                  </dd>
                </div>
              </dl>
            </TabsContent>
            <TabsContent value="reviews" className="pt-8">
              <p className="font-body text-[#3A3A3A]">
                Customer reviews coming soon. Be the first to leave a review!
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <h2 className="font-display text-3xl font-bold text-[#2C2420] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
