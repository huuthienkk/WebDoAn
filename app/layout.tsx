import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Quà Đà Nẵng - Đặc sản Miền Trung',
  description: 'Thương hiệu quà tặng đặc sản Đà Nẵng chính gốc, hương vị truyền thống, chất lượng tuyệt hảo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-background text-textDefault overscroll-none`}>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}
