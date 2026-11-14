'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface CertificateModalData {
  id: string;
  title: string;
  issuer: string;
  year: string;
  fileUrl: string;
  isPdf: boolean;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateModalData | null;
}

export function Modal({ isOpen, onClose, certificate }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && certificate && (
        <div
          className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-bg-elev shadow-2xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  {certificate.issuer} · {certificate.year}
                </span>
                <h3 id="modal-title" className="font-serif text-xl font-normal text-ink">
                  {certificate.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-ink transition-colors hover:bg-ink hover:text-bg"
                aria-label="Close dialog"
                data-cursor="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Media Body */}
            <div className="relative flex min-h-[350px] flex-1 items-center justify-center overflow-auto bg-black/5 p-4 sm:p-8">
              {certificate.isPdf ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="mb-4 font-mono text-sm text-ink-muted">
                    This credential is a PDF document.
                  </p>
                  <a
                    href={certificate.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                  >
                    <span>Open PDF Document</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : (
                <div className="relative h-full min-h-[300px] max-h-[60vh] w-full">
                  <Image
                    src={certificate.fileUrl}
                    alt={certificate.title}
                    fill
                    sizes="(max-width: 1024px) 95vw, 850px"
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Footer description & action */}
            <div className="flex flex-col gap-3 border-t border-line bg-bg px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-xs text-ink-muted leading-relaxed">
                {certificate.description}
              </p>
              <a
                href={certificate.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:underline"
              >
                <span>View Full File</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

