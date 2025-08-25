'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    // Check if this is the initial load or subsequent navigation
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // First time visiting the website
      setIsInitialLoad(true);
      setBackgroundLoaded(false);
      sessionStorage.setItem('hasVisitedBefore', 'true');
      
      // Simulate background loading time
      const timer = setTimeout(() => {
        setBackgroundLoaded(true);
      }, 1000); // 1 second to simulate background loading
      
      return () => clearTimeout(timer);
    } else {
      // Subsequent navigation
      setIsInitialLoad(false);
      setBackgroundLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      // Initial load: wait for background to load, then show content
      if (backgroundLoaded) {
        setIsVisible(true);
      }
    } else {
      // Subsequent navigation: fast cross-fade
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 150); // Fast 150ms transition
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad, backgroundLoaded]);

  if (isInitialLoad && !backgroundLoaded) {
    // Initial load: show black screen while background loads
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
      }`}
    >
      {children}
    </div>
  );
}
