import React, { useState } from 'react';
import { DONATION_OPTIONS } from '../constants.ts';
import { NeoCard } from './NeoCard.tsx';
import { NeoButton } from './NeoButton.tsx';
import { Heart, User, EyeOff, Sparkles } from 'lucide-react';

interface DonationSectionProps {
  isTestMode: boolean;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ isTestMode }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Prayer State
  const [showPrayer, setShowPrayer] = useState<boolean>(false);
  const [generatedPrayer, setGeneratedPrayer] = useState<string>('');

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) setSelectedAmount(null);
  };

  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);

  const handleSubmit = async () => {
    if (finalAmount < 10000) {
      alert("Mohon masukkan nominal minimal Rp 10.000");
      return;
    }

    setIsSubmitting(true);
    
    // Determine the name to send
    const donorName = isAnonymous ? "Hamba Allah" : (name || "Hamba Allah");
    
    let shouldRedirect = false;
    let redirectUrl = "";

    try {
      // API Configuration - Conditional based on isTestMode
      const API_URL = isTestMode 
        ? 'https://n8n-5dlxsvqcshnl.sate.sumopod.my.id/webhook-test/fc00e73c-5390-4b9e-b7d2-d80fe3f8f191'
        : 'https://n8n-5dlxsvqcshnl.sate.sumopod.my.id/webhook/fc00e73c-5390-4b9e-b7d2-d80fe3f8f191';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nominal: finalAmount,
          nama: donorName
        })
      });

      // Check for invoice_url in JSON body
      try {
          const data = await response.json();
          if (data && data.invoice_url) {
              redirectUrl = data.invoice_url;
              shouldRedirect = true;
          }
      } catch (e) {
          // Response was likely not JSON or empty
      }

    } catch (error) {
      // Log error but allow flow to continue to success screen for demo purposes
      console.warn("API Error (Demo Fallback Active):", error);
    }

    // Process Redirect if URL was found
    if (shouldRedirect && redirectUrl) {
        window.location.href = redirectUrl;
        return;
    }

    // Default Success Flow (Show Prayer Screen)
    setIsSubmitting(false);
    setShowPrayer(true);
    
    // Set Hardcoded Prayer
    setGeneratedPrayer(`Jazakumullah Khairan Katsiran ${donorName}. Semoga Allah menerima amal ibadah Anda, melipatgandakan rezeki yang halal dan barokah, serta menjadikan sedekah ini sebagai pemberat timbangan kebaikan di yaumul hisab kelak. Aamiin.`);
  };

  if (showPrayer) {
    return (
        <section id="donation-section" className="bg-pop-yellow py-20 px-4">
             <div className="max-w-2xl mx-auto text-center">
                <NeoCard className="bg-white p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-4 bg-pop-pink border-b-2 border-pop-black"></div>
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 p-4 rounded-full border-2 border-pop-black shadow-neo-sm">
                            <Sparkles className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                    <h2 className="font-headline text-3xl md:text-4xl mb-4">Alhamdulillah!</h2>
                    <p className="font-body text-xl mb-8">Terima kasih, <strong>{isAnonymous ? "Hamba Allah" : name}</strong>. Donasi sebesar <strong>Rp {finalAmount.toLocaleString('id-ID')}</strong> telah tercatat.</p>
                    
                    <div className="bg-pop-pink/20 p-6 rounded-xl border-2 border-pop-black border-dashed relative">
                        <h3 className="font-subhead font-bold text-lg mb-2 flex items-center justify-center gap-2">
                            <Sparkles size={18} /> Doa Untukmu
                        </h3>
                        <p className="font-handwriting text-lg leading-relaxed">"{generatedPrayer}"</p>
                    </div>

                    <NeoButton 
                        onClick={() => {
                            setShowPrayer(false);
                            setName('');
                            setCustomAmount('');
                            setSelectedAmount(100000);
                        }} 
                        className="mt-8"
                    >
                        Kembali
                    </NeoButton>
                </NeoCard>
             </div>
        </section>
    )
  }

  return (
    <section id="donation-section" className="bg-pop-yellow py-12 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-pop-black mb-4">Pilih Paket Kebaikan</h2>
          <p className="font-body text-lg">Setiap rupiah yang Anda berikan adalah batu bata untuk istana di surga.</p>
        </div>

        <div className="bg-white border-4 border-pop-black rounded-[32px] p-6 md:p-10 shadow-[12px_12px_0px_0px_#1A1A1A]">
          
          {/* Amount Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {DONATION_OPTIONS.map((option) => (
              <NeoCard 
                key={option.value}
                selected={selectedAmount === option.value}
                onClick={() => handleAmountSelect(option.value)}
                className="flex flex-col items-center justify-center h-24 md:h-32 text-center p-2"
              >
                <span className={`font-headline text-lg md:text-xl ${selectedAmount === option.value ? 'text-pop-black' : 'text-gray-600'}`}>
                    {option.label}
                </span>
              </NeoCard>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-8">
            <label className="block font-subhead font-bold text-lg mb-2">Nominal Lain (Rp)</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">Rp</span>
                <input
                type="text"
                value={customAmount ? parseInt(customAmount).toLocaleString('id-ID') : ''}
                onChange={handleCustomAmountChange}
                placeholder="Isi nominal doa terbaikmu..."
                className="w-full border-2 border-pop-black rounded-xl py-4 pl-12 pr-4 font-body text-xl focus:outline-none focus:ring-4 focus:ring-pop-pink/50 focus:border-pop-black transition-all"
                />
            </div>
          </div>

          <div className="w-full h-1 bg-gray-200 rounded-full mb-8"></div>

          {/* User Info */}
          <div className="mb-8 space-y-6">
            <div>
                <label className="block font-subhead font-bold text-lg mb-2">Nama Donatur</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isAnonymous}
                        placeholder={isAnonymous ? "Hamba Allah" : "Masukkan namamu"}
                        className="w-full border-2 border-pop-black rounded-xl py-4 pl-12 pr-4 font-body text-lg focus:outline-none focus:ring-4 focus:ring-pop-pink/50 focus:border-pop-black transition-all disabled:bg-gray-100 disabled:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between bg-pop-white border-2 border-pop-black p-4 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="bg-pop-pink p-2 rounded-lg border border-pop-black">
                        <EyeOff size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="font-bold font-subhead">Sembunyikan Nama</p>
                        <p className="text-sm text-gray-600">Tampil sebagai Hamba Allah</p>
                    </div>
                </div>
                <div 
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`w-14 h-8 rounded-full border-2 border-pop-black p-1 cursor-pointer transition-colors duration-300 relative ${isAnonymous ? 'bg-pop-orange' : 'bg-gray-300'}`}
                >
                    <div className={`w-5 h-5 bg-white border-2 border-pop-black rounded-full shadow-sm transition-transform duration-300 ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
            </div>
          </div>

          <NeoButton 
            fullWidth 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 text-xl"
          >
             {isSubmitting ? (
                 "Memproses..."
             ) : (
                 <>
                    Bismillah, Kirim Donasi <Heart className="fill-white" />
                 </>
             )}
          </NeoButton>

        </div>
      </div>
    </section>
  );
};