"use client";
import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Product } from '@/data';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', price: 0, image: '', category: 'Tất cả', description: '', isBestSeller: false
  });
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error(error);
      alert("Lỗi tải ảnh lên Cloudinary!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, { id: editingId, ...formData } as Product);
    } else {
      addProduct({ id: Date.now().toString(), ...formData } as Product);
    }
    setFormData({ name: '', price: 0, image: '', category: 'Tất cả', description: '', isBestSeller: false });
    setEditingId(null);
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData(p);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">Quản lý Sản phẩm</h1>
      
      <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 p-8 rounded-2xl border border-gray-200">
        <div>
          <label className="block text-sm font-semibold mb-2">Tên sản phẩm *</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Giá (VNĐ) *</label>
          <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Danh mục *</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none bg-white">
            {categories.filter(c => c !== 'Tất cả').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Hình ảnh (URL hoặc Tải lên)</label>
          <div className="flex gap-2">
            <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="flex-1 w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="https://..." />
            <label className="flex-shrink-0 bg-secondary text-white px-4 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors cursor-pointer flex items-center justify-center">
              {uploading ? 'Đang tải...' : 'Tải lên'}
              <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
            </label>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Mô tả</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-none" rows={3}></textarea>
        </div>
        <div className="md:col-span-2 flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 mt-2">
          <input type="checkbox" checked={formData.isBestSeller} onChange={e => setFormData({...formData, isBestSeller: e.target.checked})} id="bestseller" className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
          <label htmlFor="bestseller" className="font-semibold cursor-pointer text-gray-700">Đánh dấu sản phẩm nổi bật (Best Seller)</label>
        </div>
        <div className="md:col-span-2 mt-4 flex items-center gap-4">
          <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-colors flex items-center gap-2 shadow-md">
            {editingId ? <><Edit className="w-5 h-5"/> Lưu thay đổi</> : <><Plus className="w-5 h-5"/> Thêm Sản phẩm</>}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', price: 0, image: '', category: 'Tất cả', description: '', isBestSeller: false }); }} className="text-gray-500 font-semibold hover:text-black">Hủy bỏ</button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 border-b border-gray-200">
              <th className="p-4 font-semibold">Hình</th>
              <th className="p-4 font-semibold">Tên sản phẩm</th>
              <th className="p-4 font-semibold">Giá</th>
              <th className="p-4 font-semibold">Danh mục</th>
              <th className="p-4 font-semibold w-32 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">Trống</div>
                  )}
                </td>
                <td className="p-4 font-semibold text-textDefault">
                  {p.name} 
                  {p.isBestSeller && <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded ml-2 uppercase font-bold tracking-wider">HOT</span>}
                </td>
                <td className="p-4 text-primary font-bold">{p.price.toLocaleString("vi-VN")} đ</td>
                <td className="p-4 text-gray-600">{p.category}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => handleEdit(p)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="Sửa"><Edit className="w-5 h-5"/></button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Xóa"><Trash2 className="w-5 h-5"/></button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">Chưa có sản phẩm nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
