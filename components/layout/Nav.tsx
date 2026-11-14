'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, ArrowUpRight, FileText, Download } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { useResume } from '@/components/ui/ResumeContext';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openResume, hasViewedResume } = useResume();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur background after 40px
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);

      // Section intersection detection
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'certificates', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-line shadow-xs py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 md:px-12">
          {/* Logo / Wordmark */}
          <a
            href="#hero"
            className="group flex items-baseline gap-0.5 font-serif text-2xl font-normal tracking-tight text-ink"
            data-cursor="Home"
          >
            <span>{siteConfig.name}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-accent font-medium' : 'text-ink-muted hover:text-ink'
                  }`}
                  data-cursor="Jump"
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Résumé Button + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Constant View Resume Button */}
            <Button
              onClick={openResume}
              variant="pill"
              className="hidden sm:inline-flex"
              data-cursor="View"
            >
              <FileText className="h-3.5 w-3.5 text-accent" />
              <span>View Resume</span>
            </Button>

            {/* Download Option (only displayed once user views it) */}
            {hasViewedResume && (
              <Button
                href={siteConfig.urls.resume}
                download="Dheeren_Resume.pdf"
                variant="pill"
                className="hidden sm:inline-flex border-accent text-accent hover:bg-accent hover:text-white"
                data-cursor="Download"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elev text-ink transition-colors hover:border-accent hover:text-accent md:hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent origin-left"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}

