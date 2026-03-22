import { create } from 'zustand';
import { Product } from '@/data';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query } from 'firebase/firestore';

interface ProductState {
  products: Product[];
  categories: string[];
  isInitialized: boolean;
  initStore: () => void;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: string) => Promise<void>;
  deleteCategory: (category: string) => Promise<void>;
}

let unsubProducts: () => void;
let unsubCategories: () => void;

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  categories: ['Tất cả'],
  isInitialized: false,

  initStore: () => {
    if (get().isInitialized) return;

    // Lắng nghe thay đổi Sản phẩm theo thời gian thực
    const qProducts = query(collection(db, 'products'));
    unsubProducts = onSnapshot(qProducts, (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach(doc => prods.push(doc.data() as Product));
      set({ products: prods });
    });

    // Lắng nghe thay đổi Danh mục theo thời gian thực
    const qCategories = query(collection(db, 'categories'));
    unsubCategories = onSnapshot(qCategories, (snapshot) => {
      const cats: string[] = ['Tất cả'];
      snapshot.forEach(doc => {
        cats.push(doc.data().name);
      });
      set({ categories: cats });
    });

    set({ isInitialized: true });
  },

  addProduct: async (product) => {
    // Generate an ID if not exists, but usually we generate before pushing
    const docRef = doc(db, 'products', product.id);
    await setDoc(docRef, product);
  },

  updateProduct: async (id, product) => {
    const docRef = doc(db, 'products', id);
    await setDoc(docRef, product, { merge: true });
  },

  deleteProduct: async (id) => {
    await deleteDoc(doc(db, 'products', id));
  },

  addCategory: async (category) => {
    const docRef = doc(db, 'categories', category); // Use category name as document ID
    await setDoc(docRef, { name: category });
  },

  deleteCategory: async (category) => {
    await deleteDoc(doc(db, 'categories', category));
  }
}));
