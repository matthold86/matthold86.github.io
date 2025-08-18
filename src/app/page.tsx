'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';

export default function Home() {
  const [blurAmount, setBlurAmount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Force image loading on component mount
    const img = new Image();
    img.onload = () => {
      console.log('Image loaded via Image constructor!');
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error('Image failed to load via Image constructor:', e);
      setImageError(true);
    };
    img.src = '/home_background.jpg';

    // Fallback: if image doesn't load within 3 seconds, show it anyway
    const fallbackTimer = setTimeout(() => {
      if (!imageLoaded && !imageError) {
        console.log('Fallback: showing image after timeout');
        setImageLoaded(true);
      }
    }, 3000);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    // Staged loading sequence
    if (imageLoaded) {
      // First show content
      setTimeout(() => {
        setShowContent(true);
      }, 500);

      // Then show background after content is visible
      setTimeout(() => {
        setShowBackground(true);
      }, 1500);
    }
  }, [imageLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxBlur = 8;
      const blurRange = windowHeight;

      if (scrollY <= blurRange) {
        const blur = (scrollY / blurRange) * maxBlur;
        setBlurAmount(blur);
      } else {
        setBlurAmount(maxBlur);
      }
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  const handleImageLoad = () => {
    console.log('Image loaded successfully via onLoad!');
    setImageLoaded(true);
  };

  // Debug: Log current state
  useEffect(() => {
    console.log('Current states - imageLoaded:', imageLoaded, 'showContent:', showContent, 'showBackground:', showBackground);
  }, [imageLoaded, showContent, showBackground]);

  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar - Fades in with content */}
      <Navigation showContent={showContent} />
      
      {/* Dynamic Background Image - Blur changes with scroll */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 transition-all duration-2000 ease-out"
        style={{
          backgroundImage: 'url(/home_background.jpg)',
          filter: `blur(${blurAmount}px)`,
          backgroundSize: 'cover',
          backgroundColor: '#1f2937'
        }}
      />

      {/* Color-matching overlay to bridge the gap */}
      <div 
        className="fixed inset-0 -z-5 transition-opacity duration-2000 ease-out"
        style={{
          background: 'linear-gradient(45deg, rgba(31, 41, 55, 0.3), rgba(31, 41, 55, 0.1))',
          opacity: showBackground ? '0.3' : '0'
        }}
      />

      {/* Subtle color overlay that's always present */}
      <div 
        className="fixed inset-0 -z-5"
        style={{
          background: 'rgba(31, 41, 55, 0.1)',
          opacity: showBackground ? '1' : '0'
        }}
      />

      {/* Subtle vignette effect around edges */}
      <div 
        className="fixed inset-0 -z-5 transition-opacity duration-2000 ease-out"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(31, 41, 55, 0.4) 70%, rgba(31, 41, 55, 0.8) 100%)',
          opacity: showBackground ? '1' : '0'
        }}
      />

      {/* Black overlay that fades out when background shows */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-2000 ease-out -z-1 ${
          showBackground ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Hero Section - Fades in first */}
      <section className={`min-h-screen flex items-center justify-center px-6 transition-all duration-2000 ease-out ${
        showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Matthew Holden
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
            Machine Learning Engineer
          </p>
          <p className="text-lg text-white max-w-2xl mx-auto drop-shadow-lg">
            Welcome to my personal website! I&apos;m passionate about building intelligent systems and solving complex problems.
            Explore my projects, read my thoughts, and let&apos;s connect.
          </p>
        </div>
      </section>

      {/* Content Sections - Blue background, starts after hero */}
      <div className={`relative transition-all duration-2000 ease-out delay-500 ${
        showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {/* Blue background that only covers the content width */}
        <div className="absolute inset-0 bg-blue-500" style={{
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(100vw, 80rem)',
          maxWidth: 'calc(100vw - 1rem)'
        }} />

        {/* Content container with proper z-index */}
        <div className="relative z-10">
          {/* About Me Section */}
          <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="bg-yellow-400 rounded-2xl shadow-lg p-12">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">
                About Me
              </h2>
              <p className="text-lg text-black mb-6 leading-relaxed">
                I&apos;m a Machine Learning Engineer with a passion for building intelligent systems that solve real-world problems. 
                With expertise in deep learning, computer vision, and natural language processing, I love turning complex ideas into 
                practical solutions.
              </p>
              <p className="text-lg text-black leading-relaxed">
                When I&apos;m not coding or training models, you&apos;ll find me exploring new technologies, contributing to open-source 
                projects, or sharing knowledge with the ML community.
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="bg-green-400 rounded-2xl shadow-lg p-12">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">
                Skills & Technologies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-black mb-2">Machine Learning</h3>
                  <p className="text-gray-700">PyTorch, TensorFlow, Scikit-learn</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-black mb-2">Programming</h3>
                  <p className="text-gray-700">Python, JavaScript, C++</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-black mb-2">Cloud & DevOps</h3>
                  <p className="text-gray-700">AWS, Docker, Kubernetes</p>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="bg-purple-400 rounded-2xl shadow-lg p-12">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">AI Chatbot</h3>
                  <p className="text-gray-700 mb-4">A conversational AI trained on my personal experience and knowledge.</p>
                  <a href="/portfolio" className="text-purple-600 hover:text-purple-800 font-medium">Learn More →</a>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-3">Computer Vision Model</h3>
                  <p className="text-gray-700 mb-4">Advanced image recognition system for industrial applications.</p>
                  <a href="/portfolio" className="text-purple-600 hover:text-purple-800 font-medium">Learn More →</a>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="bg-orange-400 rounded-2xl shadow-lg p-12">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">
                Latest Articles
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">The Future of AI in Healthcare</h3>
                  <p className="text-gray-700 mb-3">Exploring how machine learning is revolutionizing medical diagnosis and treatment.</p>
                  <a href="/blog" className="text-orange-600 hover:text-orange-800 font-medium">Read More →</a>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">Building Scalable ML Systems</h3>
                  <p className="text-gray-700 mb-3">Lessons learned from deploying machine learning models in production.</p>
                  <a href="/blog" className="text-orange-600 hover:text-orange-800 font-medium">Read More →</a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="max-w-5xl mx-auto px-6 py-20">
            <div className="bg-red-400 rounded-2xl shadow-lg p-12">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">
                Get In Touch
              </h2>
              <p className="text-lg text-black mb-8 text-center">
                Interested in collaborating on a project? Want to discuss AI and machine learning? 
                I&apos;d love to hear from you!
              </p>
              <div className="text-center">
                <a href="/contact" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Me
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center text-white">
              <p>&copy; 2024 Matthew Holden. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>

      {/* Hidden image element to trigger onLoad */}
      <img
        src="/home_background.jpg"
        alt=""
        className="hidden"
        onLoad={handleImageLoad}
        onError={(e) => console.error('Image failed to load via img element:', e)}
      />
    </div>
  );
}
