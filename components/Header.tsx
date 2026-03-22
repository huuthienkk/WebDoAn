"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCart";
import { useState, useEffect } from "react";

import { useUIStore } from "@/store/useUIStore";

export default function Header() {
  const { mediaSlots, initStore } = useUIStore();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const useDarkText = isScrolled || !isHomePage;

  const logoUrl = mediaSlots.find(s => s.id === 'site_logo')?.url;

  // Client-side hydration check for cart badge
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initStore();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initStore]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          {logoUrl && (
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-all" 
            />
          )}
          <span className={`text-2xl md:text-3xl font-heading font-extrabold tracking-tighter ${useDarkText ? "text-primary" : "text-white drop-shadow-2xl"}`}>
            Quà <span className="text-secondary tracking-normal">Đà Nẵng</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-10">
          <Link href="/" className={`text-lg font-bold hover:text-secondary transition-all hover:scale-105 ${useDarkText ? "text-textDefault" : "text-white"}`}>Trang Chủ</Link>
          <div className="group relative">
            <Link href="/products" className={`flex items-center text-lg font-bold hover:text-secondary transition-all hover:scale-105 ${useDarkText ? "text-textDefault" : "text-white"}`}>
              Sản Phẩm
            </Link>
          </div>
          <Link href="/about" className={`text-lg font-bold hover:text-secondary transition-all hover:scale-105 ${useDarkText ? "text-textDefault" : "text-white"}`}>Khám Phá</Link>
          <Link href="/contact" className={`text-lg font-bold hover:text-secondary transition-all hover:scale-105 ${useDarkText ? "text-textDefault" : "text-white"}`}>Liên hệ</Link>
          <Link href="/dac-san-da-nang" className={`text-lg font-bold hover:text-secondary transition-all hover:scale-105 ${useDarkText ? "text-textDefault" : "text-white"}`}>Cẩm Nang</Link>
          <Link href="/track-order" className={`text-lg font-extrabold hover:bg-secondary hover:text-primary transition-all ${useDarkText ? "text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/20" : "text-white bg-white/10 px-4 py-2 rounded-xl border border-white/20"}`}>Tra cứu</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Search Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                setSearchQuery("");
                setMobileMenuOpen(false);
              }
            }}
            className={`flex items-center rounded-2xl px-4 py-2 transition-all ${useDarkText ? "bg-white border-gray-200 shadow-sm" : "bg-white/10 border-white/20 backdrop-blur-md"} border focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary w-36 md:w-56 lg:w-64`}
          >
            <input 
              type="text"
              placeholder="Tìm đặc sản..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent outline-none text-sm w-full placeholder-gray-400 font-medium ${useDarkText ? "text-textDefault" : "text-white"}`}
            />
            <button type="submit" className={`hover:text-secondary transition-colors ${useDarkText ? "text-primary" : "text-white"}`}>
              <Search className="w-5 h-5 ml-1" />
            </button>
          </form>
          
          <button onClick={toggleCart} className={`relative flex items-center hover:text-secondary transition-transform hover:scale-110 ${useDarkText ? "text-primary" : "text-white"}`}>
            <ShoppingCart className="w-7 h-7" />
            {mounted && totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {totalItems()}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden hover:text-secondary transition-colors ${useDarkText ? "text-textDefault" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col px-6 py-8 space-y-6">
            <Link href="/" className="text-textDefault font-bold text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Trang Chủ</Link>
            <Link href="/products" className="text-textDefault font-bold text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Sản Phẩm</Link>
            <Link href="/about" className="text-textDefault font-bold text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Khám Phá</Link>
            <Link href="/contact" className="text-textDefault font-bold text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Liên hệ</Link>
            <Link href="/dac-san-da-nang" className="text-textDefault font-bold text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Cẩm Nang</Link>
            <Link href="/track-order" className="text-white font-black bg-primary p-4 rounded-xl text-center mt-4 shadow-lg shadow-primary/20" onClick={() => setMobileMenuOpen(false)}>Tra cứu Đơn Hàng</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
