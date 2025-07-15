import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload, FolderOpen, FileText, Image, Video, Music, File } from 'lucide-react'
import { useStore, EditorType } from '../store/useStore'

interface FileManagerProps {
  onClose: () => void
}

const FileManager: React.FC<FileManagerProps> = ({ onClose }) => {
  const { openFile, setActiveEditor } = useStore()
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const content = e.target?.result as string
      const fileType = getFileType(file.name)
      
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        content: content,
        isModified: false,
        type: fileType as EditorType,
        size: file.size,
        lastModified: new Date(file.lastModified),
      }
      
      setActiveEditor(fileType)
      openFile(newFile)
      onClose()
    }
    
    if (file.type.startsWith('text/') || file.name.match(/\.(txt|js|ts|jsx|tsx|html|css|json|md|py|java|cpp|c|php|rb|go|rs|swift|kt|scala|sh|yml|yaml|xml|csv)$/)) {
      reader.readAsText(file)
    } else {
      // For binary files, we'll handle them differently in the future
      reader.readAsDataURL(file)
    }
  }

  const getFileType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) {
      return 'image'
    } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext || '')) {
      return 'video'
    } else if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext || '')) {
      return 'audio'
    } else if (['pdf', 'doc', 'docx', 'rtf'].includes(ext || '')) {
      return 'document'
    } else {
      return 'text'
    }
  }

  const getFileIcon = (filename: string) => {
    const type = getFileType(filename)
    
    switch (type) {
      case 'image': return <Image className="w-5 h-5 text-purple-500" />
      case 'video': return <Video className="w-5 h-5 text-red-500" />
      case 'audio': return <Music className="w-5 h-5 text-green-500" />
      case 'document': return <FileText className="w-5 h-5 text-yellow-500" />
      default: return <File className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Open File
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div
            className={`upload-area ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Upload File
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFile(e.target.files[0])
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                  accept=".txt,.js,.ts,.jsx,.tsx,.html,.css,.json,.md,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.scala,.sh,.yml,.yaml,.xml,.csv,.jpg,.jpeg,.png,.gif,.svg,.webp,.mp4,.avi,.mov,.wmv,.flv,.webm,.mp3,.wav,.flac,.aac,.ogg,.pdf,.doc,.docx,.rtf"
                />
                <label
                  htmlFor="file-upload"
                  className="button-primary cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Browse Files
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Supported File Types
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Text, Code Files
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Images (JPG, PNG, SVG)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Videos (MP4, AVI, MOV)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Audio (MP3, WAV, FLAC)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FileManager