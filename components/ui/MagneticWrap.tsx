'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIsTouch } from '@/lib/useIsTouch';

interface MagneticWrapProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticWrap({
  children,
  className = '',
  strength = 16,
}: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouch();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || isTouch || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({
      x: (distanceX / (width / 2)) * strength,
      y: (distanceY / (height / 2)) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (prefersReduced || isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

