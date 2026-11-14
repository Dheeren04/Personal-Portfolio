'use client';

import React from 'react';
import Link from 'next/link';
import { MagneticWrap } from './MagneticWrap';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'pill';
  className?: string;
  magnetic?: boolean;
  type?: 'button' | 'submit' | 'reset';
  download?: boolean | string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  'data-cursor'?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  magnetic = true,
  type = 'button',
  download,
  target,
  rel,
  disabled = false,
  'data-cursor': dataCursor,
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] select-none';

  const variants = {
    primary:
      'bg-accent text-[#FAF7F1] px-6 py-3.5 rounded-full hover:bg-accent/90 shadow-sm hover:shadow',
    ghost:
      'border border-ink/20 text-ink px-6 py-3.5 rounded-full hover:bg-ink hover:text-bg hover:border-transparent',
    pill:
      'border border-line bg-bg-elev/80 backdrop-blur-sm text-ink px-4 py-2 rounded-full hover:border-accent hover:text-accent',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  let element: React.ReactNode;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || download;
    if (isExternal) {
      element = (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          download={download}
          className={combinedStyles}
          data-cursor={dataCursor}
        >
          {content}
        </a>
      );
    } else {
      element = (
        <Link href={href} className={combinedStyles} data-cursor={dataCursor}>
          {content}
        </Link>
      );
    }
  } else {
    element = (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedStyles}
        data-cursor={dataCursor}
      >
        {content}
      </button>
    );
  }

  if (magnetic && !disabled) {
    return <MagneticWrap strength={12}>{element}</MagneticWrap>;
  }

  return element;
}

