import React from 'react';
import { Settings, CheckCircle2, AlertCircle } from 'lucide-react';

interface DebugToggleProps {
  isTestMode: boolean;
  onToggle: () => void;
}

export const DebugToggle: React.FC<DebugToggleProps> = ({ isTestMode, onToggle }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      <div 
        onClick={onToggle}
        className={`
          flex items-center gap-3 p-3 rounded-2xl border-2 border-pop-black cursor-pointer 
          transition-all duration-300 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] 
          hover:shadow-[10px_10px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] 
          active:shadow-none
          ${isTestMode ? 'bg-pop-pink' : 'bg-green-400'}
        `}
      >
        <div className="bg-white border-2 border-pop-black p-2 rounded-lg">
          <Settings size={20} className="animate-spin-slow" />
        </div>
        <div className="pr-2">
          <p className="font-headline text-xs uppercase tracking-wider text-pop-black/60">API Environment</p>
          <div className="flex items-center gap-2 font-subhead font-bold text-pop-black">
            {isTestMode ? (
              <>
                <AlertCircle size={16} /> 
                <span>TEST MODE</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>PRODUCTION</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-4 scale-0 group-hover:scale-100 transition-all origin-bottom-right duration-200">
        <div className="bg-pop-black text-white text-xs p-3 rounded-xl border-2 border-white shadow-xl min-w-[200px]">
          <p className="font-bold mb-1">Target Webhook:</p>
          <p className="font-mono break-all opacity-80">
            {isTestMode 
              ? '.../webhook-test/...' 
              : '.../webhook/...'
            }
          </p>
        </div>
      </div>
    </div>
  );
};