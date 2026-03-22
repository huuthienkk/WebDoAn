"use client";
import { useProductStore } from "@/store/useProductStore";
import { notFound } from "next/navigation";
import ProductControls from "./ProductControls";
import { ChevronRight, HomeIcon, Rotate3d, CheckCircle2, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PlaceholderImage from "@/components/PlaceholderImage";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: Props) {
  const [mounted, setMounted] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const product = products.find((p) => p.id === params.id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-9xl mb-8">👻</div>
          <h2 className="text-4xl font-heading font-black text-slate-900 mb-6">Sản phẩm không tồn tại!</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto font-medium">Có vẻ như đường dẫn này đã cũ hoặc sản phẩm đã được gỡ bỏ khỏi kệ hàng.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:bg-secondary hover:text-primary transition-all uppercase tracking-widest text-sm">
            <ArrowLeft className="w-5 h-5" /> Về Cửa Hàng
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 lg:px-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-3 text-sm text-gray-500 mb-12 overflow-x-auto whitespace-nowrap p-5 bg-white rounded-[2rem] shadow-sm border border-gray-100/50">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5 font-bold">
            <HomeIcon className="w-4 h-4" /> TRANG CHỦ
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link href="/products" className="hover:text-primary transition-colors font-bold uppercase tracking-wider">SẢN PHẨM</Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-400 font-bold uppercase tracking-wider">{product.category}</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-primary font-black truncate max-w-[200px] md:max-w-xs">{product.name}</span>
        </nav>

        {/* Product Gallery & Info Card */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            
            {/* Gallery / 3D Viewer (Left) */}
            <div className="lg:col-span-7 bg-slate-50 p-6 md:p-12 relative flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!is3DMode ? (
                  <motion.div 
                    key="2d-image"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl bg-white border-8 border-white group"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <PlaceholderImage />
                    )}
                    
                    {product.isBestSeller && (
                      <div className="absolute top-8 left-8 bg-accent text-white px-6 py-2 rounded-full font-black shadow-xl z-20 text-[10px] uppercase tracking-[0.2em] animate-pulse">
                        ✨ Best Seller
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="3d-viewer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-white flex items-center justify-center border-8 border-white cursor-grab active:cursor-grabbing"
                  >
                    <div className="absolute top-8 text-center w-full z-10">
                      <p className="text-primary font-black uppercase tracking-[0.3em] text-xs">Chế độ xem 3D xoay</p>
                      <p className="text-gray-400 text-[10px] font-bold">Kéo chuột để xoay sản phẩm</p>
                    </div>
                    
                    <motion.div 
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      style={{ perspective: 1000 }}
                      initial={{ rotateY: 0 }}
                      whileHover={{ }}
                      className="relative w-64 h-64 md:w-80 md:h-80"
                    >
                      <motion.div 
                        className="w-full h-full relative"
                        style={{ 
                          transformStyle: "preserve-3d",
                        }}
                        animate={{ rotateY: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                         <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain drop-shadow-[0_50px_40px_rgba(0,0,0,0.3)]"
                        />
                      </motion.div>
                    </motion.div>
                    
                    {/* Perspective shadow */}
                    <div className="absolute bottom-20 w-48 h-10 bg-black/10 blur-2xl rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* View Toggles */}
              <div className="mt-8 flex gap-4 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 w-fit">
                <button 
                  onClick={() => setIs3DMode(false)}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${!is3DMode ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'}`}
                >
                  Ảnh Chi Tiết
                </button>
                <button 
                  onClick={() => setIs3DMode(true)}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all ${is3DMode ? 'bg-secondary text-primary' : 'text-gray-400 hover:text-secondary'}`}
                >
                  <Rotate3d className="w-4 h-4" /> Xem 3D VR
                </button>
              </div>
            </div>

            {/* Info Section (Right) */}
            <div className="lg:col-span-5 p-8 md:p-16 flex flex-col bg-white">
              <div className="mb-6">
                <span className="inline-block bg-primary/5 text-primary text-[11px] font-black px-4 py-1.5 rounded-lg uppercase tracking-[0.2em] mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 mb-6 leading-tight tracking-tighter">
                  {product.name}
                </h1>
                <div className="flex items-center gap-6 mb-10">
                  <div className="flex text-secondary gap-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-xl">★</span>)}
                  </div>
                  <span className="text-gray-400 font-bold text-sm">| 1.2k+ đánh giá đã mua</span>
                </div>
              </div>
              
              <div className="text-5xl md:text-6xl font-black text-primary mb-12 flex items-baseline gap-2 italic">
                {product.price.toLocaleString("vi-VN")}
                <span className="text-2xl not-italic font-bold underline decoration-4 underline-offset-8">đ</span>
              </div>
              
              <div className="mb-12 space-y-8 flex-1">
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Câu chuyện đặc sản</h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-medium text-justify italic">
                    {product.description || "Hương vị đậm đà được lưu giữ qua nhiều thế hệ..."}
                  </p>
                </div>
                
                {/* Benefits grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span className="text-xs font-bold text-slate-700">Chính gốc Đà Nẵng</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold text-slate-700">An toàn vệ sinh</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                    <Truck className="w-5 h-5 text-accent" />
                    <span className="text-xs font-bold text-slate-700">Ship toàn quốc</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                    <span className="text-lg">🎁</span>
                    <span className="text-xs font-bold text-slate-700">Hộp quà cao cấp</span>
                  </div>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="pt-10 border-t border-gray-100 mt-auto">
                <ProductControls product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-3 block">Có thể bạn thích</span>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-none">Sản phẩm liên quan</h2>
              </div>
              <Link href="/products" className="text-gray-400 font-bold hover:text-primary transition-colors text-sm uppercase tracking-widest">
                Xem tất cả &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
