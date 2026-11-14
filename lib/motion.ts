import type { Transition, Variants } from 'framer-motion';

export const EASINGS = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
};

export const SPRINGS = {
  magnetic: { stiffness: 120, damping: 20, mass: 0.6 },
  cursor: { stiffness: 400, damping: 28, mass: 0.2 },
  modal: { stiffness: 300, damping: 30 },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASINGS.outExpo,
      delay: customDelay,
    },
  }),
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASINGS.outExpo,
      delay: customDelay,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const lineMaskVariant: Variants = {
  hidden: { y: '100%' },
  visible: (delay: number = 0) => ({
    y: '0%',
    transition: {
      duration: 0.85,
      ease: EASINGS.outExpo,
      delay,
    },
  }),
};

