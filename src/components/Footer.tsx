import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
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
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-full border-[#2C2420]/20 bg-[#FEFDFB] focus:ring-2 focus:ring-[#A8C5D1] focus:border-transparent px-6 py-6 font-body"
              />
              <Button
                type="submit"
                className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold rounded-full px-8 py-6 soft-shadow transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </Button>
            </form>
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
                <a
                  href="#living"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Living Room
                </a>
              </li>
              <li>
                <a
                  href="#bedroom"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Bedroom
                </a>
              </li>
              <li>
                <a
                  href="#dining"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Dining
                </a>
              </li>
              <li>
                <a
                  href="#decor"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Decor
                </a>
              </li>
              <li>
                <a
                  href="#sale"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent text-sm font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#our-story"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#sustainability"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent text-sm font-medium text-[#2C2420] mb-4 uppercase tracking-wider">
              Help
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#contact"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#shipping"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#returns"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="font-body text-[#3A3A3A] hover:text-[#A8C5D1] transition-colors duration-300"
                >
                  FAQ
                </a>
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
