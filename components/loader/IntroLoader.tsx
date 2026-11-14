'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Linkedin } from '@/components/ui/Icons';
import { siteConfig } from '@/content/site';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const GREETINGS = ['Hello', 'Namaste', 'ನಮಸ್ಕಾರ', 'Dheeren.'];

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showContacts, setShowContacts] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const finishLoader = useCallback(() => {
    setIsExiting(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dheeren_intro_seen', 'true');
    }
    setTimeout(() => {
      onComplete();
    }, 900); // 0.9s curtain wipe transition
  }, [onComplete]);

  useEffect(() => {
    // If already seen in this session or reduced motion
    const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('dheeren_intro_seen');

    if (alreadySeen || prefersReduced) {
      const timer = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Show skip button after 0.8s
    const skipTimer = setTimeout(() => setShowSkip(true), 800);

    // Hard timeout safety at 3.5s
    const safetyTimeout = setTimeout(() => {
      finishLoader();
    }, 3500);

    // Eased progress counter from 0 to 100
    const startTime = performance.now();
    const duration = 2100; // 2.1s counter

    let rafId: number;
    function updateProgress(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const currentVal = Math.floor(eased * 100);
      setProgress(currentVal);

      if (t < 1) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
      }
    }
    rafId = requestAnimationFrame(updateProgress);

    // Greetings cycle (0.6s -> 0.95s -> 1.30s -> 1.65s)
    const g1 = setTimeout(() => setGreetingIndex(1), 950);
    const g2 = setTimeout(() => setGreetingIndex(2), 1300);
    const g3 = setTimeout(() => setGreetingIndex(3), 1650);

    // Contact reveal at 1.7s
    const contactTimer = setTimeout(() => setShowContacts(true), 1700);

    // Start exit wipe at 2.4s
    const exitTimer = setTimeout(() => {
      finishLoader();
    }, 2450);

    // Handle ESC key for skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishLoader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(skipTimer);
      clearTimeout(safetyTimeout);
      clearTimeout(g1);
      clearTimeout(g2);
      clearTimeout(g3);
      clearTimeout(contactTimer);
      clearTimeout(exitTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finishLoader, onComplete, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-bg text-ink">
        <p className="font-mono text-sm tracking-wider uppercase">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="intro-loader"
        initial={{ y: 0 }}
        animate={isExiting ? { y: '-100%' } : { y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1], // ease-in-out-quart curtain wipe
        }}
        className="fixed inset-0 z-[100000] flex flex-col justify-between bg-bg p-6 sm:p-10 md:p-14 select-none"
      >
        {/* Top bar: Left metadata + Right status & Skip */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-ink-muted uppercase">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            PORTFOLIO — 2026
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              LOADING
            </motion.span>

            {showSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={finishLoader}
                className="group flex items-center gap-1 rounded-full border border-line bg-bg-elev px-3 py-1 text-ink transition-colors hover:border-accent hover:text-accent"
                aria-label="Skip intro sequence"
              >
                <span>Skip</span>
                <span className="text-[9px] text-ink-muted">ESC</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Center: Cultural Greetings Cycle + Contact Reveal */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Animated greeting */}
          <div className="relative h-20 sm:h-28 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={greetingIndex}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-ink font-normal"
              >
                {GREETINGS[greetingIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtag & Contact Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={showContacts ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col items-center gap-4"
          >
            <p className="font-mono text-xs tracking-widest text-ink-muted uppercase">
              Data Science · Bangalore
            </p>

            {/* Quick Contact Micro-Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-elev/80 px-3.5 py-1.5 font-mono text-[11px] text-ink hover:text-accent hover:border-accent transition-colors"
              >
                <Mail className="h-3 w-3 text-accent" />
                <span>{siteConfig.email}</span>
              </a>

              <a
                href={siteConfig.urls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-elev/80 px-3.5 py-1.5 font-mono text-[11px] text-ink hover:text-accent hover:border-accent transition-colors"
              >
                <Linkedin className="h-3 w-3 text-accent" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-elev/80 px-3.5 py-1.5 font-mono text-[11px] text-ink hover:text-accent hover:border-accent transition-colors"
              >
                <Phone className="h-3 w-3 text-accent" />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar: Large Counter + Progress Hairline */}
        <div className="relative pt-6">
          <div className="flex items-end justify-between font-mono">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-ink tabular-numbers">
                {String(progress).padStart(3, '0')}
              </span>
              <span className="text-xs text-ink-muted">%</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Bengaluru, IN
            </span>
          </div>

          {/* Bottom hairline progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-line overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
