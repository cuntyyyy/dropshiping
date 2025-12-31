import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, updateProfile } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('orders')) return 'orders';
    if (path.includes('wishlist')) return 'wishlist';
    if (path.includes('addresses')) return 'addresses';
    if (path.includes('settings')) return 'settings';
    return 'profile';
  });

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] noise-texture">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-6 py-24 text-center">
            <User className="w-24 h-24 text-[#E8E3DB] mx-auto mb-6" />
            <h1 className="font-display text-4xl font-bold text-[#2C2420] mb-4">
              Sign in to Your Account
            </h1>
            <p className="font-body text-lg text-[#3A3A3A] mb-8">
              View your orders, manage your wishlist, and update your preferences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full px-8">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="rounded-full px-8 border-[#2C2420] text-[#2C2420]"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlistItems.length },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Mock orders data
  const orders = [
    {
      id: 'WA-001234',
      date: '2024-02-10',
      status: 'Delivered',
      total: 459.99,
      items: 3,
    },
    {
      id: 'WA-001189',
      date: '2024-01-28',
      status: 'Processing',
      total: 189.00,
      items: 1,
    },
  ];

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
            className="mb-8"
          >
            <h1 className="font-display text-4xl font-bold text-[#2C2420] mb-2">
              My Account
            </h1>
            <p className="font-body text-[#3A3A3A]">
              Welcome back, {user?.name}!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#FEFDFB] rounded-2xl p-4 soft-shadow sticky top-28">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#F9F6F1] text-[#2C2420]'
                          : 'text-[#3A3A3A] hover:bg-[#F9F6F1]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon className="w-5 h-5" />
                        <span className="font-body font-medium">{tab.label}</span>
                      </div>
                      {tab.count !== undefined && tab.count > 0 && (
                        <span className="bg-[#D4AF6A] text-[#2C2420] text-xs font-semibold px-2 py-0.5 rounded-full">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#E8C4C4] hover:bg-[#E8C4C4]/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-body font-medium">Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#FEFDFB] rounded-2xl p-8 soft-shadow"
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#2C2420] mb-6">
                      Profile Information
                    </h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 rounded-xl"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full px-8"
                      >
                        Save Changes
                      </Button>
                    </form>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#2C2420] mb-6">
                      Order History
                    </h2>
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-[#E8E3DB] mx-auto mb-4" />
                        <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                          No orders yet
                        </h3>
                        <p className="font-body text-[#3A3A3A] mb-6">
                          Start shopping to see your orders here
                        </p>
                        <Link to="/shop">
                          <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full px-8">
                            Start Shopping
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 bg-[#F9F6F1] rounded-xl hover:bg-[#E8E3DB]/50 transition-colors cursor-pointer"
                          >
                            <div>
                              <p className="font-body font-semibold text-[#2C2420]">
                                {order.id}
                              </p>
                              <p className="font-body text-sm text-[#3A3A3A]/60">
                                {new Date(order.date).toLocaleDateString()} • {order.items} items
                              </p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                              <div>
                                <span
                                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    order.status === 'Delivered'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-[#D4AF6A]/20 text-[#D4AF6A]'
                                  }`}
                                >
                                  {order.status}
                                </span>
                                <p className="font-body font-bold text-[#2C2420] mt-1">
                                  ${order.total.toFixed(2)}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-[#3A3A3A]/40" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#2C2420] mb-6">
                      My Wishlist
                    </h2>
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-[#E8E3DB] mx-auto mb-4" />
                        <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                          Your wishlist is empty
                        </h3>
                        <p className="font-body text-[#3A3A3A] mb-6">
                          Save items you love by clicking the heart icon
                        </p>
                        <Link to="/shop">
                          <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full px-8">
                            Discover Products
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((product, index) => (
                          <ProductCard key={product.id} product={product} index={index} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-2xl font-bold text-[#2C2420]">
                        Saved Addresses
                      </h2>
                      <Button className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full">
                        Add Address
                      </Button>
                    </div>
                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-[#E8E3DB] mx-auto mb-4" />
                      <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                        No addresses saved
                      </h3>
                      <p className="font-body text-[#3A3A3A]">
                        Add an address for faster checkout
                      </p>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#2C2420] mb-6">
                      Account Settings
                    </h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-[#F9F6F1] rounded-xl">
                        <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                          Email Notifications
                        </h3>
                        <p className="font-body text-sm text-[#3A3A3A]">
                          Manage your email preferences and subscriptions
                        </p>
                      </div>
                      <div className="p-4 bg-[#F9F6F1] rounded-xl">
                        <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                          Password
                        </h3>
                        <p className="font-body text-sm text-[#3A3A3A] mb-3">
                          Change your password to keep your account secure
                        </p>
                        <Button variant="outline" className="rounded-full">
                          Change Password
                        </Button>
                      </div>
                      <div className="p-4 bg-[#E8C4C4]/10 border border-[#E8C4C4] rounded-xl">
                        <h3 className="font-body font-semibold text-[#2C2420] mb-2">
                          Delete Account
                        </h3>
                        <p className="font-body text-sm text-[#3A3A3A] mb-3">
                          Permanently delete your account and all associated data
                        </p>
                        <Button
                          variant="outline"
                          className="rounded-full border-[#E8C4C4] text-[#E8C4C4] hover:bg-[#E8C4C4] hover:text-white"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
