import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = '', light = false }: LogoProps) {
  // Brand colors:
  // Blue: #103060 (Dark rich navy matching the logo screenshot)
  // Red: #be123c (Crimson/Rose matching the professional polish theme)
  const navy = light ? '#ffffff' : '#0f2942';
  const crimson = light ? '#fecdd3' : '#be123c';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Text styling matching image */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className="text-stone-400 font-serif font-semibold italic text-xs leading-none mr-1">The</span>
          <span 
            className="font-serif font-black tracking-tight text-[19px] sm:text-[21px] leading-none"
            style={{ color: navy, fontFamily: 'Georgia, serif' }}
          >
            Overseas
          </span>
        </div>
        
        {/* Visa text with standard stylized horizontal wings */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-px bg-stone-300 flex-grow max-w-[16px]"></span>
          <span 
            className="text-base sm:text-lg font-bold font-serif italic leading-none tracking-wide"
            style={{ color: crimson, fontFamily: 'Georgia, serif' }}
          >
            Visa
          </span>
          <span className="h-px bg-stone-300 flex-grow max-w-[16px]"></span>
        </div>
        
        {/* Under subtitle */}
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-stone-400 leading-none mt-1">
          Visa & Immigration Services
        </span>
      </div>
    </div>
  );
}
