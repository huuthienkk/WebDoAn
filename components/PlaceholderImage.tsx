import { ImageIcon } from "lucide-react";

export default function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-gray-100 text-gray-300 w-full h-full ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <ImageIcon className="w-12 h-12" />
        <span className="text-xs font-semibold">Chưa có ảnh</span>
      </div>
    </div>
  );
}
