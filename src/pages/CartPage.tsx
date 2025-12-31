import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] noise-texture">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ShoppingBag className="w-24 h-24 text-[#E8E3DB] mx-auto mb-6" />
              <h1 className="font-display text-4xl font-bold text-[#2C2420] mb-4">
                Your Cart is Empty
              </h1>
              <p className="font-body text-lg text-[#3A3A3A] mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/shop">
                <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full px-8 py-6">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1] noise-texture">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="font-display text-4xl font-bold text-[#2C2420] mb-2">
                Shopping Cart
              </h1>
              <p className="font-body text-[#3A3A3A]">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-[#3A3A3A] hover:text-[#E8C4C4]"
            >
              Clear Cart
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#FEFDFB] rounded-2xl p-6 soft-shadow"
                >
                  <div className="flex gap-6">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-28 h-28 object-cover rounded-xl"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-body font-semibold text-lg text-[#2C2420] hover:text-[#A8C5D1] transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-[#3A3A3A]/40 hover:text-[#E8C4C4] transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="font-body text-sm text-[#3A3A3A]/60 mb-4 capitalize">
                        {item.product.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-9 h-9 rounded-full bg-[#F9F6F1] text-[#3A3A3A] flex items-center justify-center hover:bg-[#E8E3DB] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-body font-semibold text-[#2C2420] w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-9 h-9 rounded-full bg-[#F9F6F1] text-[#3A3A3A] flex items-center justify-center hover:bg-[#E8E3DB] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="font-body font-bold text-lg text-[#2C2420]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <p className="font-body text-sm text-[#3A3A3A]/60">
                              ${item.product.price} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Continue Shopping */}
              <Link to="/shop">
                <Button
                  variant="ghost"
                  className="text-[#3A3A3A] hover:text-[#2C2420] font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#FEFDFB] rounded-2xl p-6 soft-shadow sticky top-28">
                <h2 className="font-display text-2xl font-bold text-[#2C2420] mb-6">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="font-body text-sm text-[#3A3A3A] block mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 rounded-full"
                    />
                    <Button
                      variant="outline"
                      className="rounded-full px-6"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 pb-6 border-b border-[#E8E3DB]">
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#A8C5D1]">
                      Free shipping on orders over $100
                    </p>
                  )}
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-display text-2xl font-bold text-[#2C2420] py-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link to="/checkout">
                  <Button className="w-full bg-[#D4AF6A] hover:bg-[#D4AF6A]/90 text-[#2C2420] font-semibold rounded-full py-6 soft-shadow transition-all duration-300 hover:scale-[1.02]">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t border-[#E8E3DB]">
                  <div className="flex items-center justify-center gap-4 text-[#3A3A3A]/60 text-sm">
                    <span>🔒 Secure Checkout</span>
                    <span>📦 Free Returns</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
