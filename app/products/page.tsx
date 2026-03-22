"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

export default function ProductsPage() {
  const { products, categories } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortOrder, setSortOrder] = useState("default");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMounted(true);
    // Parse search from URL safely on client side
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, []);

  if (!mounted) return null;

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "Tất cả" && product.category !== selectedCategory) return false;
    
    // Search Term Match (bB Name or Category)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = product.name.toLowerCase().includes(term);
      const matchCategory = product.category.toLowerCase().includes(term);
      if (!matchName && !matchCategory) return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Cửa hàng đặc sản</span>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 mb-6 tracking-tighter italic">
            Tinh hoa <span className="text-primary">Đà Nẵng</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
            Khám phá bộ sưu tập đặc sản chính gốc, được tuyển chọn khắt khe từ những làng nghề truyền thống lâu đời nhất Quảng Nam - Đà Nẵng.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 mb-6">
            <span className="font-black text-slate-800 uppercase tracking-wider">Bộ lọc sản phẩm</span>
            <button 
              onClick={() => setShowMobileFilter(!showMobileFilter)} 
              className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 transition-transform active:scale-90"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Filters */}
          <aside className={`${showMobileFilter ? 'fixed inset-0 z-50 bg-white p-10 overflow-y-auto' : 'hidden'} lg:block w-full lg:w-1/4 space-y-10 lg:sticky lg:top-32 h-fit`}>
            {showMobileFilter && (
              <div className="flex justify-between items-center mb-10 lg:hidden">
                <h2 className="text-3xl font-heading font-black">Bộ Lọc</h2>
                <button onClick={() => setShowMobileFilter(false)} className="text-4xl font-light text-gray-400">&times;</button>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100/50">
              <h3 className="font-heading font-black text-slate-900 text-xl mb-8 flex items-center gap-3">
                <Filter className="w-5 h-5 text-primary" /> Danh Mục
              </h3>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (showMobileFilter) setShowMobileFilter(false);
                    }}
                    className={`group w-full text-left px-5 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-between ${
                      selectedCategory === cat 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 translate-x-1" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-primary hover:translate-x-1"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {selectedCategory === cat && <motion.span layoutId="activeCat" className="w-1.5 h-1.5 rounded-full bg-white" />}
                      {cat}
                    </span>
                    <span className={`text-[10px] uppercase tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity ${selectedCategory === cat ? 'text-white' : 'text-gray-400'}`}>
                      {products.filter(p => cat === "Tất cả" || p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Sort */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100/50">
              <h3 className="font-heading font-black text-slate-900 text-xl mb-8 flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-primary" /> Sắp Xếp
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { id: "default", label: "Mặc định ✨" },
                  { id: "asc", label: "Giá thấp → cao 📈" },
                  { id: "desc", label: "Giá cao → thấp 📉" }
                ].map((sort) => (
                  <label key={sort.id} className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="priceSort"
                        checked={sortOrder === sort.id}
                        onChange={() => setSortOrder(sort.id)}
                        className="peer hidden"
                      />
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className={`font-bold transition-colors ${sortOrder === sort.id ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>
                      {sort.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div className="bg-white px-8 py-4 rounded-full shadow-sm border border-gray-100 font-bold text-slate-500 text-sm">
                Đang hiển thị <span className="text-primary font-black mx-1">{filteredProducts.length}</span> sản phẩm cao cấp
              </div>
              
              {searchTerm && (
                <div className="flex items-center gap-3 bg-secondary/10 px-6 py-4 rounded-full border border-secondary/20">
                  <span className="text-xs font-black text-secondary uppercase tracking-widest">Tìm kiếm:</span>
                  <span className="font-bold text-primary italic">"{searchTerm}"</span>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      window.history.replaceState({}, '', '/products');
                    }}
                    className="ml-2 w-5 h-5 bg-secondary text-white rounded-full flex items-center justify-center text-[10px]"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-40 bg-white rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-10 shadow-inner group overflow-hidden">
                  <span className="text-6xl group-hover:scale-125 transition-transform">🥡</span>
                </div>
                <h3 className="text-3xl font-heading font-black text-slate-900 mb-6">
                  {searchTerm ? `Oh! Không tìm thấy "${searchTerm}"` : "Hết hàng tạm thời!"}
                </h3>
                <p className="text-gray-500 text-lg max-w-sm mb-12 font-medium leading-relaxed">
                  Đặc sản này có vẻ đang rất hiếm. Hãy thử một từ khóa khác hoặc quay lại danh mục tất cả sản phẩm nhé!
                </p>
                <button 
                  onClick={() => { 
                    setSelectedCategory("Tất cả"); 
                    setSortOrder("default"); 
                    setSearchTerm("");
                    window.history.replaceState({}, '', '/products');
                  }}
                  className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-2xl hover:scale-105 active:scale-95 text-sm uppercase tracking-[0.2em]"
                >
                  HIỂN THỊ TẤT CẢ
                </button>
              </motion.div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}
