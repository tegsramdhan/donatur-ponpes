import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { WavyDivider } from './components/WavyDivider';
import { DonationSection } from './components/DonationSection';
import { SocialProofSection } from './components/SocialProofSection';
import { DebugToggle } from './components/DebugToggle';

const App: React.FC = () => {
  const [isTestMode, setIsTestMode] = useState(false);

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
      <DonationSection isTestMode={isTestMode} />
      <SocialProofSection isTestMode={isTestMode} />
      
      {/* Environment Switcher for Testing/Production */}
      <DebugToggle 
        isTestMode={isTestMode} 
        onToggle={() => setIsTestMode(!isTestMode)} 
      />
    </div>
  );
};

export default App;