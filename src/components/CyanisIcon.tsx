import React from 'react';

interface CyanisIconProps {
  className?: string;
}

function CyanisIcon({ className = "w-8 h-8" }: CyanisIconProps) {
  return (
    <img 
      src="https://i.imgur.com/x5fDYmt.png" 
      alt="CYANIS"
      className={className}
    />
  );
}

export default CyanisIcon;