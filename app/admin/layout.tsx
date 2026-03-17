"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, Package, Tags, LayoutDashboard, HomeIcon, Images } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router]);

  if (!mounted) return null;

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50 flex text-textDefault">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col z-10 sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100 mb-6">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-3">
          <Link href="/" target="_blank" className="flex items-center gap-3 p-3 rounded-xl transition-colors text-gray-600 hover:bg-gray-100">
            <HomeIcon className="w-5 h-5"/> Xem giao diện
          </Link>
          <div className="border-t border-gray-100 my-4" />
          <Link href="/admin" className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
            <LayoutDashboard className="w-5 h-5"/> Tổng quan
          </Link>
          <Link href="/admin/products" className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin/products' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Package className="w-5 h-5"/> Sản phẩm
          </Link>
          <Link href="/admin/categories" className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin/categories' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Tags className="w-5 h-5"/> Danh mục
          </Link>
          <Link href="/admin/appearance" className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === '/admin/appearance' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Images className="w-5 h-5"/> Giao diện
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100 mt-auto">
          <button onClick={() => { logout(); router.push('/admin/login'); }} className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold">
            <LogOut className="w-5 h-5"/> Đăng xuất
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
