import React, { useState, useEffect } from 'react';
import { TARGET_AMOUNT } from '../constants.ts';
import { Users } from 'lucide-react';

interface SocialProofSectionProps {
  isTestMode: boolean;
}

interface DonorData {
  nama: string;
  nominal: number;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ isTestMode }) => {
  const [stats, setStats] = useState({
    total: 0,
    count: 0,
    loading: true,
    error: false
  });
  const [donors, setDonors] = useState<DonorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setStats(prev => ({ ...prev, loading: true, error: false }));
      
      const STATS_URL = isTestMode
        ? 'https://n8n-5dlxsvqcshnl.sate.sumopod.my.id/webhook-test/a04adcd2-e575-49e9-950a-4f4a2e5949e4'
        : 'https://n8n-5dlxsvqcshnl.sate.sumopod.my.id/webhook/a04adcd2-e575-49e9-950a-4f4a2e5949e4';

      const DONORS_URL = isTestMode
        ? 'https://n8n-5dlxsvqcshnl.sate.sumopod.my.id/webhook-test/9f48a6a2-d81f-467f-bb07-7ceee8cf4cc9'
        : 'https://n8n-5dlxsvqcshnl.sate.sumopod.my.id/webhook/9f48a6a2-d81f-467f-bb07-7ceee8cf4cc9';

      try {
        const [statsRes, donorsRes] = await Promise.all([
          fetch(STATS_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' } }),
          fetch(DONORS_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
        ]);

        if (!statsRes.ok || !donorsRes.ok) throw new Error('Failed to fetch data');
        
        const statsData = await statsRes.json();
        const donorsData = await donorsRes.json();
        
        setStats({
          total: statsData.total_nominal_paid || 0,
          count: statsData.paid_count || 0,
          loading: false,
          error: false
        });

        if (Array.isArray(donorsData)) {
          setDonors(donorsData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setStats(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchData();
  }, [isTestMode]);

  const percentage = Math.min((stats.total / TARGET_AMOUNT) * 100, 100);

  return (
    <section className="bg-pop-yellow pb-24 px-4 overflow-hidden">
        
      {/* Counter Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-pop-pink border-4 border-pop-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_#1A1A1A] relative">
            <div className="absolute top-4 right-4 md:top-8 md:right-8 animate-spin-slow">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white opacity-50"><path d="M12 2v20M2 12h20"/></svg>
            </div>

            <div className="text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                    <div className="bg-white border-2 border-pop-black px-4 py-1 rounded-full shadow-neo-sm">
                        <p className="font-headline text-lg text-pop-black">Total Terkumpul</p>
                    </div>
                    {!stats.loading && (
                        <div className="bg-pop-yellow border-2 border-pop-black px-4 py-1 rounded-full shadow-neo-sm flex items-center gap-2">
                            <Users size={16} className="text-pop-black" />
                            <p className="font-headline text-lg text-pop-black">{stats.count.toLocaleString('id-ID')} Donatur</p>
                        </div>
                    )}
                </div>

                <h2 className={`font-headline text-5xl md:text-7xl text-white mb-8 drop-shadow-[4px_4px_0px_#1A1A1A] stroke-black transition-opacity duration-300 ${stats.loading ? 'opacity-50' : 'opacity-100'}`}>
                    {stats.loading ? '...' : `Rp ${stats.total.toLocaleString('id-ID')}`}
                </h2>
                
                {/* Progress Bar Container */}
                <div className="w-full bg-white h-8 md:h-12 border-4 border-pop-black rounded-full overflow-hidden relative">
                    {/* Striped Pattern Overlay */}
                    <div 
                        className="h-full bg-pop-orange border-r-4 border-pop-black transition-all duration-1000 ease-out flex items-center justify-end pr-4 relative"
                        style={{ width: `${percentage}%` }}
                    >
                         <span className="font-bold font-subhead text-white text-sm md:text-lg absolute right-4 drop-shadow-md">
                            {Math.round(percentage)}%
                         </span>
                    </div>
                </div>
                <div className="flex justify-between mt-3 font-bold font-body text-pop-black/70">
                    <span>Rp 0</span>
                    <span>Target: Rp {TARGET_AMOUNT.toLocaleString('id-ID')}</span>
                </div>
                
                {stats.error && (
                    <p className="mt-4 text-white font-bold bg-red-500/50 inline-block px-4 py-1 rounded-lg">
                        Gagal memuat data terbaru, mencoba lagi...
                    </p>
                )}
            </div>
        </div>
      </div>

      {/* Marquee Donors */}
      <div className="w-full bg-pop-black py-4 transform -rotate-1 shadow-lg border-y-4 border-white mb-12">
         <div className="overflow-hidden whitespace-nowrap">
             <div className="inline-block animate-marquee">
                {donors.length > 0 ? (
                  /* Repeater for smooth infinite loop */
                  [...donors, ...donors, ...donors, ...donors].map((donor, idx) => (
                      <span key={`${idx}`} className="inline-flex items-center mx-8">
                          <span className="text-pop-pink font-headline text-2xl mr-2">★</span>
                          <span className="text-white font-subhead text-lg font-bold">
                              {donor.nama} 
                              <span className="text-pop-yellow ml-2">mendonasikan Rp {donor.nominal.toLocaleString('id-ID')}</span>
                          </span>
                      </span>
                  ))
                ) : (
                  <span className="text-white font-subhead text-lg font-bold px-10">
                    Belum ada donasi hari ini. Jadilah yang pertama menebar kebaikan! ✨
                  </span>
                )}
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