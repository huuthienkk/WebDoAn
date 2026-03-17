"use client";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import AboutVideoSection from "@/components/AboutVideoSection";
import { useProductStore } from "@/store/useProductStore";
import { DrumPattern, ChimLac } from "@/components/DongSonDecor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, categories } = useProductStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <>
      <Hero />
      
      {/* Video About Section */}
      <AboutVideoSection />
      
      {/* Featured Categories - Grid tinh tế */}
      <section id="featured-categories" className="py-24 bg-background relative overflow-hidden">
        {/* Background Decorative Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.08] text-primary translate-x-1/3 -translate-y-1/3 pointer-events-none">
          <DrumPattern className="w-full h-full" />
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-20 text-secondary pointer-events-none">
          <ChimLac className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 left-4 w-32 h-32 opacity-15 text-primary pointer-events-none -rotate-12">
          <ChimLac className="w-full h-full" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Danh Mục Nổi Bật</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Lựa chọn những món quà ý nghĩa nhất từ danh mục đặc sản phong phú của Đà Nẵng, 
              chuẩn vị miền Trung, chất lượng cao cấp.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.filter(c => c !== "Tất cả").map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative cursor-pointer"
              >
                <div className="h-56 rounded-[2rem] overflow-hidden relative shadow-lg bg-white border border-gray-100 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-15px_rgba(235,173,48,0.3)] group-hover:border-secondary">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10 group-hover:to-secondary/10 transition-colors" />
                  <div className="z-20 text-center w-full px-6">
                    <h3 className="text-textDefault font-extrabold text-2xl group-hover:text-primary transition-colors duration-300">
                      {category}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-20"></div>
        
        {/* Background Decorative Patterns */}
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] opacity-[0.06] text-primary -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <DrumPattern className="w-full h-full animate-[spin_120s_linear_infinite]" />
        </div>
        <div className="absolute bottom-20 right-10 w-40 h-40 opacity-20 text-secondary pointer-events-none rotate-45">
          <ChimLac className="w-full h-full" />
        </div>
        <div className="absolute top-20 right-20 w-32 h-32 opacity-15 text-primary pointer-events-none -rotate-12">
          <ChimLac className="w-full h-full" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">Sản Phẩm Tiêu Biểu</h2>
              <p className="text-gray-500 text-lg font-medium">Những món quà được yêu thích nhất từ khách hàng.</p>
            </div>
            <a href="/products" className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:text-red-800 transition-colors bg-primary/5 px-6 py-3 rounded-full hover:bg-primary/10">
              Xem tất cả <span className="text-xl">&rarr;</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <a href="/products" className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-red-800 transition-colors shadow-lg">
              Xem tất cả sản phẩm
            </a>
          </div>
        </div>
      </section>
      
      {/* Testimonial / Story Section (Bonus for UI WOW factor) */}
      <section className="py-32 bg-primary text-white relative flex items-center justify-center overflow-hidden">
        {/* Background Decorative Patterns */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] opacity-[0.12] text-white -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <DrumPattern className="w-full h-full animate-[spin_100s_linear_infinite]" />
        </div>
        <div className="absolute top-12 left-12 w-48 h-48 opacity-25 text-secondary pointer-events-none rotate-12">
          <ChimLac className="w-full h-full" />
        </div>
        <div className="absolute bottom-12 right-12 w-48 h-48 opacity-25 text-secondary pointer-events-none -rotate-12">
          <ChimLac className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 right-10 w-32 h-32 opacity-20 text-white pointer-events-none rotate-45">
          <ChimLac className="w-full h-full" />
        </div>
        <div className="absolute bottom-1/3 left-10 w-32 h-32 opacity-20 text-white pointer-events-none -rotate-45">
          <ChimLac className="w-full h-full" />
        </div>

        {/* Removed external unsplash image background, added gradient shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-900 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 z-0"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <span className="text-white/80 font-bold tracking-[0.2em] uppercase mb-6 block text-sm">Câu Chuyện Của Chúng Tôi</span>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-10 leading-tight">
            Vị ngon từ sự tận tâm, <br/><span className="text-secondary">món quà gửi trọn ân tình</span>
          </h2>
          <p className="text-lg md:text-2xl text-red-50 mb-12 leading-relaxed font-light">
            Mỗi đặc sản tại Quà Đà Nẵng không chỉ là món ăn, mà là một phần văn hóa, là hơi ấm của người miền Trung cần mẫn.
            Chúng tôi tự hào mang tinh hoa quê nhà đến từng mâm cơm gia đình Việt.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
      </section>
    </>
  );
}
