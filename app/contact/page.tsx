"use client";
import { useEffect, useState } from "react";
import { DrumPattern, ChimLac } from "@/components/DongSonDecor";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen overflow-hidden">
      
      {/* Header Topic */}
      <section className="container mx-auto px-4 lg:px-12 relative mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-black tracking-[0.4em] uppercase mb-4 block text-xs">Liên hệ với chúng tôi</span>
          <h1 className="text-6xl md:text-8xl font-heading font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter italic">
            Kết nối cùng <br/> <span className="text-primary not-italic">Quà Đà Nẵng</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Chúng tôi luôn ở đây để lắng nghe câu chuyện của bạn và mang hương vị quê hương đến gần hơn với mỗi tổ ấm.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Form + Info */}
      <section className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[4rem] p-4 md:p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
          
          {/* Details (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-primary rounded-[3.5rem] p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between"
          >
            {/* Background Decor */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-10 text-white pointer-events-none">
              <DrumPattern className="w-full h-full animate-[spin_100s_linear_infinite]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-heading font-black mb-12">Thông tin <br/> Trụ sở chính</h2>
              
              <ul className="space-y-10">
                <li className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-secondary group-hover:text-primary transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Địa chỉ</p>
                    <p className="text-lg font-bold leading-snug">Số 123 đường Hải Phòng, P. Thạch Thang, Quận Hải Châu, TP. Đà Nẵng</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-secondary group-hover:text-primary transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Hotline</p>
                    <p className="text-lg font-bold">0905 123 456</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-secondary group-hover:text-primary transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Email</p>
                    <p className="text-lg font-bold">contact@quadanang.vn</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-16 flex gap-6">
               <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all shadow-xl"><Facebook /></a>
               <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all shadow-xl"><Instagram /></a>
            </div>
          </motion.div>

          {/* Form (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-8 md:p-16"
          >
            <div className="mb-12">
              <h2 className="text-4xl font-heading font-black text-slate-900 mb-4">Gửi tin nhắn cho chúng tôi</h2>
              <p className="text-gray-400 font-medium">Bất kể là góp ý về sản phẩm hay thắc mắc về đơn hàng, hãy để lại lời nhắn bạn nhé!</p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Họ và tên</label>
                  <input type="text" className="w-full bg-slate-50 border-0 p-5 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-300" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email liên hệ</label>
                  <input type="email" className="w-full bg-slate-50 border-0 p-5 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-300" placeholder="email@domain.com" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Lời nhắn của bạn</label>
                <textarea className="w-full bg-slate-50 border-0 p-5 rounded-3xl focus:ring-4 focus:ring-primary/10 transition-all font-bold h-48 resize-none placeholder:text-slate-300" placeholder="Viết gì đó cho chúng tôi..."></textarea>
              </div>
              
              <button className="bg-slate-900 text-white w-full py-6 rounded-2xl font-black shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-4 group">
                GỬI LỜI NHẮN NGAY
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* Footer Banner */}
      <section className="container mx-auto px-4 lg:px-12 mt-32 mb-12">
        <div className="bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 opacity-5 group-hover:opacity-10 transition-opacity">
               <ChimLac className="w-full h-full scale-[2]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-heading font-black mb-4">Hương Vị Miền Trung - Tình Người Đà Nẵng</h3>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-sm italic">Luôn đồng hành cùng gia đình bạn</p>
        </div>
      </section>

    </div>
  );
}
