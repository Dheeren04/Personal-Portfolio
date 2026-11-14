'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[99999] flex items-center gap-2.5 rounded-full border border-line bg-ink px-4 py-2.5 text-xs font-mono text-bg shadow-lg"
          role="status"
          aria-live="polite"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
          </span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

