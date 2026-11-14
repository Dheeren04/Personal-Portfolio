'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, ArrowDown, Download, Check, FileText } from 'lucide-react';
import { Linkedin } from '@/components/ui/Icons';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useResume } from '@/components/ui/ResumeContext';

export function Hero() {
  const prefersReduced = useReducedMotion();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { openResume, hasViewedResume } = useResume();
  const { scrollY } = useScroll();

  // Parallax transform for portrait (desktop only, ±24px)
  const imageY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 24]);

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(siteConfig.email);
      setToastMessage(siteConfig.contact.toastCopySuccess);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Mobile Image (rendered on mobile before text) */}
          <div className="relative mx-auto block w-full max-w-xs lg:hidden">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-bg-elev shadow-sm">
              <Image
                src="/images/hero-photo.jpg"
                alt="Portrait of Dheeren"
                fill
                priority
                sizes="(max-width: 768px) 320px, 450px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-color" />
            </div>
          </div>

          {/* Left Column: Editorial Information */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Eyebrow & Status Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Data Science · Bangalore
              </span>
              <span className="h-3 w-[1px] bg-line" aria-hidden="true" />
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/90 px-3 py-1 font-mono text-[11px] text-ink">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span>Open to internships</span>
              </div>
            </motion.div>

            {/* Main Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-serif text-[clamp(3.8rem,11vw,9.5rem)] font-normal leading-[0.92] tracking-[-0.035em] text-ink"
            >
              {siteConfig.name}
            </motion.h1>

            {/* Role & Positioning Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-measure text-lg sm:text-xl text-ink-muted leading-relaxed font-light"
            >
              {siteConfig.positioning}
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button href="#projects" variant="primary" data-cursor="Explore">
                <span>View my projects</span>
                <span aria-hidden="true">→</span>
              </Button>

              {/* Constant View Résumé Button */}
              <Button
                onClick={openResume}
                variant="ghost"
                data-cursor="View"
              >
                <FileText className="h-3.5 w-3.5 text-accent" />
                <span>View Résumé</span>
              </Button>

              {/* Download Résumé Option (unlocked once user views the resume) */}
              {hasViewedResume && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    href={siteConfig.urls.resume}
                    download="Dheeren_Resume.pdf"
                    variant="ghost"
                    className="border-accent text-accent hover:bg-accent hover:text-white"
                    data-cursor="Download"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Résumé</span>
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Micro Contact Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-line pt-6 font-mono text-xs text-ink-muted"
            >
              <button
                onClick={copyEmailToClipboard}
                className="group flex items-center gap-1.5 transition-colors hover:text-accent"
                title="Click to copy email"
                data-cursor="Copy"
              >
                <Mail className="h-3.5 w-3.5 text-accent transition-transform group-hover:scale-110" />
                <span className="underline-offset-4 group-hover:underline">
                  {siteConfig.email}
                </span>
              </button>

              <a
                href={siteConfig.urls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-colors hover:text-accent"
                data-cursor="Open"
              >
                <Linkedin className="h-3.5 w-3.5 text-accent transition-transform group-hover:scale-110" />
                <span className="underline-offset-4 group-hover:underline">LinkedIn</span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-1.5 transition-colors hover:text-accent"
                data-cursor="Call"
              >
                <Phone className="h-3.5 w-3.5 text-accent transition-transform group-hover:scale-110" />
                <span className="underline-offset-4 group-hover:underline">{siteConfig.phone}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait (Desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-line bg-bg-elev shadow-sm"
            >
              <Image
                src="/images/hero-photo.jpg"
                alt="Portrait of Dheeren"
                fill
                priority
                sizes="(min-width: 1024px) 450px, 90vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-103"
              />
              {/* Warm studio ambient overlay */}
              <div className="absolute inset-0 bg-accent/5 mix-blend-color pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mx-auto mt-12 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase select-none"
      >
        <span>Scroll</span>
        <div className="relative h-9 w-[1px] bg-line overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="h-1/2 w-full bg-accent"
          />
        </div>
      </motion.div>

      {/* Feedback Toast */}
      <Toast message={toastMessage} />
    </section>
  );
}
