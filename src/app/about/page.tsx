'use client';

import { useState, useRef, useEffect } from 'react';

export default function AboutPage() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    console.log('🚀 Sending message:', userMessage);
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      console.log('📡 Making request to chatbot API...');
      console.log('📍 URL:', 'https://personal-website-chatbot.fly.dev/chat');
      console.log('📝 Request payload:', { prompt: userMessage });
      
      const response = await fetch('https://personal-website-chatbot.fly.dev/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
        }),
      });

      console.log('📥 Response received:');
      console.log('   Status:', response.status);
      console.log('   Status Text:', response.statusText);
      console.log('   Headers:', Object.fromEntries(response.headers.entries()));
      console.log('   OK:', response.ok);

      if (response.ok) {
        const responseText = await response.text();
        console.log('📄 Raw response text:', responseText);
        
        // Handle Server-Sent Events (SSE) format
        if (responseText.includes('data: ')) {
          console.log('📡 Detected SSE format, parsing...');
          
          // Parse SSE format: extract content from "data: " lines
          const lines = responseText.split('\n');
          let fullMessage = '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const content = line.substring(6); // Remove "data: " prefix
              if (content.trim() && content.trim() !== 'end') {
                fullMessage += content;
              }
            }
          }
          
          console.log('✅ Parsed SSE response:', fullMessage);
          
          if (fullMessage.trim()) {
            setMessages(prev => [...prev, { role: 'assistant', content: fullMessage.trim() }]);
          } else {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I received an empty response from the chatbot.' }]);
          }
        } else {
          // Try to parse as regular JSON
          try {
            const data = JSON.parse(responseText);
            console.log('✅ Parsed JSON response:', data);
            
            const assistantMessage = data.response || data.message || data.content || 'Sorry, I couldn\'t process that request.';
            console.log('💬 Assistant message to display:', assistantMessage);
            
            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
          } catch (parseError) {
            console.error('❌ Failed to parse JSON response:', parseError);
            console.log('📄 Raw response that failed to parse:', responseText);
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: `Received response but couldn't parse it. Raw response: ${responseText.substring(0, 200)}...` 
            }]);
          }
        }
      } else {
        const errorText = await response.text();
        console.error('❌ API request failed:');
        console.error('   Status:', response.status);
        console.error('   Status Text:', response.statusText);
        console.error('   Error response body:', errorText);
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `API request failed (${response.status}): ${response.statusText}. Response: ${errorText.substring(0, 200)}...` 
        }]);
      }
    } catch (error) {
      console.error('💥 Network/request error:', error);
      console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
      
      let errorMessage = 'Sorry, I\'m having trouble connecting right now.';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Network error: Unable to reach the chatbot server. Please check your internet connection.';
      } else if (error instanceof TypeError && error.message.includes('CORS')) {
        errorMessage = 'CORS error: The chatbot server is not allowing requests from this origin.';
      } else if (error instanceof Error) {
        errorMessage = `Connection error: ${error.message}`;
      } else {
        errorMessage = `Connection error: ${String(error)}`;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      console.log('🏁 Request completed, setting loading to false');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
          {/* Bio Section - Shortened */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Background
            </h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
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
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Chat with Me
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p className="text-lg">👋 Hi! I'm Matthew's AI assistant.</p>
                    <p className="text-sm mt-2">Ask me anything about Matthew's background, skills, or experience!</p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Matthew..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
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
                  <li>• Deep Learning & Neural Networks </li>
                  <li>• Natural Language Processing </li>
                  <li>• Computer Vision </li>
                  <li>• Model Deployment & MLOps </li>
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
