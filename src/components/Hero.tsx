import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=2000&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEFDFB]/95 via-[#FEFDFB]/70 to-transparent" />
        <div className="absolute inset-0 noise-texture" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.h1
            className="font-display text-5xl lg:text-7xl font-bold text-[#2C2420] leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          >
            Discover
            <br />
            Serene Luxury
          </motion.h1>

          <motion.p
            className="font-display font-light text-xl lg:text-2xl text-[#3A3A3A] mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          >
            Curated pieces for the discerning home. Quality, calm, and timeless design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-[#D4AF6A] hover:bg-[#c9a560] text-[#2C2420] font-semibold text-base px-10 py-6 rounded-full soft-shadow-lg hover:shadow-[0_15px_30px_-5px_rgba(212,175,106,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
