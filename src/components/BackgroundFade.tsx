'use client';

import { useEffect, useState } from 'react';

interface BackgroundFadeProps {
  children: React.ReactNode;
}

export default function BackgroundFade({ children }: BackgroundFadeProps) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [fadeProgress, setFadeProgress] = useState(1); // Start at 1 (fully black)

  useEffect(() => {
    // Check if this is the initial load
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // First time visiting the website
      sessionStorage.setItem('hasVisitedBefore', 'true');
      
      // Start the fade from black to background
      const startTime = performance.now();
      const fadeDuration = 2000; // 2 seconds total fade
      
      const animateFade = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        
        // Use more precise opacity calculation - fade from 1 (black) to 0 (transparent)
        const opacity = Math.max(0, 1 - progress);
        setFadeProgress(opacity);
        
        if (progress < 1) {
          requestAnimationFrame(animateFade);
        } else {
          setIsInitialLoad(false);
        }
      };
      
      // Small delay to ensure black overlay is fully visible first
      setTimeout(() => {
        requestAnimationFrame(animateFade);
      }, 100);
    } else {
      // Subsequent visits - background already loaded
      setIsInitialLoad(false);
      setFadeProgress(0);
    }
  }, []);

  return (
    <>
      {/* Black overlay that fades out on initial load */}
      {isInitialLoad && (
        <div 
          className="fixed inset-0 bg-black z-50"
          style={{
            opacity: fadeProgress
          }}
        />
      )}
      {children}
    </>
  );
}
