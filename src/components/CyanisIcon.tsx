import React from 'react';

interface CyanisIconProps {
  className?: string;
}

function CyanisIcon({ className = "w-4 h-4" }: CyanisIconProps) {
  return (
    <img 
      src="/icon.png" 
      alt="CYANIS"
      className={className}
    />
  );
}

export default CyanisIcon;