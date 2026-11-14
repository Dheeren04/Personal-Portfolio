'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock } from 'lucide-react';
import { siteConfig } from '@/content/site';

export function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setCurrentTime(`${timeStr} IST`);
      } catch {
        setCurrentTime('18:00 IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-line bg-bg py-12 select-none">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: Timezone / Location */}
          <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
            <Clock className="h-3.5 w-3.5 text-accent" />
            <span>Bengaluru, {currentTime || 'Loading...'}</span>
          </div>

          {/* Center: Copyright & Attribution */}
          <div className="text-center font-mono text-xs text-ink-muted">
            <span>© {siteConfig.footer.copyrightYear} {siteConfig.name}. </span>
            <span className="hidden sm:inline-block">{siteConfig.footer.colophon}</span>
          </div>

          {/* Right: Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-accent"
            data-cursor="Top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

