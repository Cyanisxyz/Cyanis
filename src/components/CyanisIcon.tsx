import React from 'react';

interface CyanisIconProps {
  className?: string;
}

function CyanisIcon({ className = "w-4 h-4" }: CyanisIconProps) {
  return (
    <img 
      src="https://i.imgur.com/29gXrPb.png" 
      alt="CYANIS"
      className={className}
    />
  );
}

export default CyanisIcon;