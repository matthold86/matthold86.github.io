export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "AI Chatbot Assistant",
      description: "An intelligent chatbot trained on personal experience and knowledge, built with modern NLP techniques.",
      technologies: ["Python", "TensorFlow", "Next.js", "OpenAI API"],
      status: "In Progress",
      image: "/api/placeholder/400/300",
      link: "#"
    },
    {
      id: 2,
      title: "Machine Learning Model Pipeline",
      description: "End-to-end ML pipeline for automated model training, evaluation, and deployment in production.",
      technologies: ["Python", "Docker", "Kubernetes", "MLflow"],
      status: "Completed",
      image: "/api/placeholder/400/300",
      link: "#"
    },
    {
      id: 3,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for exploring and visualizing complex datasets with real-time updates.",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      status: "Completed",
      image: "/api/placeholder/400/300",
      link: "#"
    },
    {
      id: 4,
      title: "Personal Website",
      description: "This website built with Next.js, TypeScript, and Tailwind CSS - showcasing modern web development skills.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Pages"],
      status: "In Progress",
      image: "/api/placeholder/400/300",
      link: "#"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my projects, experiments, and contributions to the tech community
          </p>
        </header>

        {/* Projects Grid */}
        <main className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Project Image</span>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Link */}
                  <a 
                    href={project.link}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    View Project
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
