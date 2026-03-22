"use client";
import React, { useEffect, useState } from "react";
import { DrumPattern } from "@/components/DongSonDecor";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, MapPin, Award, Users } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export default function AboutPage() {
  const { mediaSlots, initStore } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initStore();
  }, [initStore]);

  const aboutHero = mediaSlots.find(s => s.id === 'about_hero')?.url || 'https://images.unsplash.com/photo-1559592442-9e81dfe58a74?q=80&w=2000&auto=format&fit=crop';
  const aboutStory = mediaSlots.find(s => s.id === 'about_story')?.url || 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop';

  if (!mounted) return null;

  const coreValues = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Tinh Hoa Bản Địa",
      description: "Chúng tôi trực tiếp làm việc với các nghệ nhân tại các làng nghề truyền thống Đà Nẵng để đảm bảo hương vị nguyên bản nhất."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Chất Lượng Vàng",
      description: "Quy trình kiểm soát chất lượng khắt khe, đạt chuẩn ATVSTP, nói không với chất bảo quản và phụ gia độc hại."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Sứ Mệnh Kết Nối",
      description: "Mang đặc sản Đà Nẵng đến mọi miền Tổ quốc, trở thành cầu nối văn hóa ẩm thực giữa miền Trung và cả nước."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen overflow-hidden">
      
      {/* Hero Section - Discovery Theme */}
      <section className="container mx-auto px-4 lg:px-12 relative mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-black tracking-[0.4em] uppercase mb-6 block text-sm">Hành trình di sản</span>
              <h1 className="text-6xl md:text-8xl font-heading font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
                Khám phá <br/>
                <span className="text-primary italic">Hương vị</span> <br/>
                Đà Thành
              </h1>
              <p className="text-gray-500 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl font-medium">
                WebFood không chỉ đơn thuần là một cửa hàng, mà là một hành trình tìm lại những giá trị ẩm thực nguyên bản nhất của mảnh đất miền Trung nắng gió.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-lg bg-slate-200">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="font-bold text-slate-700">
                  <span className="text-primary">+15,000</span> khách hàng đã tin tưởng
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-2/5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-[4rem] overflow-hidden aspect-[4/5] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
            >
              <img 
                src={aboutHero} 
                alt="Đà Nẵng Discovery" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-50 z-10 hidden md:block"
            >
               <MapPin className="w-10 h-10 text-secondary mb-3" />
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tọa lạc tại</p>
               <p className="text-lg font-black text-slate-800">Sơn Trà, Đà Nẵng</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 aspect-video lg:aspect-square">
                <img 
                  src={aboutStory} 
                  alt="WebFood Heritage Story" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-primary font-black tracking-widest uppercase mb-6 block text-sm">Sứ mệnh của chúng tôi</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-10 leading-tight">
                Lưu giữ phong vị <br/> <span className="text-secondary italic">Xứ Quảng</span> trường tồn
              </h2>
              <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed italic border-l-4 border-secondary/30 pl-8">
                <p>
                  "Chúng tôi tin rằng ẩm thực là con đường ngắn nhất để chạm đến trái tim và văn hóa của một vùng đất. Mỗi hũ mắm, mỗi cân chả bò đều mang trong mình hơi thở của gió biển, sự cần cù của người dân miền Trung."
                </p>
                <p>
                  WebFood ra đời để những ai đã trót yêu mảnh đất này có thể mang theo một phần linh hồn của nó về nhà, sẻ chia cùng gia đình và người thân.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-24">
             <span className="text-primary font-black tracking-[0.4em] uppercase mb-4 block text-xs">Cam kết từ tâm</span>
             <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900">Vì sao chọn WebFood?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 group hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-12 mb-32">
        <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-10 left-10 opacity-10 rotate-12">
             <DrumPattern className="w-64 h-64 text-white" />
           </div>
           
           <div className="relative z-10 max-w-4xl mx-auto">
             <h2 className="text-4xl md:text-7xl font-heading font-black mb-8 leading-tight">
               Mang hương vị <span className="text-secondary italic">Đà Nẵng</span> <br/> về ngôi nhà bạn
             </h2>
             <p className="text-xl md:text-2xl opacity-80 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
               Khám phá ngay bộ sưu tập đặc sản tuyển chọn và tận hưởng ưu đãi 10% cho đơn hàng đầu tiên.
             </p>
             <button className="bg-white text-primary px-12 py-6 rounded-2xl font-black shadow-2xl hover:bg-secondary transition-all uppercase tracking-widest text-sm hover:scale-105 active:scale-95">
               Khám phá cửa hàng
             </button>
           </div>
        </div>
      </section>
    </div>
  );
}
