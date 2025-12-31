import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

// Lazy load pages for better performance
const Home = lazy(() => import("@/components/home"));
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const OrderConfirmationPage = lazy(() => import("@/pages/OrderConfirmationPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F9F6F1] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#E8E3DB] border-t-[#D4AF6A] rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body text-[#3A3A3A]">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              
              {/* Cart & Checkout */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              
              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Account */}
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/*" element={<AccountPage />} />
              
              {/* Static Pages (placeholder routes) */}
              <Route path="/about" element={<Home />} />
              <Route path="/blog" element={<Home />} />
              <Route path="/contact" element={<Home />} />
              
              {/* 404 - redirect to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
          
          {/* Global Components */}
          <CartDrawer />
          <Toaster position="top-right" />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
