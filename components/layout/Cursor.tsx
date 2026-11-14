'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useIsTouch } from '@/lib/useIsTouch';

export function Cursor() {
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouch();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onElementOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onElementOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onElementOver);
    };
  }, [isTouch, prefersReduced, isVisible, mouseX, mouseY]);

  if (isTouch || prefersReduced || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Small center dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isHovered && cursorText ? 0 : 1,
        }}
      />

      {/* Trailing follower ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99998] flex items-center justify-center rounded-full border border-accent/60 bg-accent/10 backdrop-blur-[1px] transition-colors"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 68 : isHovered ? 44 : 32,
          height: cursorText ? 68 : isHovered ? 44 : 32,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] font-mono font-medium tracking-wider text-ink uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

