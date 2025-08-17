export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Building an AI Chatbot: From Concept to Deployment",
      excerpt: "A deep dive into the process of creating an intelligent chatbot trained on personal knowledge and experience. Learn about the challenges, solutions, and lessons learned along the way.",
      date: "August 16, 2025",
      readTime: "8 min read",
      category: "Machine Learning",
      image: "/api/placeholder/400/250",
      link: "#"
    },
    {
      id: 2,
      title: "The Future of MLOps: Automating Model Lifecycle Management",
      excerpt: "Exploring modern approaches to machine learning operations, including automated training pipelines, model versioning, and production deployment strategies.",
      date: "August 10, 2025",
      readTime: "12 min read",
      category: "MLOps",
      image: "/api/placeholder/400/250",
      link: "#"
    },
    {
      id: 3,
      title: "Learning Next.js: My Journey into Modern Web Development",
      excerpt: "Reflections on transitioning from backend development to full-stack web development, and how Next.js has transformed my approach to building user interfaces.",
      date: "August 5, 2025",
      readTime: "6 min read",
      category: "Web Development",
      image: "/api/placeholder/400/250",
      link: "#"
    },
    {
      id: 4,
      title: "Effective Data Visualization: Principles and Best Practices",
      excerpt: "Key principles for creating clear, informative, and engaging data visualizations that effectively communicate insights to stakeholders and end users.",
      date: "July 28, 2025",
      readTime: "10 min read",
      category: "Data Science",
      image: "/api/placeholder/400/250",
      link: "#"
    }
  ]

  const categories = ["All", "Machine Learning", "MLOps", "Web Development", "Data Science"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights on machine learning, web development, and technology
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <main className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  {/* Post Image */}
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">Blog Image</span>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <a href={post.link}>{post.title}</a>
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.date}
                      </span>
                      
                      <a 
                        href={post.link}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        Read More
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
