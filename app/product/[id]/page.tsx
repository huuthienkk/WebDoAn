"use client";
import { useProductStore } from "@/store/useProductStore";
import { notFound } from "next/navigation";
import ProductControls from "./ProductControls";
import { ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PlaceholderImage from "@/components/PlaceholderImage";

interface Props {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: Props) {
  const [mounted, setMounted] = useState(false);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-background flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-500 mb-6">Không tìm thấy sản phẩm!</h2>
        <Link href="/products" className="bg-primary hover:bg-red-800 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-colors">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-3 text-sm text-gray-500 mb-10 overflow-x-auto whitespace-nowrap p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
            <HomeIcon className="w-4 h-4" /> Trang Chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link href="/products" className="hover:text-primary transition-colors font-semibold">Sản Phẩm</Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-400 font-semibold">{product.category}</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-primary font-bold truncate max-w-[200px] md:max-w-xs">{product.name}</span>
        </nav>

        {/* Product Inner */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Gallery / Image (Left side) */}
            <div className="lg:col-span-7 bg-gray-50/50 p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-gray-100 flex items-center justify-center relative">
              <div className="relative w-full aspect-square max-w-xl rounded-2xl overflow-hidden shadow-2xl bg-white group border border-gray-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <PlaceholderImage className="group-hover:scale-105 transition-transform duration-700 ease-out" />
                )}
                {product.isBestSeller && (
                  <div className="absolute top-6 left-6 bg-secondary text-white px-6 py-2.5 rounded-full font-extrabold shadow-lg z-10 text-sm tracking-wide uppercase">
                    ✨ Bán Chạy Nhất
                  </div>
                )}
              </div>
            </div>

            {/* Info / Buy (Right side) */}
            <div className="lg:col-span-5 p-8 lg:p-14 flex flex-col justify-center bg-white">
              <div className="mb-4">
                <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-[10px] font-black px-4 py-1.5 rounded-full mb-4 uppercase tracking-[0.1em]">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-textDefault mb-6 leading-[1.15]">
                {product.name}
              </h1>
              
              <div className="text-5xl font-black text-primary mb-10 pb-10 border-b border-gray-100 flex items-start gap-2">
                {product.price.toLocaleString("vi-VN")} <span className="text-2xl mt-1 underline decoration-2 underline-offset-4">đ</span>
              </div>
              
              <div className="mb-10 flex-1">
                <h3 className="text-xl font-bold text-textDefault mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-xl text-xl">📝</span> Mô Tả Sản Phẩm
                </h3>
                <p className="text-gray-600 leading-[1.8] text-lg mb-6 text-justify">
                  {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                </p>
                
                <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner">
                  <span className="text-2xl mt-1">💡</span>
                  <p className="text-gray-500 italic text-sm leading-relaxed">
                    Sản phẩm trải qua khâu tuyển chọn kĩ lưỡng nhất từ các làng nghề địa phương tại <strong>Đà Nẵng</strong>, 
                    cam kết tuân thủ tiêu chuẩn an toàn thực phẩm. Hình dáng, bao bì có thể thay đổi nhẹ tùy lô sản xuất.
                  </p>
                </div>
              </div>

              {/* Client Component Controls */}
              <ProductControls product={product} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
