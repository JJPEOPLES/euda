import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import Sidebar from '../components/Sidebar'
import EditorToolbar from '../components/EditorToolbar'
import FileManager from '../components/FileManager'
import TextEditor from '../components/editors/TextEditor'
import ImageEditor from '../components/editors/ImageEditor'
import VideoEditor from '../components/editors/VideoEditor'
import AudioEditor from '../components/editors/AudioEditor'
import DocumentEditor from '../components/editors/DocumentEditor'
import WelcomeScreen from '../components/WelcomeScreen'
import { useHotkeys } from 'react-hotkeys-hook'
import { motion, AnimatePresence } from 'framer-motion'

const EditorApp = () => {
  const { 
    activeEditor, 
    sidebarOpen, 
    theme, 
    currentFile, 
    setTheme, 
    newFile, 
    isLoading 
  } = useStore()
  
  const [showFileManager, setShowFileManager] = useState(false)

  useEffect(() => {
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    // Auto-detect system theme on first load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [setTheme])

  // Keyboard shortcuts
  useHotkeys('ctrl+n, cmd+n', () => newFile(activeEditor))
  useHotkeys('ctrl+o, cmd+o', () => setShowFileManager(true))
  useHotkeys('ctrl+shift+p, cmd+shift+p', () => {
    // Command palette (future feature)
  })

  const renderEditor = () => {
    if (!currentFile) {
      return <WelcomeScreen />
    }

    switch (activeEditor) {
      case 'text':
        return <TextEditor />
      case 'image':
        return <ImageEditor />
      case 'video':
        return <VideoEditor />
      case 'audio':
        return <AudioEditor />
      case 'document':
        return <DocumentEditor />
      default:
        return <TextEditor />
    }
  }

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-overlay"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="loading-spinner"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <EditorToolbar />
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEditor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderEditor()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* File Manager Modal */}
      <AnimatePresence>
        {showFileManager && (
          <FileManager onClose={() => setShowFileManager(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default EditorApp