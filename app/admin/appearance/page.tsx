"use client";
import { useState, useEffect } from 'react';
import { useUIStore, MediaSlot } from '@/store/useUIStore';
import { Save, Image as ImageIcon, Link as LinkIcon, AlertCircle, Layout, Globe, Info, Play, Settings } from 'lucide-react';

const PAGES = [
  { id: 'General', label: 'Chung', icon: Settings },
  { id: 'Home', label: 'Trang Chủ', icon: Layout },
  { id: 'About', label: 'Khám Phá', icon: Info },
  { id: 'SEO Guide', label: 'Cẩm Nang', icon: Globe },
];

export default function AdminAppearance() {
  const { mediaSlots, updateMediaSlot, initStore } = useUIStore();
  const [activePage, setActivePage] = useState('General');
  const [mounted, setMounted] = useState(false);
  const [localUrls, setLocalUrls] = useState<Record<string, string>>({});
  const [localVideoUrls, setLocalVideoUrls] = useState<Record<string, string>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    initStore();
  }, []);

  useEffect(() => {
    const urls: Record<string, string> = {};
    const videoUrls: Record<string, string> = {};
    mediaSlots.forEach(slot => {
      urls[slot.id] = slot.url;
      videoUrls[slot.id] = slot.videoUrl || '';
    });
    setLocalUrls(urls);
    setLocalVideoUrls(videoUrls);
  }, [mediaSlots]);

  if (!mounted) return null;

  const currentSlots = mediaSlots.filter(s => s.page === activePage);

  const handleSave = async (id: string) => {
    await updateMediaSlot(id, localUrls[id], localVideoUrls[id]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string, isVideo: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(isVideo ? `${id}_video` : id);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      if (isVideo) {
        setLocalVideoUrls(prev => ({ ...prev, [id]: data.url }));
      } else {
        setLocalUrls(prev => ({ ...prev, [id]: data.url }));
      }
    } catch (error) {
      alert("Lỗi tải file lên!");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h1 className="text-4xl font-heading font-black text-slate-900 mb-3">Quản lý <span className="text-primary italic">Giao diện</span></h1>
          <p className="text-gray-500 font-medium text-lg">Tùy biến hình ảnh và video cho từng trang trên website của bạn.</p>
        </div>
        <div className="flex bg-slate-50 p-2 rounded-2xl border border-gray-100">
          {PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
                activePage === page.id 
                ? "bg-white text-primary shadow-md" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <page.icon className="w-5 h-5" />
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Edit Grid */}
      <div className="grid grid-cols-1 gap-10">
        {currentSlots.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold italic text-xl">Chưa có vị trí hình ảnh nào được cấu hình cho trang này.</p>
          </div>
        ) : (
          currentSlots.map((slot) => (
            <div key={slot.id} className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
              
              {/* Preview */}
              <div className="lg:w-[450px] bg-slate-50 p-8 flex flex-col gap-4 border-r border-gray-100">
                <div 
                  className="relative aspect-video rounded-3xl overflow-hidden shadow-inner border border-gray-200 group"
                  style={{ 
                    backgroundImage: `
                      linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                      linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                      linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {localUrls[slot.id] ? (
                    <img src={localUrls[slot.id]} className="w-full h-full object-contain" alt="Preview" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                      <ImageIcon className="w-16 h-16 mb-2" />
                      <span className="font-black text-xs uppercase">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-slate-900/80 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                    {slot.id.split('_').pop()?.toUpperCase() || 'PREVIEW'}
                  </div>
                </div>
                {slot.videoUrl !== undefined && (
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Status: Video Slot</p>
                    <p className="text-[10px] text-slate-400 font-medium">Trang này hỗ trợ tải video .mp4 kèm hình thu nhỏ.</p>
                  </div>
                )}
              </div>

              {/* Edit Form */}
              <div className="flex-1 p-8 md:p-12 space-y-10">
                <div>
                  <h3 className="text-2xl font-heading font-black text-slate-900 mb-2">{slot.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">Cập nhật nội dung truyền thông cho vị trí này.</p>
                </div>

                <div className="space-y-8">
                  {/* Image URL & Upload */}
                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Hình ảnh tiêu đề / Ảnh bìa
                    </label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input
                          type="text"
                          value={localUrls[slot.id] || ''}
                          onChange={(e) => setLocalUrls(prev => ({ ...prev, [slot.id]: e.target.value }))}
                          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-0 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-700"
                          placeholder="Link hình ảnh (https://...)"
                        />
                      </div>
                      <label className="flex-shrink-0 cursor-pointer group">
                        <div className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                          uploadingId === slot.id ? 'bg-slate-100 text-slate-400' : 'bg-secondary text-primary hover:bg-primary hover:text-white shadow-xl shadow-secondary/20 group-active:scale-95'
                        }`}>
                          {uploadingId === slot.id ? 'Đang tải...' : 'Tải hình'}
                        </div>
                        <input type="file" className="hidden" accept="image/*" disabled={uploadingId === slot.id} onChange={(e) => handleFileUpload(e, slot.id, false)} />
                      </label>
                    </div>
                  </div>

                  {/* Video URL & Upload (Conditional) */}
                  {slot.videoUrl !== undefined && (
                    <div className="space-y-4 pt-6 border-t border-gray-50">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Đường dẫn Video (.mp4 / YouTube)
                      </label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                          <Play className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input
                            type="text"
                            value={localVideoUrls[slot.id] || ''}
                            onChange={(e) => setLocalVideoUrls(prev => ({ ...prev, [slot.id]: e.target.value }))}
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-0 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-700"
                            placeholder="Link video (mp4 hoặc youtube)"
                          />
                        </div>
                        <label className="flex-shrink-0 cursor-pointer group">
                          <div className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                            uploadingId === `${slot.id}_video` ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white hover:bg-slate-900 shadow-xl shadow-primary/20 group-active:scale-95'
                          }`}>
                            {uploadingId === `${slot.id}_video` ? 'Đang tải...' : 'Tải Video'}
                          </div>
                          <input type="file" className="hidden" accept="video/mp4" disabled={uploadingId === `${slot.id}_video`} onChange={(e) => handleFileUpload(e, slot.id, true)} />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => handleSave(slot.id)}
                    className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-primary transition-all shadow-2xl active:scale-95 text-xs uppercase tracking-widest disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" /> Lưu Thay Đổi
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 flex items-start gap-6">
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
           <AlertCircle className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-amber-900 mb-2">Lưu ý quan trọng</h4>
          <p className="text-amber-800/80 font-medium leading-relaxed">
            Mọi thay đổi hình ảnh sẽ được áp dụng trực tiếp cho tất cả người dùng ngay sau khi bạn nhấn "Lưu". Hãy đảm bảo hình ảnh có độ phân giải cao và tỉ lệ phù hợp (thường là 16:9 cho banner) để trang web duy trì giao diện cao cấp nhất.
          </p>
        </div>
      </div>
    </div>
  );
}
