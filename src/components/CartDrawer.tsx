import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

export default function CartDrawer() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity,
    itemCount,
    subtotal,
    shipping,
    total
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#2C2420]/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FEFDFB] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8E3DB]">
              <h2 className="font-display text-2xl font-bold text-[#2C2420]">
                Your Cart ({itemCount})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-[#3A3A3A] hover:text-[#2C2420] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-[#E8E3DB] mb-4" />
                  <h3 className="font-display text-xl font-bold text-[#2C2420] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-body text-[#3A3A3A] mb-6">
                    Looks like you haven't added anything yet
                  </p>
                  <Link to="/shop" onClick={closeCart}>
                    <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full px-8">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 bg-[#F9F6F1] p-4 rounded-xl"
                    >
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                        >
                          <h4 className="font-body font-semibold text-[#2C2420] line-clamp-1 hover:text-[#A8C5D1] transition-colors">
                            {item.product.name}
                          </h4>
                        </Link>
                        <p className="font-body text-sm text-[#3A3A3A]/60 mb-2">
                          ${item.product.price} each
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-full bg-white text-[#3A3A3A] flex items-center justify-center hover:bg-[#E8E3DB] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-body font-semibold text-[#2C2420] w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-full bg-white text-[#3A3A3A] flex items-center justify-center hover:bg-[#E8E3DB] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-body font-bold text-[#2C2420]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="flex-shrink-0 p-1 text-[#3A3A3A]/40 hover:text-[#E8C4C4] transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#E8E3DB] p-6 bg-[#F9F6F1]">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-[#3A3A3A]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#A8C5D1]">
                      Free shipping on orders over $100
                    </p>
                  )}
                </div>
                <div className="flex justify-between font-display text-xl font-bold text-[#2C2420] mb-4 pt-2 border-t border-[#E8E3DB]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={closeCart}>
                  <Button className="w-full bg-[#D4AF6A] hover:bg-[#D4AF6A]/90 text-[#2C2420] font-semibold rounded-full py-6 soft-shadow transition-all duration-300 hover:scale-[1.02]">
                    Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/cart" onClick={closeCart}>
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-[#3A3A3A] hover:text-[#2C2420] font-semibold"
                  >
                    View Full Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
