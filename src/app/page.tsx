export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Matthew Holden
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Machine Learning Engineer
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/matthold86"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/matthew-holden86/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/resume"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Resume
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m a Machine Learning Engineer passionate about building intelligent systems and solving complex problems. 
              This website is currently under construction as I learn Next.js and modern web development.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project showcase and blog posts will be added here.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Chatbot
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI chatbot trained on my experience - coming soon!
                </p>
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
