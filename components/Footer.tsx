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
    <footer className="bg-textDefault text-white py-12 mt-16 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] opacity-[0.05] text-white -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <DrumPattern className="w-full h-full animate-[spin_120s_linear_infinite]" />
      </div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.05] text-secondary translate-x-1/4 translate-y-1/4 pointer-events-none">
        <DrumPattern className="w-full h-full animate-[spin_100s_reverse_linear_infinite]" />
      </div>
      <div className="absolute top-10 right-20 w-32 h-32 opacity-15 text-secondary pointer-events-none -rotate-12">
        <ChimLac className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-secondary">Quà Đà Nẵng</h2>
            <p className="text-gray-300 leading-relaxed max-w-sm mb-6">
              Chuyên cung cấp các loại đặc sản Đà Nẵng chính gốc, đảm bảo chất lượng và vệ sinh an toàn thực phẩm. 
              Mang hương vị miền Trung đến mọi miền Tổ quốc.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-700/50 rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-700/50 rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Cột 2: Chính sách mua hàng */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Chính Sách Khách Hàng</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary hover:underline transition-colors block">
                  Hướng dẫn đặt hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary hover:underline transition-colors block">
                  Chính sách đổi trả & Hoàn tiền
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary hover:underline transition-colors block">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary hover:underline transition-colors block">
                  Bảo mật thông tin
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Thông tin liên hệ */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-secondary flex-shrink-0 mt-0.5" />
                <span>Số 123 đường Hải Phòng, Quận Hải Châu, TP. Đà Nẵng</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <span>Hotline: 0905 123 456</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <span>Email: contact@quadanang.vn</span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-gray-600 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Quà Đà Nẵng. All rights reserved. Designed with ❤️ by Bạn.
          </p>
        </div>
      </div>
    </footer>
  );
}
