import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialProducts, initialCategories, Product } from '@/data';

interface ProductState {
  products: Product[];
  categories: string[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      categories: initialCategories,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, product) => set((state) => ({
        products: state.products.map(p => p.id === id ? product : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      addCategory: (category) => set((state) => {
        if (!state.categories.includes(category)) {
          return { categories: [...state.categories, category] };
        }
        return state;
      }),
      deleteCategory: (category) => set((state) => ({
        categories: state.categories.filter(c => c !== category)
      })),
    }),
    { name: 'product-storage' }
  )
);
