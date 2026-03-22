import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
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
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col h-full border border-gray-100/50 hover:-translate-y-2">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <PlaceholderImage className="group-hover:scale-110 transition-transform duration-700 ease-in-out" />
        )}
        
        {/* Nhãn Tag "Hot" or "Best Seller" */}
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-10 uppercase tracking-[0.2em] animate-pulse">
            ✨ Bán chạy
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-[11px] font-black text-primary/60 uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-md">
            {product.category}
          </span>
        </div>

        <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors flex-1 mb-3">
          <h3 className="font-heading font-extrabold text-xl text-textDefault line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
          ))}
          <span className="text-xs text-gray-400 font-bold ml-1">(4.9/5)</span>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary flex items-baseline gap-1">
              {product.price.toLocaleString("vi-VN")}
              <span className="text-sm font-bold underline underline-offset-4 decoration-2">đ</span>
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="group/btn relative w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 shadow-lg shadow-primary/20"
            aria-label="Thêm vào giỏ"
          >
            <ShoppingCart className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Thêm giỏ hàng
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
