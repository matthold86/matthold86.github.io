export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Machine Learning Engineer passionate about building intelligent systems and solving complex problems
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {/* Bio Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Background
            </h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I&apos;m a Machine Learning Engineer with a passion for developing intelligent systems that solve real-world problems. 
                My journey in AI/ML began with academic research and has evolved into building production-ready machine learning solutions.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                When I&apos;m not coding or training models, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the ML community.
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Machine Learning</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Deep Learning & Neural Networks</li>
                  <li>• Natural Language Processing</li>
                  <li>• Computer Vision</li>
                  <li>• Model Deployment & MLOps</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
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
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Experience
            </h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
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
