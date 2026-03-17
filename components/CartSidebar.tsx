"use client";
import { useCartStore } from "@/store/useCart";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PlaceholderImage from "./PlaceholderImage";

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-textDefault flex items-center gap-2">
            Giỏ Hàng <span className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full">{items.length}</span>
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🛒</span>
              </div>
              <p className="text-gray-500 text-lg">Giỏ hàng của bạn đang trống.</p>
              <button onClick={toggleCart} className="text-primary font-semibold hover:underline">Tiếp tục mua sắm</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 group">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <PlaceholderImage />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-textDefault line-clamp-1">{item.product.name}</h3>
                    <p className="text-primary font-bold mt-1">
                      {item.product.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium text-sm bg-white py-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium text-lg">Tổng tiền</span>
              <span className="text-2xl font-black text-primary">
                {totalPrice().toLocaleString("vi-VN")} đ
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={toggleCart}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-800 transition-all shadow-lg shadow-primary/30 text-lg tracking-wide uppercase"
            >
              Thanh Toán Ngay
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
