import React from 'react'
import { useStore } from '../store/useStore'
import { 
  Menu, 
  Save, 
  FolderOpen, 
  Undo, 
  Redo, 
  Sun, 
  Moon,
  Download,
  Upload,
  Share,
  Settings,
  Plus,
  Copy,
  ClipboardPaste,
  Search,
  MoreHorizontal
} from 'lucide-react'
import { saveAs } from 'file-saver'

const EditorToolbar = () => {
  const { 
    toggleSidebar, 
    theme, 
    setTheme, 
    currentFile, 
    activeEditor,
    newFile,
    saveFile,
    updateFileContent
  } = useStore()

  const handleSave = () => {
    if (currentFile) {
      // Save to browser's downloads folder
      const blob = new Blob([currentFile.content], { type: 'text/plain' })
      saveAs(blob, currentFile.name)
      
      // Mark as saved in store
      saveFile(currentFile.id, currentFile.content)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        updateFileContent(content)
      }
      reader.readAsText(file)
    }
  }

  const getEditorTitle = () => {
    switch (activeEditor) {
      case 'text': return 'Text Editor'
      case 'image': return 'Image Editor'
      case 'video': return 'Video Editor'
      case 'audio': return 'Audio Editor'
      case 'document': return 'Document Editor'
      default: return 'Editor'
    }
  }

  const getEditorIcon = () => {
    switch (activeEditor) {
      case 'text': return '📝'
      case 'image': return '🖼️'
      case 'video': return '🎬'
      case 'audio': return '🎵'
      case 'document': return '📄'
      default: return '📝'
    }
  }

  return (
    <div className="toolbar">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 hidden-mobile"></div>
        
        <button
          onClick={() => newFile(activeEditor)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="New File (Ctrl+N)"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden-mobile">New</span>
        </button>
        
        <div className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept=".txt,.js,.ts,.jsx,.tsx,.html,.css,.json,.md,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.scala,.sh,.yml,.yaml,.xml,.csv"
          />
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FolderOpen className="w-4 h-4" />
            <span className="hidden-mobile">Open</span>
          </button>
        </div>
        
        <button
          onClick={handleSave}
          disabled={!currentFile}
          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Save File (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
          <span className="hidden-mobile">Save</span>
        </button>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => {/* Handle undo */}}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {/* Handle redo */}}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-5 h-5" />
          </button>
          
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label="editor-icon">
            {getEditorIcon()}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getEditorTitle()}
          </span>
          
          {currentFile && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentFile.name}
              </span>
              {currentFile.isModified && (
                <span className="text-xs text-primary-600 dark:text-primary-400">
                  • Modified
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => {/* Handle search */}}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Search (Ctrl+F)"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {/* Handle share */}}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Share"
          >
            <Share className="w-4 h-4" />
            <span className="hidden-mobile">Share</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
        </div>
        
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        
        <button
          onClick={() => {/* Handle settings */}}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="md:hidden">
          <button
            onClick={() => {/* Handle mobile menu */}}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditorToolbar