"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { CheckCircle2, Clock, Trash2, XCircle } from 'lucide-react';

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
  note: string;
  paymentMethod: string;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItem[];
  createdAt: any;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Cập nhật thất bại!");
    }
  };

  const handleDelete = async (orderId: string) => {
    if (confirm("Bạn có chắc chắn muốn xoá đơn hàng này vĩnh viễn?")) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
      } catch (error) {
        console.error("Lỗi xoá đơn hàng:", error);
        alert("Xoá thất bại!");
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu đơn hàng...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Quản lý Đơn hàng</h1>
          <p className="text-gray-500">Xem và xử lý các đơn đặt hàng từ khách hàng.</p>
        </div>
        <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-xl">
          Tổng cộng: {orders.length} đơn
        </div>
      </div>
      
      <div className="overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="w-full text-left border-collapse bg-white whitespace-nowrap">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <th className="p-4 font-semibold">Mã Đơn</th>
              <th className="p-4 font-semibold">Khách Hàng</th>
              <th className="p-4 font-semibold">Sản Phẩm</th>
              <th className="p-4 font-semibold">Tổng Tiền</th>
              <th className="p-4 font-semibold text-center">Trạng Thái</th>
              <th className="p-4 font-semibold text-center">Thời Gian</th>
              <th className="p-4 font-semibold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    #{order.id.substring(0, 6).toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <p className="font-bold text-textDefault">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-xs text-gray-400 max-w-[150px] truncate" title={order.address}>{order.address}</p>
                </td>
                <td className="p-4">
                  <div className="max-w-[200px]">
                    <p className="text-sm font-semibold truncate leading-tight">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{order.paymentMethod === 'cod' ? 'Thanh toán COD' : 'Chuyển khoản QR'}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-black text-red-600">
                    {order.totalPrice.toLocaleString("vi-VN")} đ
                  </span>
                </td>
                <td className="p-4 text-center">
                  {order.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                      <Clock className="w-3.5 h-3.5"/> Chờ Xử Lý
                    </span>
                  )}
                  {order.status === 'completed' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      <CheckCircle2 className="w-3.5 h-3.5"/> Đã Hoàn Thành
                    </span>
                  )}
                  {order.status === 'cancelled' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-600">
                      <XCircle className="w-3.5 h-3.5"/> Đã Hủy
                    </span>
                  )}
                </td>
                <td className="p-4 text-center text-sm text-gray-500">
                  {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString('vi-VN', {
                    hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
                  }) : 'N/A'}
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    {order.status === 'pending' && (
                      <>
                        <button onClick={() => handleUpdateStatus(order.id, 'completed')} className="text-green-600 hover:bg-green-50 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border border-green-200" title="Đánh dấu Hoàn Thành">Duyệt</button>
                        <button onClick={() => handleUpdateStatus(order.id, 'cancelled')} className="text-gray-600 hover:bg-gray-100 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border border-gray-200" title="Hủy Đơn">Hủy</button>
                      </>
                    )}
                    <button onClick={() => handleDelete(order.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors ml-2" title="Xóa Vĩnh Viễn"><Trash2 className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-12 text-center text-gray-500 text-lg">
                  Chưa có đơn hàng nào cả. Hãy quảng bá chiến dịch để hút khách nhé!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
