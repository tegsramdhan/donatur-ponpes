import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export const NeoCard: React.FC<NeoCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  selected = false
}) => {
  const selectedStyles = selected 
    ? "bg-pop-pink text-pop-black border-pop-black translate-x-[2px] translate-y-[2px] shadow-neo-hover" 
    : "bg-pop-white border-pop-black shadow-neo hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#1A1A1A]";

  return (
    <div 
      onClick={onClick}
      className={`border-2 rounded-2xl p-6 transition-all duration-200 cursor-pointer ${selectedStyles} ${className}`}
    >
      {children}
    </div>
  );
};