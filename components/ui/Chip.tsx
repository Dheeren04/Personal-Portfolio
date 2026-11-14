'use client';

import React from 'react';

interface ChipProps {
  label: string;
  className?: string;
}

export function Chip({ label, className = '' }: ChipProps) {
  return (
    <div
      className={`group relative inline-flex items-center rounded-full border border-line bg-bg-elev px-4 py-2 text-xs font-mono text-ink transition-transform duration-200 hover:-translate-y-0.5 select-none ${className}`}
      data-cursor="Skill"
    >
      <span className="relative z-10">{label}</span>
      {/* Animated terracotta underline on hover */}
      <span className="absolute bottom-1 left-4 right-4 h-[1.5px] scale-x-0 bg-accent transition-transform duration-300 origin-left group-hover:scale-x-100" />
    </div>
  );
}

