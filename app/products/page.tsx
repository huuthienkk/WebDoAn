"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

export default function ProductsPage() {
  const { products, categories } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortOrder, setSortOrder] = useState("default");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "Tất cả" && product.category !== selectedCategory) return false;
    return true;
  }).sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Tất Cả Sản Phẩm</h1>
          <p className="text-gray-600 text-lg">Tuyển chọn các đặc sản nổi tiếng nhất Đà Nẵng, gửi trọn hương vị miền Trung.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
            <span className="font-bold text-textDefault text-lg">Lọc Sản Phẩm</span>
            <button onClick={() => setShowMobileFilter(!showMobileFilter)} className="p-3 bg-gray-100 rounded-xl text-primary hover:bg-primary/10 transition-colors">
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Left Sidebar (Filters) */}
          <aside className={`${showMobileFilter ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-32`}>
            {/* Danh mục */}
            <div>
              <h3 className="font-extrabold text-textDefault text-xl mb-5 pb-4 border-b-2 border-gray-100 flex items-center gap-3">
                <Filter className="w-5 h-5 text-secondary" /> Danh Mục
              </h3>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left font-semibold transition-all flex items-center gap-2 ${
                        selectedCategory === cat ? "text-primary translate-x-1" : "text-gray-500 hover:text-secondary hover:translate-x-1"
                      }`}
                    >
                      {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Giá */}
            <div>
              <h3 className="font-extrabold text-textDefault text-xl mb-5 pb-4 border-b-2 border-gray-100 flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-secondary" /> Mức Giá
              </h3>
              <div className="flex flex-col space-y-4">
                <label className="flex items-center space-x-4 cursor-pointer group">
                  <input
                    type="radio"
                    name="priceSort"
                    checked={sortOrder === "default"}
                    onChange={() => setSortOrder("default")}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded-full"
                  />
                  <span className="text-gray-600 group-hover:text-primary transition-colors font-semibold">Mặc định</span>
                </label>
                <label className="flex items-center space-x-4 cursor-pointer group">
                  <input
                    type="radio"
                    name="priceSort"
                    checked={sortOrder === "asc"}
                    onChange={() => setSortOrder("asc")}
                    className="w-5 h-5 text-primary border-gray-300 rounded-full"
                  />
                  <span className="text-gray-600 group-hover:text-primary transition-colors font-semibold">Thấp đến cao</span>
                </label>
                <label className="flex items-center space-x-4 cursor-pointer group">
                  <input
                    type="radio"
                    name="priceSort"
                    checked={sortOrder === "desc"}
                    onChange={() => setSortOrder("desc")}
                    className="w-5 h-5 text-primary border-gray-300 rounded-full"
                  />
                  <span className="text-gray-600 group-hover:text-primary transition-colors font-semibold">Cao đến thấp</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right Content (Product Grid) */}
          <main className="lg:w-3/4">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center text-gray-500 font-medium">
              <span>Đang hiển thị <span className="text-primary font-black text-lg mx-1">{filteredProducts.length}</span> sản phẩm</span>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl text-gray-400">🔍</span>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-400 mb-4">Không tìm thấy sản phẩm!</h3>
                <p className="text-gray-500 text-lg max-w-sm mb-8">Rất tiếc, không có sản phẩm nào phù hợp với bộ lọc hiện tại của bạn.</p>
                <button 
                  onClick={() => { setSelectedCategory("Tất cả"); setSortOrder("default"); }}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-red-800 transition-colors shadow-lg"
                >
                  Xóa bỏ lộc filters
                </button>
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}
