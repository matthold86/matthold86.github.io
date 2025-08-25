import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

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
        
        {/* Subtle overlay for better text readability */}
        <div 
          className="fixed inset-0 -z-5"
          style={{
            background: 'rgba(31, 41, 55, 0.1)'
          }}
        />
        
        <Navigation showContent={true} />
        {children}
      </body>
    </html>
  );
}
