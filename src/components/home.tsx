import Header from './Header';
import Hero from './Hero';
import FeaturedCategories from './FeaturedCategories';
import BestSellers from './BestSellers';
import TrustSignals from './TrustSignals';
import PromoBanner from './PromoBanner';
import BlogTeaser from './BlogTeaser';
import Footer from './Footer';

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#F9F6F1] noise-texture">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <BestSellers />
        <TrustSignals />
        <PromoBanner />
        <BlogTeaser />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
