import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Living',
    slug: 'living',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  },
  {
    name: 'Dining',
    slug: 'dining',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  },
  {
    name: 'Decor',
    slug: 'decor',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.h2
        className="font-display text-4xl lg:text-5xl font-bold text-[#2C2420] mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Shop by Room
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {categories.map((category, index) => (
          <Link key={category.name} to={`/shop?category=${category.slug}`}>
            <motion.div
              className="group relative overflow-hidden rounded-3xl soft-shadow aspect-[3/4] cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-accent text-2xl font-medium text-white group-hover:text-[#A8C5D1] transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
