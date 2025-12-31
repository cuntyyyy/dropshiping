import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#E8E3DB] border-t border-[#E8E3DB]/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Newsletter Section */}
        <motion.div
          className="mb-16 pb-16 border-b border-[#2C2420]/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-3xl font-bold text-[#2C2420] mb-3">
              Join Our Community
            </h3>
            <p className="font-body text-[#3A3A3A] mb-6">
              Subscribe for exclusive offers, design tips, and early access to new collections
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-green-600"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-body font-semibold">Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 rounded-full border-[#2C2420]/20 bg-[#FEFDFB] focus:ring-2 focus:ring-[#A8C5D1] focus:border-transparent px-6 py-6 font-body"
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full px-8 py-6 soft-shadow transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <h4 className="font-accent text-sm font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shop?category=living"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Living Room
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=bedroom"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Bedroom
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=dining"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Dining
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=decor"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Decor
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent text-sm font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent text-sm font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Help
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent text-sm font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#facebook"
                className="w-10 h-10 rounded-full bg-[#FEFDFB] flex items-center justify-center text-[#3A3A3A] hover:text-[#A8C5D1] hover:bg-white transition-all duration-300 soft-shadow"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#instagram"
                className="w-10 h-10 rounded-full bg-[#FEFDFB] flex items-center justify-center text-[#3A3A3A] hover:text-[#A8C5D1] hover:bg-white transition-all duration-300 soft-shadow"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#twitter"
                className="w-10 h-10 rounded-full bg-[#FEFDFB] flex items-center justify-center text-[#3A3A3A] hover:text-[#A8C5D1] hover:bg-white transition-all duration-300 soft-shadow"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#youtube"
                className="w-10 h-10 rounded-full bg-[#FEFDFB] flex items-center justify-center text-[#3A3A3A] hover:text-[#A8C5D1] hover:bg-white transition-all duration-300 soft-shadow"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2C2420]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-[#3A3A3A]">
            © 2024 Wish Area. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="font-body text-sm text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="font-body text-sm text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
