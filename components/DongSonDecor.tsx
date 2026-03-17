import React from "react";

export const DrumPattern = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 500 500" className={className} fill="none" stroke="currentColor">
      {/* Tâm trống - Ngôi sao 14 cánh */}
      <circle cx="250" cy="250" r="40" fill="currentColor" />
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / 14} 250 250)`}>
          <polygon points="250,55 238,190 262,190" fill="currentColor" stroke="none" />
        </g>
      ))}

      {/* Các vòng tròn đồng tâm */}
      <circle cx="250" cy="250" r="190" strokeWidth="2" />
      <circle cx="250" cy="250" r="196" strokeWidth="1" />
      <circle cx="250" cy="250" r="210" strokeWidth="4" />
      <circle cx="250" cy="250" r="225" strokeWidth="1" strokeDasharray="6 6" />
      <circle cx="250" cy="250" r="240" strokeWidth="3" />
      <circle cx="250" cy="250" r="248" strokeWidth="1" />

      {/* Họa tiết răng cưa */}
      {Array.from({ length: 60 }).map((_, i) => (
        <g key={`tooth-${i}`} transform={`rotate(${(i * 360) / 60} 250 250)`}>
          <polygon points="250,196 244,210 256,210" fill="currentColor" stroke="none" />
        </g>
      ))}
      {Array.from({ length: 80 }).map((_, i) => (
        <g key={`tooth2-${i}`} transform={`rotate(${(i * 360) / 80} 250 250)`}>
          <polygon points="250,225 245,240 255,240" fill="currentColor" stroke="none" />
        </g>
      ))}

      {/* Vòng chấm bi nhỏ */}
      {Array.from({ length: 90 }).map((_, i) => {
        const angle = (i * 360) / 90;
        const rad = (angle * Math.PI) / 180;
        const x = 250 + 218 * Math.cos(rad);
        const y = 250 + 218 * Math.sin(rad);
        return <circle key={`dot-${i}`} cx={x} cy={y} r="2" fill="currentColor" stroke="none" />;
      })}
    </svg>
  );
};

export const ChimLac = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 300 300" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <g transform="translate(150, 150) rotate(-15) translate(-150, -150)">
        {/* Mỏ */}
        <polygon points="280,100 160,130 180,140" fill="currentColor" stroke="none" />
        
        {/* Đầu & Mắt */}
        <polygon points="160,130 140,120 130,145 150,150" fill="currentColor" stroke="none" />
        <circle cx="145" cy="135" r="3" fill="#fff" stroke="none" />
        
        {/* Cổ */}
        <polygon points="130,145 90,180 105,190 150,150" fill="currentColor" stroke="none" />
        
        {/* Mào chim */}
        <polyline points="140,120 110,60 125,110" />
        <polyline points="130,125 90,70 115,120" />
        <polyline points="120,135 80,90 105,135" />
        <polyline points="110,145 70,110 95,150" />
        
        {/* Thân */}
        <polygon points="105,190 40,210 35,240 90,230" fill="currentColor" stroke="none" />
        
        {/* Cánh trên */}
        <polyline points="90,180 40,80 60,175" />
        <polyline points="80,185 20,90 45,185" />
        <polyline points="70,190 0,110 30,195" />
        
        {/* Đuôi xoè */}
        <polyline points="35,240 -20,190 20,240" />
        <polyline points="45,235 -30,220 10,245" />
        <polyline points="55,230 -25,250 25,250" />
      </g>
    </svg>
  );
};
