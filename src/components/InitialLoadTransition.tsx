'use client';

import { useEffect, useState } from 'react';

interface InitialLoadTransitionProps {
  children: React.ReactNode;
}

export default function InitialLoadTransition({ children }: InitialLoadTransitionProps) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [fadeProgress, setFadeProgress] = useState(0);

  useEffect(() => {
    // Check if this is the initial load
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // First time visiting the website
      sessionStorage.setItem('hasVisitedBefore', 'true');
      
      // Start the fade from black to background
      const startTime = Date.now();
      const fadeDuration = 3000; // 3 seconds total fade
      
      const fadeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        
        setFadeProgress(progress);
        
        if (progress >= 1) {
          setBackgroundLoaded(true);
          clearInterval(fadeInterval);
        }
      }, 16); // 60fps animation
      
      return () => clearInterval(fadeInterval);
    } else {
      // Subsequent visits - background already loaded
      setBackgroundLoaded(true);
      setFadeProgress(1);
    }
  }, []);

  if (!backgroundLoaded) {
    // Initial load: show black screen that fades to background
    return (
      <>
        {/* Black overlay that fades out */}
        <div 
          className="fixed inset-0 bg-black z-50 transition-opacity duration-3000 ease-out"
          style={{
            opacity: 1 - fadeProgress
          }}
        />
        {/* Content is hidden during initial fade */}
        <div className="opacity-0">
          {children}
        </div>
      </>
    );
  }

  // After fade complete, show content normally
  return <>{children}</>;
}
