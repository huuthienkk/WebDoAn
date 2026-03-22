"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function FirebaseInit() {
  const initProductStore = useProductStore((state) => state.initStore);
  const initUIStore = useUIStore((state) => state.initStore);
  const initAuthStore = useAuthStore((state) => state.initStore);

  useEffect(() => {
    initProductStore();
    if (initUIStore) initUIStore();
    if (initAuthStore) initAuthStore();
  }, [initProductStore, initUIStore, initAuthStore]);

  return null;
}
