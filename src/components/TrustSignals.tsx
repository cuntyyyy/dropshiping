import { motion } from 'framer-motion';
import { Truck, Shield, Headphones, RefreshCcw } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $200',
  },
  {
    icon: Shield,
    title: 'Secure Checkout',
    description: 'Protected payments',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
];

export default function TrustSignals() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-[#E8E3DB]/40 to-[#F9F6F1] rounded-3xl soft-inset p-12 lg:p-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#A8C5D1]/20 mb-4">
                    <Icon className="w-6 h-6 text-[#2C2420]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-body font-semibold text-base text-[#2C2420] mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-[#3A3A3A]/70">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
