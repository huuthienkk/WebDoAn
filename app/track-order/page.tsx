"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Search, Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import { DrumPattern } from "@/components/DongSonDecor";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItem[];
  createdAt: any;
}

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const q = query(
        collection(db, "orders"),
        where("phone", "==", phone.trim())
      );
      
      const querySnapshot = await getDocs(q);
      const ordersData: Order[] = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      
      // Sort by descending createdAt locally since we can't easily compound query with where equality on a different field without an index
      ordersData.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.seconds - a.createdAt.seconds;
      });

      setOrders(ordersData);
    } catch (error) {
      console.error("Lỗi khi tra cứu đơn hàng:", error);
      alert("Tra cứu thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 uppercase tracking-wider border border-yellow-200">
            <Clock className="w-4 h-4"/> Đang Xử Lý
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-wider border border-green-200">
            <CheckCircle2 className="w-4 h-4"/> Đã Giao
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-wider border border-gray-200">
            <XCircle className="w-4 h-4"/> Đã Hủy
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12 max-w-5xl relative">
        
        {/* Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 text-primary pointer-events-none -translate-y-1/2 translate-x-1/2">
           <DrumPattern className="w-full h-full animate-spin-slow" />
        </div>

        <div className="text-center mb-16 relative z-10">
          <span className="text-primary font-black tracking-[0.4em] uppercase mb-4 block text-xs">Thông tin kiện hàng</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-6 tracking-tighter italic">
            Tra cứu <span className="text-primary not-italic">Đơn Hàng</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Nhập số điện thoại của bạn để cập nhật hành trình của những món quà Đà Thành đang trên đường tới bạn.
          </p>
        </div>

        <div className="bg-white p-6 md:p-12 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 mb-16 relative z-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-6">
            <div className="relative flex-1">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại đặt hàng (Ví dụ: 0905...)"
                className="w-full pl-8 pr-4 py-6 rounded-[2rem] border-0 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-xl text-slate-900 placeholder-slate-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-12 py-6 bg-slate-900 text-white font-black text-lg rounded-[2rem] flex items-center justify-center gap-3 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary shadow-2xl hover:scale-105 active:scale-95'}`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                   ĐANG TÌM...
                </div>
              ) : (
                <><Search className="w-6 h-6"/> TRA CỨU NGAY</>
              )}
            </button>
          </form>
        </div>

        {hasSearched && !loading && (
          <div className="space-y-10 animate-fade-up">
            {orders.length === 0 ? (
              <div className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100 text-center flex flex-col items-center overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <Package className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="text-3xl font-heading font-black text-slate-900 mb-4 tracking-tight">Oh! Không có đơn hàng nào</h3>
                <p className="text-gray-400 mb-10 max-w-md font-medium text-lg leading-relaxed">
                  Chúng tôi không tìm thấy dữ liệu cho số điện thoại <span className="text-primary font-bold">"{phone}"</span>. Hãy thử lại hoặc liên lạc hotline để được hỗ trợ nhé.
                </p>
                <Link href="/products" className="bg-primary text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl hover:bg-secondary hover:text-primary uppercase tracking-widest text-sm translate-z-0">
                  TIẾP TỤC MUA SẮM
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between px-6">
                  <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">
                    Tìm thấy <span className="text-primary">{orders.length}</span> đơn hàng gần nhất
                  </h3>
                </div>
                
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-[3.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 overflow-hidden group">
                    <div className="bg-slate-50/50 px-8 py-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-gray-100 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                           <Package className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Mã vận đơn</span>
                          <span className="font-heading text-2xl font-black text-slate-900 tracking-tight">#{order.id.substring(0, 8).toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-3 text-right">
                        {getStatusBadge(order.status)}
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest opacity-80">
                          {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString('vi-VN') : 'Mới đặt'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 md:p-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Người nhận</h4>
                            <p className="text-xl font-heading font-black text-slate-900 mb-2">{order.customerName}</p>
                            <p className="text-gray-500 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-4">{order.address}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Chi tiết kiện hàng</h4>
                          <ul className="space-y-4">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between items-center bg-slate-50/50 p-4 rounded-2xl border border-gray-50">
                                <span className="text-slate-700 font-bold text-sm">
                                  <span className="bg-secondary/20 text-primary px-2 py-1 rounded-lg text-xs mr-3 font-black">{item.quantity}x</span> 
                                  {item.name}
                                </span>
                                <span className="font-black text-slate-500 text-sm">{(item.price * item.quantity).toLocaleString("vi-VN")} đ</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-10 border-t border-dashed border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                           <CheckCircle2 className="w-5 h-5" />
                           <span className="text-xs font-black uppercase tracking-widest">Giao hàng miễn phí toàn quốc</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                          <span className="text-slate-400 font-black text-xs uppercase tracking-widest">Tổng thanh toán</span>
                          <span className="text-4xl font-heading font-black text-primary italic">
                            {order.totalPrice.toLocaleString("vi-VN")}
                            <span className="text-xl not-italic underline decoration-4 underline-offset-8 ml-1">đ</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
