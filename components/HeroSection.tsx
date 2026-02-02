import React from 'react';
import { ArrowDown } from 'lucide-react';
import { NeoButton } from './NeoButton';

interface HeroSectionProps {
  onDonateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDonateClick }) => {
  return (
    <section className="bg-pop-pink relative pt-12 pb-24 px-4 md:px-8 overflow-hidden min-h-[80vh] flex items-center">
      {/* Background Decor Elements */}
      <div className="absolute top-10 left-10 text-pop-yellow animate-pulse hidden md:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      </div>
      <div className="absolute bottom-32 right-10 text-white animate-bounce hidden md:block">
         <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-20">
        
        {/* Text Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <div className="inline-block bg-pop-yellow border-2 border-pop-black px-4 py-1 rounded-full mb-6 transform -rotate-2 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <span className="font-bold font-body text-sm md:text-base">✨ #JoyfulGiving</span>
          </div>
          
          <h1 className="font-headline text-5xl md:text-7xl text-pop-white drop-shadow-[4px_4px_0px_#1A1A1A] leading-tight mb-6 stroke-black">
            Investasi Akhirat,<br />
            <span className="text-pop-black">Mulai Hari Ini.</span>
          </h1>
          
          <p className="font-body text-lg md:text-xl text-pop-black/90 mb-10 max-w-lg mx-auto md:mx-0 font-medium">
            Bangun peradaban dengan wakaf tunai. Mudah, transparan, dan penuh berkah untuk santri penghafal Quran.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
             <NeoButton onClick={onDonateClick} className="flex items-center justify-center gap-2">
               Donasi Sekarang <ArrowDown size={24} strokeWidth={3} />
             </NeoButton>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="order-1 md:order-2 flex justify-center relative">
            <div className="relative">
                {/* Flexible container for the illustration */}
                <div className="relative z-10 w-full max-w-[400px] md:max-w-[800px]">
                     <img 
                        src="https://pgfnrjpogmvnuzjnuuxc.supabase.co/storage/v1/object/public/image/madrasah-removebg-preview.png" 
                        alt="Mecha Madrasah Illustration" 
                        className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 hover:rotate-2 transition-transform duration-500"
                     />
                     {/* Decorative Floating Elements */}
                     <div className="hidden md:block absolute -top-8 -right-8 bg-pop-white border-2 border-pop-black p-3 rounded-xl shadow-neo animate-bounce">
                        <span className="text-2xl">🕌</span>
                     </div>
                     <div className="hidden md:block absolute -bottom-4 -left-4 bg-pop-orange border-2 border-pop-black p-3 rounded-full shadow-neo animate-pulse">
                        <span className="text-2xl">❤️</span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};