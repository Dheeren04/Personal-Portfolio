'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Download, ExternalLink, FileText } from 'lucide-react';
import { Linkedin } from '@/components/ui/Icons';
import { siteConfig } from '@/content/site';
import { useResume } from '@/components/ui/ResumeContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { href: '#about', label: 'About', number: '01' },
  { href: '#skills', label: 'Skills', number: '02' },
  { href: '#projects', label: 'Projects', number: '03' },
  { href: '#education', label: 'Education', number: '04' },
  { href: '#certificates', label: 'Certificates', number: '05' },
  { href: '#contact', label: 'Contact', number: '06' },
];

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  const { openResume, hasViewedResume } = useResume();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99995] flex flex-col justify-between bg-bg p-6 sm:p-10 select-none md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <span className="font-serif text-2xl font-normal text-ink">
              Dheeren<span className="text-accent">.</span>
            </span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elev text-ink"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-5 py-8">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className="group flex w-full items-baseline justify-between py-1 text-left"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-accent">{item.number}</span>
                      <span
                        className={`font-serif text-3xl transition-colors ${
                          isActive ? 'text-accent' : 'text-ink group-hover:text-accent'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer actions */}
          <div className="flex flex-col gap-3 border-t border-line pt-6">
            {/* Constant View Resume Button */}
            <button
              onClick={() => {
                onClose();
                openResume();
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-line bg-bg-elev py-3.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <FileText className="h-3.5 w-3.5 text-accent" />
              <span>View Résumé (PDF)</span>
            </button>

            {/* Download Option (only unlocked once viewed) */}
            {hasViewedResume && (
              <a
                href={siteConfig.urls.resume}
                download="Dheeren_Resume.pdf"
                className="flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-mono text-xs uppercase tracking-wider text-white shadow-sm transition-opacity hover:opacity-90"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Résumé (PDF)</span>
              </a>
            )}

            <div className="flex items-center justify-between pt-2 font-mono text-xs text-ink-muted">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1 hover:text-accent">
                <Mail className="h-3 w-3" />
                <span>Email</span>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:text-accent">
                <Phone className="h-3 w-3" />
                <span>Call</span>
              </a>
              <a href={siteConfig.urls.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent">
                <Linkedin className="h-3 w-3" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
