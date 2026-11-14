'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Award, Calendar, BookOpen } from 'lucide-react';
import { siteConfig } from '@/content/site';

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="education" ref={ref} className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {siteConfig.education.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink">
              {siteConfig.education.heading}
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted">
            03 Academic Milestones · Newest First
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-16 sm:pl-8">
          {/* Vertical continuous drawing line */}
          <div className="absolute top-4 bottom-4 left-0 w-[1.5px] bg-line hidden sm:block">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-accent"
            />
          </div>

          {/* Timeline Cards Stack */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {siteConfig.education.items.map((item, idx) => (
              <div
                key={item.id}
                className="relative rounded-2xl border border-line bg-bg-elev p-6 sm:p-10 transition-colors hover:border-ink/25"
              >
                {/* Node indicator dot (desktop) */}
                <div className="absolute -left-[39px] top-10 hidden sm:flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent bg-bg">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 items-baseline">
                  {/* Left: Period & Status */}
                  <div className="md:col-span-4 flex flex-col gap-2">
                    <span className="font-mono text-2xl font-medium tracking-tight text-ink">
                      {item.period}
                    </span>
                    {item.status && (
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{item.status}</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Degree, Institution & Scores */}
                  <div className="md:col-span-8 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                        {item.degree}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs text-ink-muted">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="h-4 w-4 text-accent" />
                          <span>{item.institution}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-ink-muted leading-relaxed font-light">
                        {item.details}
                      </p>
                    </div>

                    {/* Academic Performance Metric Badge */}
                    <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Award className="h-3.5 w-3.5" />
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                          {item.scoreLabel}:
                        </span>
                        <span className="font-mono text-sm font-semibold text-ink tabular-numbers">
                          {item.scoreValue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
