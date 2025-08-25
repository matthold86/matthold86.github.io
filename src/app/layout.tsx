import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import BackgroundFade from "@/components/BackgroundFade";
import ContentTransition from "@/components/ContentTransition";

export const metadata: Metadata = {
  title: "Matthew Holden - Machine Learning Engineer",
  description: "Personal website of Matthew Holden, Machine Learning Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Global Background Image - Loads once, stays across all pages */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: 'url(/home_background.jpg)',
            backgroundSize: 'cover',
            backgroundColor: '#1f2937'
          }}
        />
        
        {/* Color-matching overlay to bridge the gap */}
        <div 
          className="fixed inset-0 -z-5"
          style={{
            background: 'linear-gradient(45deg, rgba(31, 41, 55, 0.3), rgba(31, 41, 55, 0.1))',
            opacity: '0.3'
          }}
        />
        
        {/* Subtle color overlay that's always present */}
        <div 
          className="fixed inset-0 -z-5"
          style={{
            background: 'rgba(31, 41, 55, 0.1)',
            opacity: '1'
          }}
        />
        
        {/* Subtle vignette effect around edges */}
        <div 
          className="fixed inset-0 -z-5"
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(31, 41, 55, 0.4) 70%, rgba(31, 41, 55, 0.8) 100%)',
            opacity: '1'
          }}
        />
        
        <BackgroundFade>
          <Navigation showContent={true} />
          <ContentTransition>
            {children}
          </ContentTransition>
        </BackgroundFade>
      </body>
    </html>
  );
}
