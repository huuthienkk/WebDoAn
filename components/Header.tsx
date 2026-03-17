"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCart";
import { useState, useEffect } from "react";

export default function Header() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const useDarkText = isScrolled || !isHomePage;

  // Client-side hydration check for cart badge
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className={`text-2xl font-bold tracking-tight ${useDarkText ? "text-primary" : "text-white drop-shadow-lg"}`}>
            Quà Đà Nẵng
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/" className={`font-semibold hover:text-secondary transition-colors ${useDarkText ? "text-textDefault" : "text-white"}`}>Trang Chủ</Link>
          <div className="group relative">
            <Link href="/products" className={`flex items-center font-semibold hover:text-secondary transition-colors ${useDarkText ? "text-textDefault" : "text-white"}`}>
              Sản Phẩm
            </Link>
            {/* Multi-level Dropdown Placeholder */}
            {/* <div className="absolute top-full left-0 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity bg-white text-textDefault rounded shadow-lg p-2 mt-2 w-48">
              <Link href="/products?category=banh-keo" className="block px-4 py-2 hover:bg-gray-100 rounded">Bánh kẹo</Link>
              <Link href="/products?category=do-kho" className="block px-4 py-2 hover:bg-gray-100 rounded">Đồ khô</Link>
              <Link href="/products?category=mam" className="block px-4 py-2 hover:bg-gray-100 rounded">Mắm</Link>
            </div> */}
          </div>
          <Link href="/about" className={`font-semibold hover:text-secondary transition-colors ${useDarkText ? "text-textDefault" : "text-white"}`}>Về chúng tôi</Link>
          <Link href="/contact" className={`font-semibold hover:text-secondary transition-colors ${useDarkText ? "text-textDefault" : "text-white"}`}>Liên hệ</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button className={`hover:text-secondary transition-colors ${useDarkText ? "text-textDefault" : "text-white"}`}>
            <Search className="w-5 h-5" />
          </button>
          
          <button onClick={toggleCart} className={`relative flex items-center hover:text-secondary transition-colors ${useDarkText ? "text-textDefault" : "text-white"}`}>
            <ShoppingCart className="w-6 h-6" />
            {mounted && totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-background shadow-lg border-t border-gray-200">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <Link href="/" className="text-textDefault font-semibold" onClick={() => setMobileMenuOpen(false)}>Trang Chủ</Link>
            <Link href="/products" className="text-textDefault font-semibold" onClick={() => setMobileMenuOpen(false)}>Sản Phẩm</Link>
            <Link href="/about" className="text-textDefault font-semibold" onClick={() => setMobileMenuOpen(false)}>Về chúng tôi</Link>
            <Link href="/contact" className="text-textDefault font-semibold" onClick={() => setMobileMenuOpen(false)}>Liên hệ</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
