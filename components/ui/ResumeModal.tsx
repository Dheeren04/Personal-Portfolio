'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { useResume } from './ResumeContext';

export function ResumeModal() {
  const { isResumeOpen, closeResume } = useResume();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeResume();
      }
    };

    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isResumeOpen, closeResume]);

  return (
    <AnimatePresence>
      {isResumeOpen && (
        <div
          className="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeResume}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-line bg-bg-elev shadow-2xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-line bg-bg px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 id="resume-modal-title" className="font-serif text-lg sm:text-xl font-normal text-ink">
                    {siteConfig.name} — Résumé
                  </h3>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-accent">
                    Document Viewer · B.Tech Data Science
                  </span>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={siteConfig.urls.resume}
                  download="Dheeren_Resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90 shadow-sm"
                  data-cursor="Download"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">Download</span>
                </a>

                <button
                  onClick={closeResume}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-line bg-bg-elev text-ink transition-colors hover:bg-ink hover:text-bg"
                  aria-label="Close résumé viewer"
                  data-cursor="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="relative flex-1 w-full bg-neutral-900/10 overflow-hidden">
              <iframe
                src={`${siteConfig.urls.resume}#toolbar=0&navpanes=0`}
                className="h-full w-full border-0"
                title="Dheeren's Résumé PDF Viewer"
              />
            </div>

            {/* Footer Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line bg-bg px-5 py-3 text-xs text-ink-muted">
              <span className="font-mono text-[11px]">
                Viewing mode active. The download option is now unlocked across the portfolio.
              </span>

              <div className="flex items-center gap-4">
                <a
                  href={siteConfig.urls.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent hover:underline"
                >
                  <span>Open in new tab</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a
                  href={siteConfig.urls.resume}
                  download="Dheeren_Resume.pdf"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink font-medium hover:text-accent"
                >
                  <Download className="h-3 w-3 text-accent" />
                  <span>Download file</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

