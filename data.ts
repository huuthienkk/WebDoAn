export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isBestSeller?: boolean;
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Chả bò Đà Nẵng",
    price: 350000,
    image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop",
    category: "Thịt nguội",
    description: "Chả bò Đà Nẵng nguyên chất 100% thịt bò tươi, gia vị đậm đà truyền thống. Món quà không thể thiếu khi du lịch Đà Nẵng.",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Mực một nắng",
    price: 650000,
    image: "https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?q=80&w=800&auto=format&fit=crop",
    category: "Đồ khô",
    description: "Mực ống tươi phơi qua một nắng gắt, thịt dầy, ngọt lịm. Đặc sản vùng biển miền Trung.",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Bánh khô mè bà Liễu",
    price: 60000,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop",
    category: "Bánh kẹo",
    description: "Bánh khô mè nổi tiếng, giòn tan, vị ngọt thanh. Đặc sản làng nghề truyền thống Cẩm Lệ.",
    isBestSeller: false,
  },
  {
    id: "4",
    name: "Mắm nêm Dì Cẩn",
    price: 45000,
    image: "https://images.unsplash.com/photo-1589135339644-ed476993951f?q=80&w=800&auto=format&fit=crop",
    category: "Mắm",
    description: "Mắm nêm pha sẵn Dì Cẩn, vị mặn mòi, thơm nức tiếng. Linh hồn của các món ăn miền Trung.",
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Cá bò khô tẩm gia vị",
    price: 180000,
    image: "https://images.unsplash.com/photo-1510130321703-e8473de06901?q=80&w=800&auto=format&fit=crop",
    category: "Đồ khô",
    description: "Cá bò khô thái lát mỏng tẩm ướp gia vị đậm đà, phơi nắng tự nhiên.",
    isBestSeller: true,
  }
];

export const initialCategories = [
  "Tất cả",
  "Bánh kẹo",
  "Đồ khô",
  "Mắm",
  "Thịt nguội",
  "Gia vị"
];
