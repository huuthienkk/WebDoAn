"use client";
import { useState, useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Save, Image as ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';
import PlaceholderImage from '@/components/PlaceholderImage';

export default function AdminAppearance() {
  const { heroImages, videoThumbnails, updateHeroImage, updateVideoThumbnail } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [localUrls, setLocalUrls] = useState<Record<string, string>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const initialUrls: Record<string, string> = {};
    heroImages.forEach(img => {
      initialUrls[img.id] = img.url;
    });
    videoThumbnails.forEach(img => {
      initialUrls[img.id] = img.url;
    });
    setLocalUrls(initialUrls);
  }, [heroImages, videoThumbnails]);

  if (!mounted) return null;

  const handleSave = (id: string, isVideo: boolean = false) => {
    if (isVideo) {
      updateVideoThumbnail(id, localUrls[id]);
    } else {
      updateHeroImage(id, localUrls[id]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(id);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setLocalUrls(prev => ({ ...prev, [id]: result.url }));
      } else {
        alert("Lỗi tải ảnh!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi tải ảnh!");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-5xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-primary mb-3">Tùy biến Giao Diện</h1>
        <p className="text-gray-600 font-medium">Thay đổi hình ảnh Banner (Slider) Trang chủ phù hợp với các chiến dịch, sự kiện doanh nghiệp.</p>
      </div>

      <div className="space-y-12">
        {heroImages.map((slot, index) => (
          <div key={slot.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            
            {/* Preview Cột Trái */}
            <div className="w-full lg:w-96 shrink-0 aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white shadow-inner flex items-center justify-center relative group">
              {localUrls[slot.id] ? (
                <img src={localUrls[slot.id]} alt={slot.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <ImageIcon className="w-16 h-16" />
                  <span className="font-semibold text-sm">Chưa thiết lập ảnh</span>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                Vị trí {index + 1}
              </div>
            </div>

            {/* Chi tiết form Cột Phải */}
            <div className="flex-1 w-full space-y-5">
              <h3 className="text-xl font-bold text-textDefault pb-3 border-b border-gray-200">
                {slot.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-primary" /> Hình ảnh (URL hoặc Tải lên)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={localUrls[slot.id] || ''}
                      onChange={(e) => setLocalUrls({ ...localUrls, [slot.id]: e.target.value })}
                      className="flex-1 w-full bg-white border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                      placeholder="https://..."
                    />
                    <label className="flex-shrink-0 bg-secondary text-white px-6 py-4 rounded-xl font-bold hover:bg-yellow-600 transition-colors cursor-pointer flex items-center justify-center">
                      {uploadingId === slot.id ? 'Đang tải...' : 'Tải hình lên'}
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, slot.id)} disabled={uploadingId === slot.id} className="hidden" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3 text-secondary"/> Khuyên dùng hình khổ ngang (Tỉ lệ 16:9) để hiển thị đẹp nhất.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleSave(slot.id)}
                  disabled={localUrls[slot.id] === slot.url}
                  className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${
                    localUrls[slot.id] !== slot.url
                      ? 'bg-primary text-white hover:bg-red-800 shadow-md transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-5 h-5"/> {localUrls[slot.id] !== slot.url ? 'Lưu Thay Đổi' : 'Đã Lưu Vị Trí Này'}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
      <div className="mt-16 mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-primary mb-3">Video Giới Thiệu</h2>
        <p className="text-gray-600 font-medium">Thay đổi hình thu nhỏ (Thumbnail) của Video trong phần Về Chúng Tôi ngoài trang chủ.</p>
      </div>

      <div className="space-y-12 mb-16">
        {videoThumbnails.map((slot, index) => (
          <div key={slot.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            
            {/* Preview Cột Trái */}
            <div className="w-full lg:w-96 shrink-0 aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white shadow-inner flex items-center justify-center relative group">
              {localUrls[slot.id] ? (
                <img src={localUrls[slot.id]} alt={slot.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <ImageIcon className="w-16 h-16" />
                  <span className="font-semibold text-sm">Chưa thiết lập ảnh</span>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                Video {index + 1}
              </div>
            </div>

            {/* Chi tiết form Cột Phải */}
            <div className="flex-1 w-full space-y-5">
              <h3 className="text-xl font-bold text-textDefault pb-3 border-b border-gray-200">
                {slot.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-primary" /> Hình thu nhỏ (URL hoặc Tải lên)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={localUrls[slot.id] || ''}
                      onChange={(e) => setLocalUrls({ ...localUrls, [slot.id]: e.target.value })}
                      className="flex-1 w-full bg-white border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                      placeholder="https://..."
                    />
                    <label className="flex-shrink-0 bg-secondary text-white px-6 py-4 rounded-xl font-bold hover:bg-yellow-600 transition-colors cursor-pointer flex items-center justify-center">
                      {uploadingId === slot.id ? 'Đang tải...' : 'Tải hình lên'}
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, slot.id)} disabled={uploadingId === slot.id} className="hidden" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3 text-secondary"/> Khuyên dùng hình khổ ngang (Tỉ lệ 16:9).
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleSave(slot.id, true)}
                  disabled={localUrls[slot.id] === slot.url}
                  className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${
                    localUrls[slot.id] !== slot.url
                      ? 'bg-primary text-white hover:bg-red-800 shadow-md transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-5 h-5"/> {localUrls[slot.id] !== slot.url ? 'Lưu Thay Đổi' : 'Đã Lưu Vị Trí Này'}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
