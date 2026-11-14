'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ResumeContextType {
  isResumeOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
  hasViewedResume: boolean;
}

const ResumeContext = createContext<ResumeContextType>({
  isResumeOpen: false,
  openResume: () => {},
  closeResume: () => {},
  hasViewedResume: false,
});

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [hasViewedResume, setHasViewedResume] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('dheeren_has_viewed_resume') === 'true') {
      setHasViewedResume(true);
    }
  }, []);

  const openResume = () => {
    setIsResumeOpen(true);
    setHasViewedResume(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dheeren_has_viewed_resume', 'true');
    }
  };

  const closeResume = () => {
    setIsResumeOpen(false);
  };

  return (
    <ResumeContext.Provider value={{ isResumeOpen, openResume, closeResume, hasViewedResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}

