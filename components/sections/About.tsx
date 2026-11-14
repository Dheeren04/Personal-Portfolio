'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '@/content/site';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [cgpaCounter, setCgpaCounter] = useState('0.00');

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const target = 8.09;
    const duration = 1400; // ms
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * target;
      setCgpaCounter(current.toFixed(2));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCgpaCounter(target.toFixed(2));
      }
    }

    requestAnimationFrame(step);
  }, [isInView]);

  return (
    <section id="about" ref={ref} className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Eyebrow */}
        <div className="font-mono text-xs uppercase tracking-widest text-accent">
          {siteConfig.about.eyebrow}
        </div>

        {/* Content Layout */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Big Pull Statement */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight text-ink">
              &ldquo;{siteConfig.about.pullStatement}&rdquo;
            </h2>
          </div>

          {/* Right Column: Narrative + At-a-glance grid */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div className="space-y-4 text-ink-muted text-base sm:text-lg leading-relaxed font-light">
              {siteConfig.about.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* At-a-glance Grid */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4">
              {siteConfig.about.quickFacts.map((fact, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                    {fact.label}
                  </span>
                  <span className="mt-1 font-mono text-base font-medium text-ink tabular-numbers">
                    {fact.numericValue ? `${cgpaCounter}${fact.suffix || ''}` : fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

