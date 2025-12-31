import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import SearchModal from '@/components/SearchModal';

export default function Header() {
  const navigate = useNavigate();
  const { itemCount, toggleCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop?category=living', label: 'Collections' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ];

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FEFDFB]/80 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 lg:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#2C2420] tracking-tight">
              Wish Area
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-accent text-[15px] font-medium text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icon Trio */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={handleUserClick}
              className="p-2 text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCart}
              className="p-2 text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#D4AF6A] text-[#2C2420] text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FEFDFB] border-t border-[#E8E3DB]"
            >
              <nav className="px-6 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-accent text-base font-medium text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
