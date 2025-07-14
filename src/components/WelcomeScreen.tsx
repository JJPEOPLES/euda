a import React from 'react'
import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'
import { 
  Code, 
  Image, 
  Video, 
  Music, 
  FileText, 
  Plus,
  Sparkles,
  Zap,
  Shield,
  Users,
  Github,
  ExternalLink,
  BookOpen,
  Lightbulb
} from 'lucide-react'

const WelcomeScreen = () => {
  const { newFile, recentFiles, openFiles, setActiveEditor } = useStore()

  const editors = [
    {
      id: 'text',
      name: 'Text Editor',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      description: 'Code, scripts, and text files',
      shortcut: 'Ctrl+1'
    },
    {
      id: 'image',
      name: 'Image Editor',
      icon: Image,
      color: 'from-purple-500 to-pink-500',
      description: 'Photos, graphics, and artwork',
      shortcut: 'Ctrl+2'
    },
    {
      id: 'video',
      name: 'Video Editor',
      icon: Video,
      color: 'from-red-500 to-orange-500',
      description: 'Movies, clips, and animations',
      shortcut: 'Ctrl+3'
    },
    {
      id: 'audio',
      name: 'Audio Editor',
      icon: Music,
      color: 'from-green-500 to-teal-500',
      description: 'Music, podcasts, and sounds',
      shortcut: 'Ctrl+4'
    },
    {
      id: 'document',
      name: 'Document Editor',
      icon: FileText,
      color: 'from-yellow-500 to-amber-500',
      description: 'Documents, articles, and notes',
      shortcut: 'Ctrl+5'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your files never leave your device'
    },
    {
      icon: Users,
      title: 'Open Source',
      description: 'Free forever, community driven'
    }
  ]

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Learn how to use Euda',
      action: () => window.open('https://docs.euda.app', '_blank')
    },
    {
      icon: Github,
      title: 'Source Code',
      description: 'View on GitHub',
      action: () => window.open('https://github.com/JJPEOPLES/euda', '_blank')
    },
    {
      icon: Lightbulb,
      title: 'Tips & Tricks',
      description: 'Get the most out of Euda',
      action: () => window.open('https://tips.euda.app', '_blank')
    }
  ]

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome to Euda
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The ultimate free editing suite. Choose an editor below to start creating amazing content.
          </p>
        </motion.div>

        {/* Editors Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Choose Your Editor
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {editors.map((editor, index) => (
              <motion.button
                key={editor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveEditor(editor.id as any)
                  newFile(editor.id as any)
                }}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 text-left"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${editor.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <editor.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {editor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {editor.description}
                </p>
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    Create New
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500 mt-2 block">
                  {editor.shortcut}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Files */}
        {(recentFiles.length > 0 || openFiles.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              {openFiles.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Open Files</h3>
                  <div className="space-y-2">
                    {openFiles.slice(0, 5).map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {file.isModified ? 'Modified' : 'Saved'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {recentFiles.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Recent Files</h3>
                  <div className="space-y-2">
                    {recentFiles.slice(0, 5).map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.split('/').pop()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {file}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Why Choose Euda?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors">
                    <action.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomeScreen