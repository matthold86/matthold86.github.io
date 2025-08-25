'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Function to wake up the chatbot
const wakeUpChatbot = async () => {
  try {
    console.log('Waking up chatbot...');
    const response = await fetch('https://personal-website-chatbot.fly.dev/healthz', {
      method: 'GET',
      mode: 'cors',
    });
    
    if (response.ok) {
      console.log('Chatbot health check successful - machine is waking up');
    } else {
      console.warn('Chatbot health check failed:', response.status);
    }
  } catch (error) {
    console.warn('Failed to wake up chatbot:', error);
    // Don't throw error - this is just a wake-up call, not critical for the website
  }
};

export default function Home() {
  const [blurAmount, setBlurAmount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Wake up the chatbot when the component mounts
    wakeUpChatbot();

    // Force image loading on component mount
    const img = new window.Image();
    img.onload = () => {
      console.log('Image loaded via Image constructor!');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Image failed to load via Image constructor');
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
  }, [imageLoaded, imageError]);

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

      {/* Subtle color overlay that&apos;s always present */}
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
            Data Scientist & Machine Learning Engineer
          </p>
          <p className="text-lg text-white max-w-2xl mx-auto drop-shadow-lg">
            Welcome to my personal website!
          </p>
        </div>
      </section>

      {/* Content Sections - Blue background, starts after hero */}
      <div className={`relative transition-all duration-2000 ease-out delay-500 ${
        showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {/* Subtle beige/gray background that only covers the content width */}
        <div className="absolute inset-0" style={{
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(100vw, 80rem)',
          maxWidth: 'calc(100vw - 1rem)',
          backgroundColor: 'rgba(245, 243, 240, 0.9)'
        }} />

        {/* Content container with proper z-index */}
        <div className="relative z-10">
          {/* Introduction Section */}
          <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Introduction Excerpt */}
                             <div className="space-y-6">
                 <h2 className="text-4xl font-bold text-gray-800 mb-6">
                   About Me
                 </h2>
                 <p className="text-xl text-gray-700 leading-relaxed">
                   I&apos;m a Data Scientist & Machine Learning Engineer passionate about transforming complex data into actionable insights. With expertise in statistical analysis, predictive modeling, and deep learning, I specialize in building intelligent systems that solve real-world problems.
                 </p>
                 <p className="text-lg text-gray-700 leading-relaxed">
                   My work spans across various domains including healthcare analytics, financial modeling, and computer vision applications. I believe in the power of data-driven decision making and love turning complex ideas into practical, scalable solutions.
                 </p>
                 <div className="pt-4">
                   <a href="/about" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium">
                     Learn More About Me
                     <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                     </svg>
                   </a>
                 </div>
               </div>
              
              {/* Right: Circular Photo */}
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <Image
                      src="/personal_photo.png"
                      alt="Matthew Holden"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Subtle separator line */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-white/20"></div>
          </div>

          {/* Skills Section */}
          <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Skills & Technologies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive toolkit for data science and machine learning, from statistical analysis to production deployment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Machine Learning</h3>
                <p className="text-gray-600">PyTorch, TensorFlow, Scikit-learn, Statistical Modeling</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Programming</h3>
                <p className="text-gray-600">Python, R, SQL, JavaScript, C++</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Data & Cloud</h3>
                <p className="text-gray-600">AWS, Docker, Kubernetes, Big Data, MLOps</p>
              </div>
            </div>
          </section>

          {/* Subtle separator line */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-white/20"></div>
          </div>

          {/* Projects Section */}
          <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A selection of my work showcasing data science applications, machine learning models, and analytical solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">AI-Powered Healthcare Analytics</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Developed predictive models for patient outcome analysis using electronic health records, achieving 94% accuracy in early disease detection.
                  </p>
                  <a href="/portfolio" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium">
                    View Project Details
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Computer Vision for Manufacturing</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Built real-time quality control systems using deep learning, reducing defect rates by 78% in automated production lines.
                  </p>
                  <a href="/portfolio" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium">
                    View Project Details
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Subtle separator line */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-white/20"></div>
          </div>

          {/* Blog Section */}
          <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Latest Insights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Thoughts on data science, machine learning trends, and lessons learned from building production ML systems.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">The Future of AI in Healthcare: Beyond the Hype</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Exploring practical applications of machine learning in medical diagnosis, treatment planning, and patient care management.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Data Science • Healthcare • 5 min read</span>
                  <a href="/blog" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                    Read Article →
                  </a>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:bg-white/80 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Building Scalable ML Infrastructure: Lessons from Production</h3>
                                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Key insights and best practices for deploying machine learning models at scale in enterprise environments.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">MLOps • Infrastructure • 8 min read</span>
                    <a href="/blog" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      Read Article →
                    </a>
                  </div>
              </div>
            </div>
          </section>

          {/* Subtle separator line */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-white/20"></div>
          </div>

          {/* Contact Section */}
          <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Let&apos;s Connect
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Interested in collaborating on a data science project? Want to discuss machine learning opportunities? 
                I&apos;d love to hear from you and explore how we can work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                  Get In Touch
                </a>
                <a href="https://github.com/matthold86" target="_blank" rel="noopener noreferrer" className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors border border-gray-300 shadow-lg">
                  View GitHub
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="border-t border-gray-300 pt-8">
                <p className="text-gray-500">&copy; 2024 Matthew Holden. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Hidden image element to trigger onLoad */}
      <Image
        src="/home_background.jpg"
        alt=""
        width={1}
        height={1}
        className="hidden"
        onLoad={handleImageLoad}
        onError={() => console.error('Image failed to load via img element')}
      />
    </div>
  );
}
