import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "font-headline font-bold text-lg md:text-xl py-4 px-8 rounded-xl border-2 border-pop-black transition-all duration-200 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";
  
  const variants = {
    primary: "bg-pop-orange text-white shadow-neo hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#1A1A1A]",
    secondary: "bg-pop-white text-pop-black shadow-neo hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#1A1A1A]",
    outline: "bg-transparent text-pop-black border-pop-black shadow-none hover:bg-black/5",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};