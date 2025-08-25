'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ContentTransitionProps {
  children: React.ReactNode;
}

export default function ContentTransition({ children }: ContentTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check if this is the initial load
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    if (hasVisitedBefore) {
      // Website already loaded - use content transitions
      setIsInitialLoad(false);
      
      // Skip transitions for home page since it manages its own animations
      if (pathname === '/') {
        setIsVisible(true);
        return;
      }
      
      // Start transition out
      setIsVisible(false);
      
      // After fade out, change route and fade in
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300); // 300ms transition
      
      return () => clearTimeout(timer);
    } else {
      // First time loading - no transitions needed
      setIsInitialLoad(true);
    }
  }, [pathname]);

  if (isInitialLoad) {
    // First time loading - show content immediately
    return <>{children}</>;
  }

  // Skip transitions for home page
  if (pathname === '/') {
    return <>{children}</>;
  }

  // Content transitions for navigation (non-home pages)
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}
    >
      {children}
    </div>
  );
}
