"use client";
import { useProductStore } from '@/store/useProductStore';
import { Package, Tags } from 'lucide-react';

export default function AdminDashboard() {
  const { products, categories } = useProductStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Tổng quan Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Tổng Sản Phẩm</p>
            <h2 className="text-4xl font-extrabold text-textDefault">{products.length}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <Tags className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Tổng Danh Mục</p>
            <h2 className="text-4xl font-extrabold text-textDefault">{categories.length}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
