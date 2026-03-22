"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUIStore } from "@/store/useUIStore";

export default function Hero() {
  const { mediaSlots, initStore } = useUIStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initStore();
  }, [initStore]);

  // Filter hero banner slides from the media store
  const slides = mediaSlots
    .filter(slot => slot.page === 'Home' && slot.id.startsWith('home_hero_'))
    .map(slot => ({
      id: slot.id,
      image: slot.url,
      title: slot.title === "Banner Slide 1" ? "Đặc Sản Đà Nẵng" : slot.title,
      subtitle: slot.title === "Banner Slide 1" ? "Chất Lượng Thượng Hạng" : "Vị ngon truyền thống",
      description: "Gói trọn tinh hoa ẩm thực miền Trung vào từng hộp quà sang trọng.",
    }));

  // Fallback if no slides configured
  const displaySlides = slides.length > 0 ? slides : [
    {
      id: "default",
      image: "https://images.unsplash.com/photo-1559592442-9e81dfe58a74?q=80&w=2000",
      title: "Đặc Sản Đà Nẵng",
      subtitle: "Chất Lượng Thượng Hạng",
      description: "Gói trọn tinh hoa ẩm thực miền Trung vào từng hộp quà sang trọng.",
    }
  ];

  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);

  if (!mounted) return <div className="h-screen bg-slate-900" />;

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Parallax effect */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
            className="absolute inset-0"
          >
            <img
              src={displaySlides[currentSlide].image}
              alt={displaySlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30" />
          </motion.div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 lg:px-12 flex items-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary rounded-full text-sm font-black uppercase tracking-[0.3em] mb-6">
                  {displaySlides[currentSlide].subtitle}
                </span>
                <h1 className="text-6xl md:text-8xl font-heading font-black text-white mb-6 leading-[1.1]">
                  {displaySlides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "text-primary italic" : ""}>{word} </span>
                  ))}
                </h1>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed font-medium max-w-xl">
                  {displaySlides[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-6">
                  <Link
                    href="/products"
                    className="px-10 py-5 bg-primary text-white font-black rounded-2xl hover:bg-secondary hover:text-primary transition-all shadow-2xl shadow-primary/20 flex items-center gap-3 group text-lg"
                  >
                    MUA SẮM NGAY
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white hover:text-slate-900 transition-all border border-white/20 text-lg"
                  >
                    KHÁM PHÁ CÂU CHUYỆY
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-12 right-12 z-20 flex items-center gap-6">
          <div className="flex gap-2">
            {displaySlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === i ? "w-12 bg-primary" : "w-6 bg-white/30"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-3 ml-6">
            <button
              onClick={prevSlide}
              className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-primary transition-all group active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-primary transition-all group active:scale-95"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Slide number vertical */}
      <div className="absolute top-1/2 -translate-y-1/2 right-12 z-10 hidden lg:flex flex-col items-center gap-4">
        <div className="h-24 w-px bg-white/20" />
        <span className="text-white/40 font-black text-sm tracking-widest [writing-mode:vertical-lr]">
          0{currentSlide + 1} / 0{displaySlides.length}
        </span>
        <div className="h-24 w-px bg-white/20" />
      </div>
    </section>
  );
}
