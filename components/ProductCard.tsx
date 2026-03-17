"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data";
import { useCartStore } from "@/store/useCart";
import PlaceholderImage from "./PlaceholderImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-100">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <PlaceholderImage className="group-hover:scale-110 transition-transform duration-500 ease-out" />
        )}
        
        {/* Nhãn Đặc Sản */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wider">
            Đặc sản
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors pr-2">
            <h3 className="font-bold text-lg text-textDefault line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 font-medium">{product.category}</p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-primary">
            {product.price.toLocaleString("vi-VN")} đ
          </span>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-textDefault hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm"
            aria-label="Thêm vào giỏ"
            title="Thêm nhanh vào giỏ"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
