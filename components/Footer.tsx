"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { DrumPattern, ChimLac } from "@/components/DongSonDecor";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname?.startsWith("/admin")) return null;
  return (
    <footer className="bg-slate-900 text-white py-20 mt-24 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] opacity-[0.03] text-white -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <DrumPattern className="w-full h-full animate-[spin_120s_linear_infinite]" />
      </div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.05] text-secondary translate-x-1/4 translate-y-1/4 pointer-events-none">
        <DrumPattern className="w-full h-full animate-[spin_100s_reverse_linear_infinite]" />
      </div>
      <div className="absolute top-10 right-20 w-40 h-40 opacity-10 text-primary pointer-events-none -rotate-12">
        <ChimLac className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-heading font-extrabold mb-8 text-white tracking-tighter">
              Quà <span className="text-secondary tracking-normal">Đà Nẵng</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 font-medium">
              Tinh hoa đặc sản Đà Nẵng chính gốc. Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất, chuẩn vị truyền thống Miền Trung đến tận tay khách hàng.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-white hover:text-primary transition-all p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-all p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Cột 2: Sản phẩm */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Sản Phẩm</h3>
            <ul className="space-y-4 font-medium">
              <li><Link href="/products?category=Bánh kẹo" className="text-gray-400 hover:text-secondary transition-colors">Bánh Kẹo</Link></li>
              <li><Link href="/products?category=Đồ khô" className="text-gray-400 hover:text-secondary transition-colors">Đồ Khô</Link></li>
              <li><Link href="/products?category=Mắm" className="text-gray-400 hover:text-secondary transition-colors">Các Loại Mắm</Link></li>
              <li><Link href="/products?category=Quà tặng" className="text-gray-400 hover:text-secondary transition-colors">Set Quà Tặng</Link></li>
            </ul>
          </div>

          {/* Cột 3: Chính sách */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Hỗ Trợ</h3>
            <ul className="space-y-4 font-medium">
              <li><Link href="/dac-san-da-nang" className="text-gray-400 hover:text-secondary transition-colors">Cẩm Nang Đặc Sản</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-secondary transition-colors">Hướng dẫn đặt hàng</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-secondary transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-secondary transition-colors">Vận chuyển & Giao hàng</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-secondary transition-colors">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Liên Hệ</h3>
            <ul className="space-y-6">
              <li className="flex items-start text-gray-400">
                <MapPin className="w-6 h-6 mr-4 text-primary flex-shrink-0 mt-1" />
                <span className="font-medium">123 Hải Phòng, Hải Châu, <br/>Đà Nẵng, Việt Nam</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                <span className="font-medium">0905 123 456</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                <span className="font-medium">contact@quadanang.vn</span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-white/5 mt-20 pt-10 text-center">
          <p className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Quà Đà Nẵng. Mang hương vị quê hương vươn xa.
          </p>
        </div>
      </div>
    </footer>
  );
}
