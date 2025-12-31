import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { searchProducts } from '@/data/products';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchProducts(query);
      setResults(searchResults.slice(0, 6));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#2C2420]/60 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8"
          >
            <div className="max-w-2xl mx-auto bg-[#FEFDFB] rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-4 p-4 border-b border-[#E8E3DB]">
                <Search className="w-6 h-6 text-[#A8C5D1]" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 border-none focus-visible:ring-0 text-lg font-body placeholder:text-[#3A3A3A]/40"
                />
                <button
                  onClick={handleClose}
                  className="p-2 text-[#3A3A3A] hover:text-[#2C2420] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.length < 2 ? (
                  <div className="p-8 text-center">
                    <p className="font-body text-[#3A3A3A]/60">
                      Type at least 2 characters to search
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="font-body text-[#3A3A3A]">
                      No products found for "{query}"
                    </p>
                    <Link
                      to="/shop"
                      onClick={handleClose}
                      className="inline-flex items-center gap-2 mt-4 text-[#A8C5D1] hover:text-[#2C2420] font-semibold transition-colors"
                    >
                      Browse all products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 space-y-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F9F6F1] transition-colors group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-body font-semibold text-[#2C2420] line-clamp-1 group-hover:text-[#A8C5D1] transition-colors">
                            {product.name}
                          </h4>
                          <p className="font-body text-sm text-[#3A3A3A]/60">
                            {product.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-body font-bold text-[#2C2420]">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="block font-body text-xs text-[#3A3A3A]/50 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                    <Link
                      to={`/shop?search=${encodeURIComponent(query)}`}
                      onClick={handleClose}
                      className="flex items-center justify-center gap-2 p-3 text-[#A8C5D1] hover:text-[#2C2420] font-semibold transition-colors"
                    >
                      View all results
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
