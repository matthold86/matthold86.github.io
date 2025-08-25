'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavigationProps {
  showContent?: boolean;
}

export default function Navigation({ showContent = true }: NavigationProps) {
  const pathname = usePathname()
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    // Check if this is the initial load
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // First time visiting - wait for content to load before showing navigation
      setIsInitialLoad(true);
      // Show navigation after content has appeared (3.5s total timing)
      setTimeout(() => {
        setShowNavigation(true);
      }, 2000);
    } else {
      // Subsequent visits - show navigation immediately
      setIsInitialLoad(false);
      setShowNavigation(true);
    }
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <nav className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-1000 ease-out ${
      showNavigation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-out hover:scale-105">
            Matthew Holden
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                  {/* Active indicator line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:text-blue-400 transform scale-x-100 transition-transform duration-300 ease-out" />
                  )}
                  {/* Hover indicator line */}
                  {!isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:text-blue-400 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
