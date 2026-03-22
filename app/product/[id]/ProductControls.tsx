"use client";

import { useCartStore } from "@/store/useCart";
import { Product } from "@/data";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Share2, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

export default function ProductControls({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const router = useRouter();

  const [localQuantity, setLocalQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const cartItem = items.find((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    // Nếu có trong giỏ, cập nhật luôn số lượng thay vì chỉ add 1
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + localQuantity);
    } else {
      for(let i=0; i<localQuantity; i++) addItem(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-textDefault w-32">Số Lượng:</span>
        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm flex-1 max-w-[150px]">
          <button
            onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
            className="px-4 py-3 bg-gray-50 hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          
          <span className="flex-1 text-center font-bold text-lg px-2">
            {localQuantity}
          </span>
          
          <button
            onClick={() => setLocalQuantity(localQuantity + 1)}
            className="px-4 py-3 bg-gray-50 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary/10 transition-colors text-lg shadow-sm"
        >
          Thêm Vào Giỏ
        </button>
        
        <button
          onClick={handleBuyNow}
          className="flex-1 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-red-800 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-xl"
        >
          <ShoppingBag className="w-6 h-6" /> Mua Ngay
        </button>
      </div>

      <div className="mt-4 flex justify-center sm:justify-start">
        <button 
          onClick={handleCopyLink}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold bg-gray-50 hover:bg-primary/5 px-6 py-3 rounded-full border border-gray-100"
        >
          {copied ? <><Check className="w-5 h-5 text-green-500"/> Đã sao chép link</> : <><Share2 className="w-5 h-5" /> Chia sẻ sản phẩm</>}
        </button>
      </div>
    </div>
  );
}
