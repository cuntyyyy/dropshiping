import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl soft-shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A8C5D1]/30 via-[#E8E3DB]/50 to-[#D4AF6A]/20" />
          <div className="absolute inset-0 noise-texture opacity-30" />

          {/* Content */}
          <div className="relative z-10 py-20 lg:py-28 px-8 lg:px-16 text-center">
            <motion.h2
              className="font-display text-4xl lg:text-6xl font-bold text-[#2C2420] mb-6 max-w-3xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              New Season Collection
            </motion.h2>
            <motion.p
              className="font-body text-lg lg:text-xl text-[#3A3A3A] mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Embrace the warmth of autumn with our handpicked selection of cozy essentials
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white font-semibold text-base px-10 py-6 rounded-full soft-shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Shop New Arrivals
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
