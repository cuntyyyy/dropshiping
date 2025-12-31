import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Creating Calm Spaces: The Art of Minimalist Living',
    excerpt: 'Discover how less can truly be more when it comes to designing your perfect sanctuary.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Sustainable Materials: Beauty That Lasts',
    excerpt: 'Explore our commitment to eco-friendly materials and timeless craftsmanship.',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&q=80',
    date: 'Nov 10, 2024',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Color Psychology in Interior Design',
    excerpt: 'Learn how warm neutrals and soft tones can transform your emotional well-being.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    date: 'Nov 5, 2024',
    readTime: '6 min read',
  },
];

export default function BlogTeaser() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#F9F6F1]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#2C2420] mb-4">
            Stories & Inspiration
          </h2>
          <p className="font-body text-lg text-[#3A3A3A] max-w-2xl mx-auto">
            Thoughtful insights on living well and creating spaces you love
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={`#article-${article.id}`}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <article className="bg-[#FEFDFB] rounded-2xl soft-shadow overflow-hidden transition-all duration-300 hover:soft-shadow-lg hover:translate-y-[-4px]">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E3DB]/20">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-[#3A3A3A]/60 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#2C2420] mb-3 line-clamp-2 group-hover:text-[#A8C5D1] transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="font-body text-[#3A3A3A] mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center text-[#A8C5D1] font-body font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
