'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Globe, CheckCircle2, ArrowUpRight, Users } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { siteConfig } from '@/content/site';

function ProjectCaseStudy({
  project,
  index,
}: {
  project: (typeof siteConfig.projects.items)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const isEven = index % 2 === 1; // Alternating layout

  const domain = project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-line bg-bg-elev p-6 sm:p-10 md:p-14 shadow-sm transition-all duration-300 hover:border-ink/30"
    >
      <div
        className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center ${
          isEven ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
        }`}
      >
        {/* Text Column */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            {/* Meta Header, Status & Team Badges */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted">
              {project.year && (
                <>
                  <span className="text-accent font-medium">{project.year}</span>
                  <span>/</span>
                </>
              )}
              <span>{project.category}</span>
              <span>/</span>

              {/* Live Pill */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-[11px] text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span>Live</span>
              </div>

              {/* Team Project Badge */}
              {project.isTeam && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] text-accent">
                  <Users className="h-3 w-3" />
                  <span>Team project</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ink">
              {project.title}
            </h3>

            {/* Summary */}
            <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed font-light">
              {project.summary}
            </p>

            {/* Bullets with Scroll Reveal */}
            <div className="mt-8 space-y-4">
              {project.bullets.map((bullet, bIdx) => (
                <motion.div
                  key={bIdx}
                  initial={{ opacity: 0, x: isEven ? 16 : -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 16 : -16 }}
                  transition={{ duration: 0.5, delay: 0.15 + bIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-1" />
                  <span className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                    {bullet}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tags & Action Buttons */}
          <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="rounded-full border border-line bg-bg px-3.5 py-1.5 font-mono text-xs text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Live Site Button */}
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90 shadow-sm"
                data-cursor="Visit"
              >
                <span>Visit live site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {/* Secondary GitHub Button (if present) */}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-bg px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-bg"
                  data-cursor="Code"
                >
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              )}

              <span className="font-mono text-xs text-ink-muted">
                {domain}
              </span>
            </div>
          </div>
        </div>

        {/* Mockup Preview Column */}
        <div className="lg:col-span-5">
          <div
            className="group/mockup relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-bg shadow-md transition-all duration-500 hover:scale-[1.02]"
            data-cursor="Live"
          >
            {/* Browser Frame Window Header */}
            <div className="flex items-center justify-between border-b border-line bg-bg-elev/80 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>

              {/* Browser URL bar pill */}
              <div className="mx-2 flex flex-1 items-center justify-center rounded-md border border-line bg-bg/80 px-3 py-1 font-mono text-[10px] text-ink-muted">
                <span className="truncate">{project.links.live}</span>
              </div>

              <Globe className="h-3.5 w-3.5 text-ink-muted" />
            </div>

            {/* Styled Placeholder Mockup Interior */}
            <div className="relative flex h-[calc(100%-43px)] flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-bg via-bg-elev to-bg">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-bg text-accent mb-4 transition-transform duration-300 group-hover/mockup:scale-110 shadow-xs">
                <Globe className="h-8 w-8" />
              </div>

              <span className="font-serif text-2xl font-normal text-ink">
                {project.title.split('—')[0].trim()}
              </span>
              <span className="mt-1 font-mono text-xs text-accent">
                {project.category}
              </span>
              <p className="mt-3 max-w-xs text-xs text-ink-muted leading-relaxed font-light line-clamp-2">
                {project.summary}
              </p>

              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent transition-colors hover:underline"
              >
                <span>Launch Live Application</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {siteConfig.projects.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-ink">
              {siteConfig.projects.heading}
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted">
            {siteConfig.projects.subtitle}
          </p>
        </div>

        {/* Alternating Featured Case Studies Stack */}
        <div className="mt-16 flex flex-col gap-14 sm:gap-20">
          {siteConfig.projects.items.map((project, idx) => (
            <ProjectCaseStudy key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
