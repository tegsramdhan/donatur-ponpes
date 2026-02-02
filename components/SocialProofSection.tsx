import React from 'react';
import { MOCK_DONORS, TARGET_AMOUNT, CURRENT_AMOUNT } from '../constants';

export const SocialProofSection: React.FC = () => {
  const percentage = Math.min((CURRENT_AMOUNT / TARGET_AMOUNT) * 100, 100);

  return (
    <section className="bg-pop-yellow pb-24 px-4 overflow-hidden">
        
      {/* Counter Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-pop-pink border-4 border-pop-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_#1A1A1A] relative">
            <div className="absolute top-4 right-4 md:top-8 md:right-8 animate-spin-slow">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white opacity-50"><path d="M12 2v20M2 12h20"/></svg>
            </div>

            <div className="text-center">
                <p className="font-headline text-2xl text-white mb-2 stroke-black drop-shadow-sm">Total Terkumpul</p>
                <h2 className="font-headline text-5xl md:text-7xl text-white mb-6 drop-shadow-[4px_4px_0px_#1A1A1A] stroke-black">
                    Rp {CURRENT_AMOUNT.toLocaleString('id-ID')}
                </h2>
                
                {/* Progress Bar Container */}
                <div className="w-full bg-white h-8 md:h-12 border-4 border-pop-black rounded-full overflow-hidden relative">
                    {/* Striped Pattern Overlay */}
                    <div 
                        className="h-full bg-pop-orange border-r-4 border-pop-black transition-all duration-1000 ease-out flex items-center justify-end pr-4 relative"
                        style={{ width: `${percentage}%` }}
                    >
                         <span className="font-bold font-subhead text-white text-sm md:text-lg absolute right-4 drop-shadow-md">{Math.round(percentage)}%</span>
                    </div>
                </div>
                <div className="flex justify-between mt-3 font-bold font-body text-pop-black/70">
                    <span>Rp 0</span>
                    <span>Target: Rp {TARGET_AMOUNT.toLocaleString('id-ID')}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Marquee Donors */}
      <div className="w-full bg-pop-black py-4 transform -rotate-1 shadow-lg border-y-4 border-white mb-12">
         <div className="overflow-hidden whitespace-nowrap">
             <div className="inline-block animate-marquee">
                {/* Repeater for smooth infinite loop */}
                {[...MOCK_DONORS, ...MOCK_DONORS, ...MOCK_DONORS].map((donor, idx) => (
                    <span key={`${donor.id}-${idx}`} className="inline-flex items-center mx-8">
                        <span className="text-pop-pink font-headline text-2xl mr-2">★</span>
                        <span className="text-white font-subhead text-lg font-bold">
                            {donor.name} 
                            <span className="text-pop-yellow ml-2">mendonasikan Rp {donor.amount.toLocaleString('id-ID')}</span>
                        </span>
                    </span>
                ))}
             </div>
         </div>
      </div>

      {/* Footer Simple */}
      <div className="text-center font-body text-pop-black/60 font-medium">
         <p>© {new Date().getFullYear()} Pesantren Berkah. Design with Joy.</p>
      </div>

    </section>
  );
};