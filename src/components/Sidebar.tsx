import React from 'react'
import { useStore } from '../store/useStore'
import { 
  Code, 
  Image, 
  Video, 
  Music, 
  FileText, 
  FolderOpen,
  Clock,
  Settings,
  Sparkles,
  Plus,
  X,
  Home
} from 'lucide-react'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const { 
    activeEditor, 
    setActiveEditor, 
    recentFiles, 
    newFile, 
    openFiles, 
    currentFile,
    setCurrentFile,
    closeFile
  } = useStore()

  const editors = [
    { id: 'text', name: 'Text Editor', icon: Code, color: 'text-blue-500', shortcut: 'Ctrl+1' },
    { id: 'image', name: 'Image Editor', icon: Image, color: 'text-purple-500', shortcut: 'Ctrl+2' },
    { id: 'video', name: 'Video Editor', icon: Video, color: 'text-red-500', shortcut: 'Ctrl+3' },
    { id: 'audio', name: 'Audio Editor', icon: Music, color: 'text-green-500', shortcut: 'Ctrl+4' },
    { id: 'document', name: 'Document Editor', icon: FileText, color: 'text-yellow-500', shortcut: 'Ctrl+5' },
  ]

  return (
    <motion.div 
      className="sidebar"
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-800 dark:text-gray-200">Euda</span>
        </div>
      </div>

      {/* New File Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => newFile(activeEditor)}
          className="w-full flex items-center gap-2 p-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>New File</span>
        </button>
      </div>

      {/* Editor Selection */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
          Editors
        </h3>
        <div className="space-y-1">
          {editors.map((editor) => (
            <button
              key={editor.id}
              onClick={() => setActiveEditor(editor.id as any)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                activeEditor === editor.id
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              title={`${editor.name} (${editor.shortcut})`}
            >
              <editor.icon className={`w-5 h-5 ${editor.color}`} />
              <span className="sidebar-text flex-1 text-left">{editor.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Open Files */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          Open Files
        </h3>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {openFiles.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No open files</p>
          ) : (
            openFiles.map((file) => (
              <div
                key={file.id}
                className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer group ${
                  currentFile?.id === file.id ? 'bg-primary-100 dark:bg-primary-900' : ''
                }`}
                onClick={() => setCurrentFile(file)}
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate block">
                    {file.name}
                  </span>
                  {file.isModified && (
                    <span className="text-xs text-primary-600 dark:text-primary-400">• Modified</span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeFile(file.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Files */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Recent Files
        </h3>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {recentFiles.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent files</p>
          ) : (
            recentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
              >
                <FolderOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {file.split('/').pop() || file}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto p-4 space-y-2">
        <button 
          onClick={() => setCurrentFile(null)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="sidebar-text">Home</span>
        </button>
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="sidebar-text">Settings</span>
        </button>
      </div>
    </motion.div>
  )
}

export default Sidebar