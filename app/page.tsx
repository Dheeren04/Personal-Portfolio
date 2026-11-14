'use client';

import React, { useState } from 'react';
import { IntroLoader } from '@/components/loader/IntroLoader';
import { Nav } from '@/components/layout/Nav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Education } from '@/components/sections/Education';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { ResumeProvider } from '@/components/ui/ResumeContext';
import { ResumeModal } from '@/components/ui/ResumeModal';

export default function Home() {
  const [loaderActive, setLoaderActive] = useState(true);

  return (
    <ResumeProvider>
      {loaderActive && (
        <IntroLoader onComplete={() => setLoaderActive(false)} />
      )}

      <div className="relative flex min-h-screen flex-col bg-bg text-ink selection:bg-accent selection:text-white">
        <Nav />
        <main id="main-content" className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Global Résumé Viewer Modal */}
      <ResumeModal />
    </ResumeProvider>
  );
}
