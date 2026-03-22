import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const productDoc = await getDoc(doc(db, "products", params.id));
    if (productDoc.exists()) {
      const product = productDoc.data();
      return {
        title: `${product.name} | Quà Đà Nẵng`,
        description: product.description || `Khám phá đặc sản ${product.name} chính gốc tại Quà Đà Nẵng.`,
        openGraph: {
          title: `${product.name} | Quà Đà Nẵng`,
          description: product.description || `Khám phá đặc sản ${product.name} chính gốc tại Quà Đà Nẵng.`,
          images: [{ url: product.image || '/logo.png' }],
        }
      };
    }
  } catch (error) {
    console.error("Lỗi lấy metadata sản phẩm:", error);
  }

  return {
    title: "Sản phẩm | Quà Đà Nẵng",
    description: "Khám phá các đặc sản miền Trung tại Quà Đà Nẵng."
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
