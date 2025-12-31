import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Mail, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const { orderId, total } = (location.state as { orderId?: string; total?: number }) || {};

  return (
    <div className="min-h-screen bg-[#F9F6F1] noise-texture">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-display text-4xl font-bold text-[#2C2420] mb-4">
              Thank You for Your Order!
            </h1>
            <p className="font-body text-lg text-[#3A3A3A] mb-8">
              Your order has been placed successfully. We'll send you a confirmation email shortly.
            </p>

            {orderId && (
              <div className="bg-[#FEFDFB] rounded-2xl p-6 soft-shadow mb-8">
                <div className="flex items-center justify-center gap-8">
                  <div>
                    <p className="font-body text-sm text-[#3A3A3A]/60 mb-1">Order Number</p>
                    <p className="font-display text-xl font-bold text-[#2C2420]">{orderId}</p>
                  </div>
                  {total && (
                    <>
                      <div className="w-px h-12 bg-[#E8E3DB]" />
                      <div>
                        <p className="font-body text-sm text-[#3A3A3A]/60 mb-1">Total Amount</p>
                        <p className="font-display text-xl font-bold text-[#2C2420]">
                          ${total.toFixed(2)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <div className="bg-[#FEFDFB] rounded-xl p-6 soft-shadow">
                <Mail className="w-8 h-8 text-[#A8C5D1] mx-auto mb-3" />
                <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                  Confirmation Email
                </h3>
                <p className="font-body text-sm text-[#3A3A3A]">
                  A confirmation email with order details will be sent to your inbox.
                </p>
              </div>
              <div className="bg-[#FEFDFB] rounded-xl p-6 soft-shadow">
                <Package className="w-8 h-8 text-[#A8C5D1] mx-auto mb-3" />
                <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                  Shipping Updates
                </h3>
                <p className="font-body text-sm text-[#3A3A3A]">
                  We'll notify you when your order ships with tracking information.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop">
                <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full px-8">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/account/orders">
                <Button
                  variant="outline"
                  className="rounded-full px-8 border-[#2C2420] text-[#2C2420]"
                >
                  View Order History
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
