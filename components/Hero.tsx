"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { useState, useEffect } from "react";

export default function Hero() {
  const { heroImages } = useUIStore();
  const validImages = heroImages.filter(img => img.url.trim() !== "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [validImages.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary via-red-900 to-[#2A1F18]">
      
      {mounted && validImages.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={validImages[currentIndex]?.url}
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover z-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none z-0" />
      )}
      
      {/* Black Overlay if using images for readable text */}
      {mounted && validImages.length > 0 && <div className="absolute inset-0 bg-black/50 z-10" />}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl"
        >
          Khám Phá Hương Vị Thật Sự Của
          <span className="text-secondary block mt-2 text-5xl md:text-7xl">Đặc Sản Đà Nẵng</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-200 mb-10 font-medium"
        >
          Mang tinh hoa ẩm thực miền Trung đến tận bàn ăn nhà bạn, chất lượng ươm đầy chân tình xứ dừa.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="px-10 py-5 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] text-lg"
          onClick={() => {
            document.getElementById("featured-categories")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Khám Phá Ngay
        </motion.button>
      </div>
    </div>
  );
}
