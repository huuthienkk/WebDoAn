"use client";
import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory } = useProductStore();
  const [newCat, setNewCat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCat.trim() && newCat !== 'Tất cả') {
      addCategory(newCat.trim());
      setNewCat('');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">Quản lý Danh mục</h1>
      
      <form onSubmit={handleSubmit} className="mb-10 flex gap-4">
        <input 
          type="text" 
          value={newCat} 
          onChange={e => setNewCat(e.target.value)} 
          className="flex-1 border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" 
          placeholder="Tên danh mục mới..." 
          required
        />
        <button type="submit" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-red-800 transition-colors flex items-center gap-2 shadow-md">
          <Plus className="w-5 h-5"/> Thêm Danh mục
        </button>
      </form>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {categories.map(c => (
            <li key={c} className="p-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
              <span className="font-semibold text-lg text-textDefault">{c}</span>
              {c !== 'Tất cả' && (
                <button onClick={() => deleteCategory(c)} className="text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors" title="Xóa">
                  <Trash2 className="w-5 h-5"/>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
