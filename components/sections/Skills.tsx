'use client';

import React from 'react';
import { siteConfig } from '@/content/site';
import { Chip } from '@/components/ui/Chip';
import { useReducedMotion } from '@/lib/useReducedMotion';

export function Skills() {
  const prefersReduced = useReducedMotion();

  // Marquee list duplicated for seamless looping
  const marqueeItems = [...siteConfig.skills.marquee, ...siteConfig.skills.marquee];

  return (
    <section id="skills" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {siteConfig.skills.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink">
              {siteConfig.skills.heading}
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted">
            04 Clusters · Verified competencies
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Skills Marquee */}
      <div className="relative mt-12 w-full overflow-hidden border-y border-line bg-bg-elev/50 py-3.5 select-none">
        <div
          className={`flex w-max items-center gap-8 ${
            prefersReduced ? '' : 'animate-marquee hover:[animation-play-state:paused]'
          }`}
        >
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="font-mono text-xs uppercase tracking-widest text-ink font-medium">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* 4 Grouped Skill Clusters */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.skills.categories.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-line bg-bg-elev/40 p-6 sm:p-7 transition-colors hover:border-ink/25"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <h3 className="font-serif text-xl text-ink font-normal">
                    {category.title}
                  </h3>
                  <span className="font-mono text-[10px] text-accent">
                    0{idx + 1}
                  </span>
                </div>
                <p className="mt-3 text-xs text-ink-muted leading-relaxed font-light">
                  {category.description}
                </p>
              </div>

              {/* Skill chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <Chip key={sIdx} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

