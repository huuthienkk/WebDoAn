"use client";
import { Play, Send } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useState, useEffect } from "react";
import { DrumPattern, ChimLac } from "@/components/DongSonDecor";

export default function AboutVideoSection() {
  const { videoThumbnails } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe client-side fallback
  const fallbackImg1 = "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop";
  const fallbackImg2 = "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800&auto=format&fit=crop";
  
  const img1 = mounted && videoThumbnails[0]?.url ? videoThumbnails[0].url : fallbackImg1;
  const img2 = mounted && videoThumbnails[1]?.url ? videoThumbnails[1].url : fallbackImg2;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Patterns */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] opacity-[0.08] text-primary -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <DrumPattern className="w-full h-full animate-[spin_180s_linear_infinite]" />
      </div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.1] text-secondary translate-x-1/3 translate-y-1/3 pointer-events-none">
        <DrumPattern className="w-full h-full animate-[spin_120s_reverse_linear_infinite]" />
      </div>
      <div className="absolute top-20 right-1/4 w-32 h-32 opacity-20 text-primary pointer-events-none rotate-12">
        <ChimLac className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 opacity-15 text-secondary pointer-events-none -rotate-12">
        <ChimLac className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Layout Row */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text Column */}
          <div className="w-full lg:w-4/12 relative">
            {/* The decorative light green square behind text */}
            <div className="absolute -top-6 -left-6 w-3/4 h-[120%] border-[3px] border-secondary/20 z-0 hidden md:block"></div>
            
            <div className="relative z-10 p-4 lg:p-0">
              <h4 className="text-xl md:text-2xl font-black text-secondary uppercase tracking-wider mb-2">
                Video giới thiệu
              </h4>
              <h2 className="text-5xl md:text-6xl font-black text-primary uppercase mb-8 leading-[1.1]">
                Về chúng tôi
              </h2>
              <p className="text-gray-600 leading-[1.8] text-sm md:text-base mb-10 text-justify font-medium">
                Thương hiệu <strong className="text-primary">Quà Đà Nẵng</strong> tự hào là đơn vị tiên phong trong việc cung cấp và phân phối các loại Đặc sản Miền Trung đạt tiêu chuẩn ATVSTP, với quy trình tuyển chọn khép kín...
              </p>
              
              <button className="bg-primary hover:bg-red-800 text-white pr-6 pl-2 py-2 rounded-full font-bold flex items-center gap-4 transition-all duration-300 shadow-xl hover:shadow-[0_10px_20px_rgba(139,30,30,0.3)] hover:-translate-y-1">
                <span className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center shadow-inner">
                  <Send className="w-5 h-5 text-white ml-0.5 mt-0.5 transform -rotate-45" />
                </span>
                XEM TẤT CẢ
              </button>
            </div>
          </div>

          {/* Right Video Column */}
          <div className="w-full lg:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            
            {/* Video Item 1 */}
            <div className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden aspect-[16/10] bg-gray-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100">
                <img 
                  src={img1} 
                  alt="Đặc sản xưa và nay" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Overlay & Play Icon */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center z-20">
                  <div className="w-16 h-16 bg-secondary/90 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 group-hover:bg-secondary">
                    <Play className="w-7 h-7 text-white ml-1 fill-white" />
                  </div>
                </div>
                
                {/* Badge Tag */}
                <div className="absolute bottom-4 left-4 bg-white/95 px-4 py-1.5 rounded-sm shadow-sm text-xs font-black text-primary z-20 uppercase tracking-widest">
                  Góc Nhìn Thuần Việt
                </div>
              </div>
              
              <div className="flex items-start gap-4 mt-6">
                <div className="w-12 border-t-[3px] border-secondary mt-3 shrink-0"></div>
                <h3 className="text-textDefault font-medium text-base leading-snug">
                  Đặc sản <strong className="font-extrabold text-primary">Xưa</strong> và <strong className="font-extrabold text-primary">Nay</strong> có gì thay đổi
                </h3>
              </div>
            </div>

            {/* Video Item 2 */}
            <div className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden aspect-[16/10] bg-gray-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100">
                <img 
                  src={img2} 
                  alt="Phát triển thương hiệu" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Overlay & Play Icon */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center z-20">
                  <div className="w-16 h-16 bg-secondary/90 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 group-hover:bg-secondary">
                    <Play className="w-7 h-7 text-white ml-1 fill-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 mt-6">
                <div className="w-12 border-t-[3px] border-secondary mt-3 shrink-0"></div>
                <h3 className="text-textDefault font-medium text-base leading-snug">
                  Chặng đường phát triển đổi mới của <strong className="font-extrabold uppercase outline-none underline-offset-4 decoration-2 decoration-secondary text-primary">Quà Đà Nẵng</strong>
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
