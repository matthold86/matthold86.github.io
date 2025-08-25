'use client';

import { useState, useEffect } from 'react';
import Chatbot from '@/components/Chatbot';

export default function AboutPage() {
  const [blurAmount, setBlurAmount] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content with a slight delay for smooth entrance
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="min-h-screen pt-20">
      {/* Dynamic Background Effects - Only scroll-based blur, other effects are in layout */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-2000 ease-out"
        style={{
          filter: `blur(${blurAmount}px)`,
        }}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className={`text-center mb-16 transition-all duration-700 ease-out delay-100 ${
          showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            About Me
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            Machine Learning Engineer passionate about building intelligent systems and solving complex problems
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {/* Bio Section - Shortened */}
          <section className={`mb-16 transition-all duration-700 ease-out delay-200 ${
            showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
              Background
            </h2>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I&apos;m a Machine Learning Engineer with a passion for developing intelligent systems that solve real-world problems. 
                My journey in AI/ML began with academic research and has evolved into building production-ready machine learning solutions.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  💡 Want to get to know me better? Ask me anything in the chatbot below!
                </p>
              </div>
            </div>
          </section>

          {/* Chatbot Section */}
          <section className={`mb-16 transition-all duration-700 ease-out delay-300 ${
            showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
              Chat with Me
            </h2>
            <Chatbot />
          </section>

          {/* Skills Section */}
          <section className={`mb-16 transition-all duration-700 ease-out delay-400 ${
            showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Machine Learning</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Deep Learning & Neural Networks </li>
                  <li>• Natural Language Processing </li>
                  <li>• Computer Vision </li>
                  <li>• Model Deployment & MLOps </li>
                </ul>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technologies</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Python, TensorFlow, PyTorch</li>
                  <li>• AWS, Docker, Kubernetes</li>
                  <li>• Next.js, React, TypeScript</li>
                  <li>• Git, CI/CD, Testing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className={`mb-16 transition-all duration-700 ease-out delay-500 ${
            showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
              Experience
            </h2>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-md">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Machine Learning Engineer</h3>
                  <p className="text-gray-600 dark:text-gray-400">Company Name • 2023 - Present</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Developing and deploying machine learning models for production use cases, 
                    including recommendation systems and predictive analytics.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Scientist</h3>
                  <p className="text-gray-600 dark:text-gray-400">Previous Company • 2021 - 2023</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Built statistical models and conducted data analysis to drive business decisions 
                    and improve operational efficiency.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
