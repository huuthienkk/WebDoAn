"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle, Star, Play } from "lucide-react";
import { DrumPattern } from "@/components/DongSonDecor";
import { useUIStore } from "@/store/useUIStore";

const SPECIALTIES = [
  {
    id: 1,
    name: "Mực rim Đà Nẵng",
    desc: "Cay ngọt đậm đà, ăn là nhớ ngay hương vị biển miền Trung",
    price: "75.000đ",
    image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800",
  },
  {
    id: 2,
    name: "Bánh khô mè",
    desc: "Giòn rụm, thơm mè – món quà truyền thống lâu đời",
    price: "45.000đ",
    image: "https://images.unsplash.com/photo-1559592442-9e81dfe58a74?q=80&w=800",
  },
  {
    id: 3,
    name: "Tré Bà Đệ",
    desc: "Đặc sản nổi tiếng, vị chua nhẹ, cực kỳ kích thích vị giác",
    price: "120.000đ",
    image: "https://images.unsplash.com/photo-1510130321703-e8473de06901?q=80&w=800",
  }
];

const FAQS = [
  {
    q: "Đặc sản Đà Nẵng mua ở đâu uy tín?",
    a: "Bạn nên chọn các website chuyên đặc sản, có review và nguồn gốc rõ ràng như WebFood. Chúng tôi cam kết sản phẩm chính gốc và đóng gói chuyên nghiệp."
  },
  {
    q: "Đặc sản nào phù hợp làm quà?",
    a: "Các lựa chọn hàng đầu bao gồm Bánh khô mè (truyền thống), Tré (nhắm rượu cực ngon) và Mực rim (ăn vặt yêu thích)."
  }
];

export default function SeoGuidePage() {
  const { mediaSlots, initStore } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initStore();
  }, [initStore]);

  const seoHero = mediaSlots.find(s => s.id === 'seo_hero')?.url || 'https://images.unsplash.com/photo-1559592442-9e81dfe58a74?q=80&w=2000';
  const seoIntro = mediaSlots.find(s => s.id === 'seo_intro')?.url || 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1200';
  const seoVidThumb = mediaSlots.find(s => s.id === 'seo_vid_thumb')?.url || 'https://images.unsplash.com/photo-1510130321703-e8473de06901?q=80&w=1200';

  if (!mounted) return null;

  return (
    <div className="pt-20 bg-white overflow-hidden">
      
      {/* 2. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={seoHero} 
            alt="Biển Đà Nẵng" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-heading font-black text-white mb-6 leading-tight drop-shadow-xl"
          >
            Top đặc sản Đà Nẵng <br/> nhất định phải mua làm quà
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-3xl mx-auto"
          >
            Khám phá những món ngon trứ danh – chuẩn vị miền Trung
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-[#F77F00] text-white font-black rounded-xl shadow-2xl transition-all"
          >
            Khám phá ngay
          </motion.button>
        </div>
      </section>

      {/* 3. INTRO SECTION */}
      <section className="py-24 container mx-auto px-4 lg:px-12 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-8 tracking-tight">
              Tâm tình trong từng <span className="text-primary italic">món quà</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 font-medium text-justify leading-relaxed">
              <p>
                Đặc sản Đà Nẵng từ lâu đã trở thành lựa chọn hàng đầu của du khách khi tìm kiếm những món quà ý nghĩa. Không chỉ mang hương vị đậm đà của miền Trung, mỗi sản phẩm còn chứa đựng câu chuyện văn hóa và con người nơi đây.
              </p>
              <p>
                Từ mực rim cay nồng, bánh khô mè giòn tan đến tré Bà Đệ nổi tiếng – tất cả đều là những món quà tuyệt vời dành cho gia đình và bạn bè.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src={seoIntro} 
              alt="Đặc sản Đà Nẵng" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. DANH SÁCH ĐẶC SẢN */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Danh sách tốt nhất</span>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900">Món ngon nên chọn</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {SPECIALTIES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[20px] overflow-hidden shadow-lg border border-gray-100 group flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-heading font-black text-slate-900 mb-4">{item.name}</h3>
                  <p className="text-gray-500 font-medium mb-6 flex-1 line-clamp-2 italic">“{item.desc}”</p>
                  <p className="text-primary font-black text-2xl mb-8">👉 Giá: {item.price}</p>
                  <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-[#0095cc] transition-all hover:scale-105 active:scale-95 shadow-md uppercase tracking-wider text-sm">
                    Xem chi tiết
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VIDEO REVIEW */}
      <section className="py-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-12">
             Ăn thử đặc sản Đà Nẵng – Có gì hấp dẫn?
          </h2>
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
            <img src={seoVidThumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-10 h-10 fill-current ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KINH NGHIỆM CHỌN ĐẶC SẢN */}
      <section className="py-24 bg-[#FFF8E7] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm"
            >
              <h3 className="text-2xl md:text-3xl font-heading font-black text-slate-900 mb-8 flex items-center gap-4">
                <Star className="w-8 h-8 text-[#F77F00] fill-current" />
                🎯 Cách chọn đặc sản ngon:
              </h3>
              <ul className="space-y-6">
                {[
                  "Chọn sản phẩm có nguồn gốc rõ ràng",
                  "Ưu tiên hàng đóng gói kỹ",
                  "Tránh sản phẩm quá rẻ"
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-4 font-bold text-gray-700 text-lg">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" /> {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm border-2 border-primary/10"
            >
              <h3 className="text-2xl md:text-3xl font-heading font-black text-slate-900 mb-8 flex items-center gap-4">
                <HelpCircle className="w-8 h-8 text-primary" />
                🎯 Gợi ý theo nhu cầu:
              </h3>
              <div className="space-y-8">
                <div>
                    <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-4">Làm quà tặng:</h4>
                    <p className="font-bold text-xl text-slate-800">→ Bánh khô mè, Tré Bà Đệ</p>
                </div>
                <div>
                    <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-4">Ăn vặt tại chỗ:</h4>
                    <p className="font-bold text-xl text-slate-800">→ Mực rim, Cá bò khô</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA (CHỐT SALE) */}
      <section className="py-24 container mx-auto px-4 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 text-white opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2">
             <DrumPattern className="w-full h-full" />
          </div>
          
          <h2 className="text-3xl md:text-7xl font-heading font-black text-white mb-10 relative z-10 leading-tight">
             Đặt mua đặc sản Đà Nẵng <br/> chính gốc ngay hôm nay
          </h2>
          <button className="px-14 py-6 bg-slate-900 text-white font-black rounded-xl text-xl hover:bg-secondary hover:text-primary transition-all shadow-2xl relative z-10 uppercase tracking-widest">
            Mua ngay
          </button>
        </motion.div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-white container mx-auto px-4 lg:px-12 max-w-[1000px]">
        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-16 text-center">Câu hỏi thường gặp</h2>
        <div className="space-y-8">
          {FAQS.map((faq, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-gray-100"
            >
              <h3 className="text-xl md:text-2xl font-heading font-black text-primary mb-4 flex items-start gap-4">
                <span className="text-4xl text-primary/20 -mt-2">❓</span> {faq.q}
              </h3>
              <p className="text-gray-600 font-medium text-lg border-l-4 border-primary/20 pl-6 ml-10">
                <span className="text-slate-400 font-black block text-xs uppercase tracking-widest mb-3">Trả lời:</span>
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
