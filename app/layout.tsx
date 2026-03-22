import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import FirebaseInit from '@/components/FirebaseInit';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: 'Quà Đà Nẵng - Đặc sản Miền Trung Chính Gốc',
  description: 'Khám phá tinh hoa đặc sản Đà Nẵng: Chả bò, bánh tráng, hải sản khô... Mang hương vị miền Trung đến tận nhà bạn với chất lượng tuyệt hảo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} font-sans bg-background text-textDefault overscroll-none`}>
        <FirebaseInit />
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
