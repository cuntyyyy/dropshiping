import { useState, useEffect } from 'react';
import { Search, User, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
        <a href="/" className="flex items-center">
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#2C2420] tracking-tight">
            Wish Area
          </h1>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <a
            href="#shop"
            className="font-accent text-[15px] font-medium text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
          >
            Shop
          </a>
          <a
            href="#collections"
            className="font-accent text-[15px] font-medium text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
          >
            Collections
          </a>
          <a
            href="#about"
            className="font-accent text-[15px] font-medium text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#blog"
            className="font-accent text-[15px] font-medium text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
          >
            Blog
          </a>
        </nav>

        {/* Icon Trio */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button
            className="p-2 text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF6A] text-[#2C2420] text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
