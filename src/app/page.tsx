export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Latest deployment test - GitHub Pages should show this */}
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Matthew Holden
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Machine Learning Engineer
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Welcome to my personal website! I&apos;m passionate about building intelligent systems and solving complex problems. 
            Explore my projects, read my thoughts, and let&apos;s connect.
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m a Machine Learning Engineer with expertise in developing and deploying intelligent systems. 
              This website showcases my projects, thoughts, and journey in technology.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  AI Chatbot
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  An intelligent chatbot trained on my personal experience and knowledge.
                </p>
                <a href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                  Learn More →
                </a>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  ML Pipeline
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  End-to-end machine learning pipeline for automated model training and deployment.
                </p>
                <a href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                  Learn More →
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            Built with Next.js and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}
