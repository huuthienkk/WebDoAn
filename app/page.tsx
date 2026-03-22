"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import { useUIStore } from "@/store/useUIStore";
import { motion } from "framer-motion";
import { DrumPattern } from "@/components/DongSonDecor";

export default function HomePage() {
  const { products } = useProductStore();
  const { mediaSlots, initStore } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initStore();
  }, [initStore]);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const vidReview = mediaSlots.find(s => s.id === 'home_vid_review') || { 
    url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1200',
    videoUrl: '' 
  };
  
  const specialtyTable = mediaSlots.find(s => s.id === 'home_specialty_table')?.url || 
    'https://images.unsplash.com/photo-1510130321703-e8473de06901?q=80&w=1200&auto=format&fit=crop';

  if (!mounted) return null;

  return (
    <>
      <Hero />
      
      {/* Video Review Section - Ăn gì ở Đà Nẵng? */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 mb-8 leading-tight">
                Ăn gì ở <span className="text-primary italic">Đà Nẵng?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium text-justify">
                Đà Nẵng không chỉ có cảnh đẹp, mà còn là thiên đường ẩm thực miền Trung. Cùng theo chân các thực khách khám phá những món ngon nức tiếng tại Chợ Cồn và bí quyết chọn quà đặc sản chuẩn vị nhất.
              </p>
              <div className="flex items-center gap-4 p-6 bg-primary/5 rounded-3xl border border-primary/10 mb-10">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">1</div>
                <p className="font-bold text-slate-800">Review chân thực từ khách du lịch bụi & đoàn.</p>
              </div>
              <button className="px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-secondary hover:text-primary transition-all shadow-xl shadow-primary/20">
                XEM THÊM REVIEW
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:scale-105 transition-transform duration-700">
                <img 
                  src={vidReview.url} 
                  alt="Review Đặc Sản" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 bg-secondary text-primary rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                  >
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary border-b-[12px] border-b-transparent ml-2"></div>
                  </motion.div>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full -z-10 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full -z-10 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] text-primary rotate-45">
          <DrumPattern className="w-full h-full" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left"
          >
            <div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4 block">Gợi ý cho bạn</span>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">Sản Phẩm Tiêu Biểu</h2>
              <p className="text-gray-500 text-lg font-medium">Lựa chọn hàng đầu từ những thực khách sành ăn.</p>
            </div>
            <a href="/products" className="group flex items-center gap-3 text-primary font-black bg-white px-8 py-4 rounded-2xl shadow-xl hover:bg-primary hover:text-white transition-all">
              Tất cả sản phẩm <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Table Lifestyle Section */}
      <section className="py-32 bg-white container mx-auto px-4 lg:px-12 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-7/12 order-2 lg:order-1 relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] aspect-[16/10]">
              <img 
                src={specialtyTable} 
                alt="Bàn tiệc đặc sản" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3s]"
              />
            </div>
            {/* Floating badge */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 hidden md:block"
            >
              <p className="text-5xl font-black text-primary mb-1 tracking-tighter">100%</p>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Chính gốc <br/> Đà Nẵng</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 order-1 lg:order-2"
          >
            <span className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-6 block">Trải nghiệm vị giác</span>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 mb-8 leading-tight">
              Bữa tiệc đặc sản <br/> ngay tại <span className="text-primary italic">phòng khách</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
              Không chỉ là một món ăn, đó là cả tâm tình người miền Trung. Chúng tôi bài trí sản phẩm theo cách tinh tế nhất để mỗi hộp quà khi mở ra đều khiến bạn cảm thấy "Wow".
            </p>
            <ul className="space-y-6 mb-12">
              {[
                "Đóng gói chuyên nghiệp, bắt mắt",
                "Sản phẩm gà, thịt bò tuyển chọn loại 1"
              ].map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-4 font-bold text-slate-800"
                >
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary text-sm">✓</span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial Section with Slider feel */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <DrumPattern className="w-[800px] h-[800px] absolute -top-1/4 -left-1/4 animate-spin-slow" />
          <DrumPattern className="w-[800px] h-[800px] absolute -bottom-1/4 -right-1/4 animate-spin-reverse" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 lg:px-12 relative z-10 text-center max-w-5xl"
        >
          <span className="text-white/60 font-black tracking-[0.4em] uppercase mb-10 block text-xs md:text-sm">Phản hồi khách hàng</span>
          
          <div className="relative">
            <div className="absolute -top-10 left-0 text-9xl text-white/10 font-serif leading-none opacity-50">“</div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 leading-snug italic">
              "Đã đi du lịch Đà Nẵng nhiều lần nhưng đây là lần đầu tôi thấy một trang web chỉn chu và sản phẩm đóng gói đẹp đến thế. Rất đáng tiền!"
            </h2>
            <div className="flex flex-col items-center">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-20 h-20 rounded-full border-4 border-secondary overflow-hidden mb-4 shadow-2xl"
              >
                <img src="https://i.pravatar.cc/150?u=thien" alt="User" />
              </motion.div>
              <p className="text-xl font-bold">Chị Thảo Nguyên</p>
              <p className="text-white/60 font-medium">Khách du lịch từ TP.HCM</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-heading font-extrabold text-white mb-10 leading-tight relative z-10">
              Bạn quan tâm đến <br/> đặc sản nào?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl relative z-10">
              Đừng ngần ngại liên hệ để được tư vấn món quà phù hợp nhất cho gia đình và bạn bè.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <button className="px-10 py-5 bg-primary text-white font-black rounded-2xl hover:bg-secondary hover:text-primary transition-all shadow-2xl shadow-primary/20 text-lg uppercase">
                MUA SẮM NGAY
              </button>
              <button className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-gray-100 transition-all text-lg uppercase">
                GỌI TƯ VẤN: 0905 123 456
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
