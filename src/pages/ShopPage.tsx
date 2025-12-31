import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { products, categories } from '@/data/products';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    setSearchParams(params);
  }, [selectedCategory, searchQuery, sortBy, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.includes(query))
      );
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 2000]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('newest');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000 ||
    minRating > 0 ||
    inStockOnly ||
    searchQuery;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <Label className="text-[#2C2420] font-semibold mb-3 block">
          Category
        </Label>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              !selectedCategory
                ? 'bg-[#A8C5D1]/20 text-[#2C2420] font-medium'
                : 'text-[#3A3A3A] hover:bg-[#F9F6F1]'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#A8C5D1]/20 text-[#2C2420] font-medium'
                  : 'text-[#3A3A3A] hover:bg-[#F9F6F1]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-[#2C2420] font-semibold mb-3 block">
          Price Range
        </Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={2000}
          step={50}
          className="mb-4"
        />
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-24"
            min={0}
            max={priceRange[1]}
          />
          <span className="text-[#3A3A3A]">to</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-24"
            min={priceRange[0]}
            max={2000}
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <Label className="text-[#2C2420] font-semibold mb-3 block">
          Minimum Rating
        </Label>
        <div className="space-y-2">
          {[0, 4, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                minRating === rating
                  ? 'bg-[#A8C5D1]/20 text-[#2C2420] font-medium'
                  : 'text-[#3A3A3A] hover:bg-[#F9F6F1]'
              }`}
            >
              {rating === 0 ? 'All Ratings' : `${rating}+ stars`}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
        />
        <label
          htmlFor="inStock"
          className="text-sm font-medium text-[#2C2420] cursor-pointer"
        >
          In Stock Only
        </label>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full rounded-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F6F1] noise-texture">
      <Header />

      <main className="pt-24 pb-16">
        {/* Page Header */}
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-12 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#2C2420] mb-4">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name ||
                'Shop'
              : 'Shop All'}
          </h1>
          <p className="font-body text-lg text-[#3A3A3A]">
            {filteredProducts.length} products
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E8E3DB]">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden rounded-full"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 w-5 h-5 bg-[#D4AF6A] text-[#2C2420] text-xs font-bold rounded-full flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="font-display text-xl">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Search */}
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 md:w-64 rounded-full"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Grid Toggle */}
              <div className="hidden md:flex items-center gap-1 bg-[#E8E3DB]/50 rounded-full p-1">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-full transition-colors ${
                    gridCols === 3
                      ? 'bg-white text-[#2C2420] shadow-sm'
                      : 'text-[#3A3A3A]/60 hover:text-[#3A3A3A]'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-full transition-colors ${
                    gridCols === 4
                      ? 'bg-white text-[#2C2420] shadow-sm'
                      : 'text-[#3A3A3A]/60 hover:text-[#3A3A3A]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="font-display text-2xl font-bold text-[#2C2420] mb-2">
                    No products found
                  </h3>
                  <p className="font-body text-[#3A3A3A] mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-[#2C2420] hover:bg-[#3A3A3A] text-white rounded-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div
                  className={`grid gap-6 ${
                    gridCols === 3
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`}
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
