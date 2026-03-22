import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export interface MediaSlot {
  id: string;
  page: string;
  title: string;
  url: string;
  videoUrl?: string; // Optional for video slots
  width?: number;
  height?: number;
}

interface UIState {
  mediaSlots: MediaSlot[];
  isInitialized: boolean;
  initStore: () => void;
  updateMediaSlot: (id: string, url: string, videoUrl?: string) => Promise<void>;
  getMediaByPage: (page: string) => MediaSlot[];
}

const defaultMediaSlots: MediaSlot[] = [
  // HOME PAGE
  { id: 'home_hero_1', page: 'Home', title: 'Banner Slide 1', url: 'https://images.unsplash.com/photo-1559592442-9e81dfe58a74?q=80&w=2000' },
  { id: 'home_hero_2', page: 'Home', title: 'Banner Slide 2', url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2000' },
  { id: 'home_hero_3', page: 'Home', title: 'Banner Slide 3', url: 'https://images.unsplash.com/photo-1582841622366-547c6ae38c11?q=80&w=2000' },
  { id: 'home_vid_review', page: 'Home', title: 'Video Review Thumbnail', url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1200', videoUrl: '' },
  { id: 'home_specialty_table', page: 'Home', title: 'Bàn tiệc đặc sản (Lifestyle)', url: 'https://images.unsplash.com/photo-1510130321703-e8473de06901?q=80&w=1200' },
  
  // ABOUT PAGE
  { id: 'about_hero', page: 'About', title: 'About Hero Image', url: 'https://images.unsplash.com/photo-1559592442-9e81dfe58a74?q=80&w=2000' },
  { id: 'about_story', page: 'About', title: 'Story Section Image', url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1200' },
  
  // SEO GUIDE PAGE
  { id: 'seo_hero', page: 'SEO Guide', title: 'SEO Hero Background', url: 'https://images.unsplash.com/photo-1559592442-9e81dfe58a74?q=80&w=2000' },
  { id: 'seo_intro', page: 'SEO Guide', title: 'Intro Section Image', url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1200' },
  { id: 'seo_vid_thumb', page: 'SEO Guide', title: 'SEO Video Thumbnail', url: 'https://images.unsplash.com/photo-1510130321703-e8473de06901?q=80&w=1200', videoUrl: '' },

  // GENERAL SETTINGS
  { id: 'site_logo', page: 'General', title: 'Logo Website', url: '' },
];

export const useUIStore = create<UIState>()((set, get) => ({
  mediaSlots: defaultMediaSlots,
  isInitialized: false,

  initStore: () => {
    if (get().isInitialized) return;

    const docRef = doc(db, 'settings', 'ui_v2');
    onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.mediaSlots) {
          // Merge Firestore data with defaults to ensure new slots (like site_logo) are present
          const firestoreSlots = data.mediaSlots as MediaSlot[];
          const mergedSlots = defaultMediaSlots.map(defaultSlot => {
            const existing = firestoreSlots.find(s => s.id === defaultSlot.id);
            return existing ? { ...defaultSlot, ...existing } : defaultSlot;
          });
          
          // Also keep any extra slots that might be in Firestore but not in defaults (rare but possible)
          const extraSlots = firestoreSlots.filter(s => !defaultMediaSlots.find(d => d.id === s.id));
          
          set({ mediaSlots: [...mergedSlots, ...extraSlots] });
        }
      }
    });

    set({ isInitialized: true });
  },

  updateMediaSlot: async (id, url, videoUrl) => {
    const currentState = get();
    const updatedSlots = currentState.mediaSlots.map(slot => 
      slot.id === id ? { ...slot, url, videoUrl: videoUrl !== undefined ? videoUrl : slot.videoUrl } : slot
    );
    set({ mediaSlots: updatedSlots });

    const docRef = doc(db, 'settings', 'ui_v2');
    await setDoc(docRef, { mediaSlots: updatedSlots }, { merge: true });
  },

  getMediaByPage: (page: string) => {
    return get().mediaSlots.filter(slot => slot.page === page);
  }
}));
