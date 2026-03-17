import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HeroImageSlot {
  id: string;
  title: string;
  url: string;
}

interface UIState {
  heroImages: HeroImageSlot[];
  videoThumbnails: HeroImageSlot[];
  updateHeroImage: (id: string, url: string) => void;
  updateVideoThumbnail: (id: string, url: string) => void;
}

const defaultHeroImages: HeroImageSlot[] = [
  { id: 'slide_1', title: 'Slide 1 (Sự kiện/Khuyến mãi)', url: '' },
  { id: 'slide_2', title: 'Slide 2 (Sản phẩm mới nổi bật)', url: '' },
  { id: 'slide_3', title: 'Slide 3 (Thông điệp thương hiệu)', url: '' },
];

const defaultVideoThumbnails: HeroImageSlot[] = [
  { id: 'vid_1', title: 'Video giới thiệu 1', url: '' },
  { id: 'vid_2', title: 'Video giới thiệu 2', url: '' },
];

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      heroImages: defaultHeroImages,
      videoThumbnails: defaultVideoThumbnails,
      updateHeroImage: (id, url) => set((state) => ({
        heroImages: state.heroImages.map(img => img.id === id ? { ...img, url } : img)
      })),
      updateVideoThumbnail: (id, url) => set((state) => ({
        videoThumbnails: state.videoThumbnails.map(img => img.id === id ? { ...img, url } : img)
      }))
    }),
    { name: 'ui-settings-storage' }
  )
);
