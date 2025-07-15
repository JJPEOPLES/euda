import React from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Code, 
  Star, 
  Zap, 
  Coffee, 
  Github, 
  Twitter,
  Mail,
  Sparkles,
  Rocket,
  Trophy,
  Target,
  Users,
  Globe,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  const stats = [
    { icon: Code, value: '5', label: 'Editors Built' },
    { icon: Zap, value: '100%', label: 'Free Forever' },
    { icon: Users, value: '∞', label: 'Users Welcomed' },
    { icon: Globe, value: '0', label: 'Data Collected' }
  ]

  const features = [
    {
      icon: '🎨',
      title: 'Image Editor',
      description: 'Professional image editing with layers, drawing tools, and filters'
    },
    {
      icon: '💻',
      title: 'Code Editor',
      description: 'Monaco-powered editor with syntax highlighting for 100+ languages'
    },
    {
      icon: '🎬',
      title: 'Video Editor',
      description: 'Timeline-based video editing with playback controls'
    },
    {
      icon: '🎵',
      title: 'Audio Editor',
      description: 'Waveform visualization with recording and effects'
    },
    {
      icon: '📄',
      title: 'Document Editor',
      description: 'Rich text editing with templates and export options'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Euda</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">About Euda</span>
            </div>
          </div>
        </div>
      </nav>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-6 -right-6 text-6xl"
            >
              🚀
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Built by an
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                {' '}11-Year-Old{' '}
              </span>
              Developer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Proving that age is just a number when you have passion, creativity, and determination. 
              Euda is a professional-grade editing suite that rivals expensive alternatives - and it's completely free!
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full font-medium flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Young Developer
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full font-medium flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Made with Love
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
            >
              <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-16 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Story Behind Euda</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Sometimes the best innovations come from the youngest minds
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why I Built Euda</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  🎯 I was frustrated with expensive editing software that had subscription fees and complicated interfaces.
                </p>
                <p>
                  💡 I realized that with modern web technologies, I could build something better - and make it free for everyone.
                </p>
                <p>
                  🚀 After months of coding, learning, and problem-solving, Euda was born - a professional editing suite that anyone can use.
                </p>
                <p>
                  ❤️ My goal is to democratize creative tools and show that you don't need expensive software to create amazing things.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What Makes Euda Special</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">100% Free Forever</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">No Data Collection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">Works Offline</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">Professional Features</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200">Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Five Editors, One Amazing App
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'TypeScript', icon: '🔷' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'Vite', icon: '⚡' },
              { name: 'Monaco Editor', icon: '💻' },
              { name: 'Fabric.js', icon: '🖼️' },
              { name: 'WaveSurfer.js', icon: '🎵' },
              { name: 'Framer Motion', icon: '🎬' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Message Section */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">A Message to Young Developers</h2>
          <p className="text-xl mb-6 opacity-90">
            "Age is just a number. If you have an idea and the passion to build it, nothing can stop you. 
            Start coding, keep learning, and never give up on your dreams!"
          </p>
          <div className="flex items-center justify-center gap-2">
            <Rocket className="w-6 h-6" />
            <span className="text-lg font-medium">Keep Building Amazing Things!</span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of creators who choose Euda for their editing needs
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Zap className="w-5 h-5" />
            Start Creating Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About