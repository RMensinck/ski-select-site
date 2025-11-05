import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  centerContent?: boolean;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`bg-bg rounded-xl shadow-lg p-8 max-w-7xl ${className}`}
    >
      {children}
    </div>
  );
}