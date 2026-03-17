"use client";
import { useCartStore } from "@/store/useCart";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Truck, Wallet, CheckCircle2 } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1000);
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl max-w-lg w-full flex flex-col items-center border border-green-100">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner ring-8 ring-green-100/50">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-textDefault mb-6">Đặt hàng thành công!</h1>
          <p className="text-gray-600 mb-10 text-xl leading-relaxed">
            Cảm ơn bạn đã tin dùng <strong>Quà Đà Nẵng</strong>. Mã đơn hàng của bạn là <span className="font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-lg">#QDN-{Math.floor(Math.random() * 10000)}</span>. 
            Chúng tôi sẽ liên hệ trong 24h để giao hàng.
          </p>
          <Link
            href="/products"
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold hover:bg-red-800 transition-all shadow-[0_10px_30px_rgba(139,30,30,0.3)] hover:shadow-xl hover:-translate-y-1 text-xl flex items-center justify-center gap-3"
          >
            Tiếp Tục Mua Sắm &rarr;
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-16 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-textDefault mb-6">Thanh Toán</h1>
          <p className="text-gray-500 mb-10 max-w-md text-xl leading-relaxed">
            Giỏ hàng của bạn đang trống.<br/>Hãy quay lại cửa hàng để chọn thêm những món quà đặc sản nhé!
          </p>
          <Link href="/products" className="bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-red-800 transition-colors shadow-lg shadow-primary/30 text-lg">
            Quay Trước Cửa Hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-16 text-center lg:text-left drop-shadow-sm tracking-tight">Hoàn Tất Đơn Hàng</h1>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          
          {/* Thông tin khách hàng (Left) */}
          <div className="xl:col-span-7 space-y-10">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/80"></div>
              <h2 className="text-3xl font-extrabold text-textDefault mb-8 pb-6 border-b border-gray-100 flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xl shadow-inner font-black">1</span>
                Thông tin người nhận
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wide">Họ và tên *</label>
                    <input
                      required
                      type="text"
                      className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all font-medium"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wide">Số điện thoại *</label>
                    <input
                      required
                      type="tel"
                      className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all font-medium"
                      placeholder="0905 xxx xxx"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wide">Địa chỉ giao hàng chi tiết *</label>
                  <input
                    required
                    type="text"
                    className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all font-medium"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/TP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wide">Ghi chú (Tùy chọn)</label>
                  <textarea
                    rows={4}
                    className="w-full border-2 border-gray-100 bg-gray-50/50 rounded-2xl px-5 py-4 focus:bg-white focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/20 transition-all font-medium resize-none"
                    placeholder="Giờ giao hàng, dặn dò shipper..."
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
              <h2 className="text-3xl font-extrabold text-textDefault mb-8 pb-6 border-b border-gray-100 flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xl shadow-inner font-black">2</span>
                Phương thức thanh toán
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className={`cursor-pointer border-2 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]' : 'border-gray-100 hover:border-secondary/50 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                  <Truck className={`w-10 h-10 mb-4 ${paymentMethod === 'cod' ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`font-extrabold text-lg ${paymentMethod === 'cod' ? 'text-primary' : 'text-gray-600'}`}>Nhận Hàng Trả Tiền (COD)</span>
                </label>
                
                <label className={`cursor-pointer border-2 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${paymentMethod === 'transfer' ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]' : 'border-gray-100 hover:border-secondary/50 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="hidden" />
                  <Wallet className={`w-10 h-10 mb-4 ${paymentMethod === 'transfer' ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`font-extrabold text-lg ${paymentMethod === 'transfer' ? 'text-primary' : 'text-gray-600'}`}>Quét Mã QR Chuyển Khoản</span>
                </label>
              </div>
            </div>
          </div>

          {/* Đơn hàng (Right) */}
          <div className="xl:col-span-5">
            <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 sticky top-32">
              <h2 className="text-3xl font-black text-primary mb-8 pb-6 border-b-2 border-gray-100">Chi Tiết Đơn Hàng</h2>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 mb-8 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-5 items-center group bg-gray-50/50 p-3 rounded-2xl border border-transparent hover:border-primary/20 transition-colors">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white border border-gray-100">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <PlaceholderImage />
                      )}
                      
                      <span className="absolute top-0 right-0 bg-primary backdrop-blur-sm text-white text-sm font-black w-8 h-8 flex items-center justify-center rounded-bl-xl shadow-md">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-extrabold text-textDefault line-clamp-2 leading-tight group-hover:text-primary transition-colors text-lg">{item.product.name}</h4>
                      <p className="text-gray-500 font-medium mt-2">{item.product.price.toLocaleString("vi-VN")} đ</p>
                    </div>
                    <div className="font-black text-textDefault text-xl tracking-tight">
                      {(item.product.price * item.quantity).toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 pt-8 border-t-2 border-dashed border-gray-200">
                <div className="flex justify-between text-gray-500 font-bold text-lg">
                  <span>Tạm tính</span>
                  <span className="text-textDefault">{totalPrice().toLocaleString("vi-VN")} đ</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold text-lg pb-6 border-b-2 border-gray-100">
                  <span>Phí Giao Hàng</span>
                  <span className="text-emerald-600 font-black bg-emerald-50 px-3 py-1 rounded-full text-sm uppercase tracking-wide">Freeship</span>
                </div>
                
                <div className="flex justify-between items-end text-xl font-extrabold text-primary pt-4 pb-8">
                  <span className="mb-1 text-2xl">Tổng Cộng</span>
                  <span className="text-5xl font-black">{totalPrice().toLocaleString("vi-VN")}<span className="text-3xl ml-1">₫</span></span>
                </div>
                
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-primary hover:bg-red-800 text-white py-5 rounded-2xl font-black transition-all duration-300 shadow-[0_15px_30px_rgba(139,30,30,0.3)] hover:shadow-[0_20px_40px_rgba(139,30,30,0.4)] hover:-translate-y-1 text-2xl flex items-center justify-center gap-3 tracking-wide"
                >
                  Xác Nhận Đặt Hàng <CheckCircle2 className="w-6 h-6"/>
                </button>
                <p className="text-center text-sm font-medium text-gray-400 mt-6 leading-relaxed max-w-[85%] mx-auto">
                  Bằng việc chọn "Xác Nhận Đặt Hàng", bạn đồng ý với Điều Khoản Dịch Vụ và Chính Sách Bảo Mật.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
