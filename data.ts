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
    image: "",
    category: "Thịt nguội",
    description: "Chả bò Đà Nẵng nguyên chất 100% thịt bò tươi, gia vị đậm đà truyền thống.",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Mực một nắng",
    price: 650000,
    image: "",
    category: "Đồ khô",
    description: "Mực ống tươi phơi qua một nắng gắt, thịt dầy, ngọt lịm.",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Bánh khô mè bà Liễu",
    price: 60000,
    image: "",
    category: "Bánh kẹo",
    description: "Bánh khô mè nổi tiếng, giòn tan, vị ngọt thanh.",
    isBestSeller: false,
  },
  {
    id: "4",
    name: "Mắm nêm Dì Cẩn",
    price: 45000,
    image: "",
    category: "Mắm",
    description: "Mắm nêm pha sẵn Dì Cẩn, vị mặn mòi.",
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Cá bò khô tẩm gia vị",
    price: 180000,
    image: "",
    category: "Đồ khô",
    description: "Cá bò khô thái lát mỏng tẩm ướp gia vị đậm đà.",
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
