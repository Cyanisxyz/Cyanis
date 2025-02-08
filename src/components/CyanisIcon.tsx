import React from 'react';

interface CyanisIconProps {
  className?: string;
}

function CyanisIcon({ className = "w-6 h-6" }: CyanisIconProps) {
  return (
    <img 
      src="https://i.imgur.com/29gXrPb.png" 
      alt="CYANIS"
      className={className}
    />
  );
}

export default CyanisIcon;