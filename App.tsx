import React from 'react';
import { HeroSection } from './components/HeroSection';
import { WavyDivider } from './components/WavyDivider';
import { DonationSection } from './components/DonationSection';
import { SocialProofSection } from './components/SocialProofSection';

const App: React.FC = () => {
  const scrollToDonation = () => {
    const section = document.getElementById('donation-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-pop-yellow w-full overflow-x-hidden selection:bg-pop-pink selection:text-white">
      <HeroSection onDonateClick={scrollToDonation} />
      <WavyDivider />
      <DonationSection />
      <SocialProofSection />
    </div>
  );
};

export default App;