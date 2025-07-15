import React, { useRef, useState, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'
import { 
  FileText,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Table,
  Save,
  Download,
  Upload,
  Print,
  Share,
  Copy,
  Paste,
  Undo,
  Redo,
  Search,
  Replace,
  ZoomIn,
  ZoomOut,
  Settings,
  Eye,
  EyeOff,
  Users,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Star,
  Bookmark,
  Tag,
  Folder,
  File,
  Calendar,
  Clock,
  Bell,
  Hash,
  AtSign,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Brain,
  Sparkles,
  Wand2,
  Crown,
  Zap,
  Diamond,
  Award,
  Trophy,
  Flame,
  Heart,
  Music,
  Palette,
  Layers,
  Target,
  Shield,
  Rocket,
  Globe,
  Sun,
  Moon
} from 'lucide-react'

const CleanDocumentEditor = () => {
  const { currentFile, updateFile } = useStore()
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')
  const [selectedTool, setSelectedTool] = useState('text')
  const [fontSize, setFontSize] = useState(14)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [textAlign, setTextAlign] = useState('left')
  const [aiMode, setAiMode] = useState(false)
  const [godMode, setGodMode] = useState(false)
  const [quantumMode, setQuantumMode] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const tools = [
    { id: 'text', icon: Type, name: 'Text', color: 'text-blue-500' },
    { id: 'bold', icon: Bold, name: 'Bold', color: 'text-gray-700' },
    { id: 'italic', icon: Italic, name: 'Italic', color: 'text-gray-700' },
    { id: 'underline', icon: Underline, name: 'Underline', color: 'text-gray-700' },
    { id: 'strikethrough', icon: Strikethrough, name: 'Strikethrough', color: 'text-gray-700' },
    { id: 'quote', icon: Quote, name: 'Quote', color: 'text-purple-500' },
    { id: 'code', icon: Code, name: 'Code', color: 'text-green-500' },
    { id: 'link', icon: Link, name: 'Link', color: 'text-blue-500' },
    { id: 'image', icon: Image, name: 'Image', color: 'text-pink-500' },
    { id: 'table', icon: Table, name: 'Table', color: 'text-orange-500' }
  ]

  const alignmentTools = [
    { id: 'left', icon: AlignLeft, name: 'Align Left' },
    { id: 'center', icon: AlignCenter, name: 'Align Center' },
    { id: 'right', icon: AlignRight, name: 'Align Right' },
    { id: 'justify', icon: AlignJustify, name: 'Justify' }
  ]

  const listTools = [
    { id: 'bullet', icon: List, name: 'Bullet List' },
    { id: 'numbered', icon: ListOrdered, name: 'Numbered List' }
  ]

  useEffect(() => {
    if (currentFile?.content) {
      setContent(currentFile.content)
    }
  }, [currentFile])

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
    setCharCount(content.length)
  }, [content])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    if (currentFile) {
      updateFile(currentFile.id, { content: newContent })
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setContent(text)
        if (currentFile) {
          updateFile(currentFile.id, { content: text })
        }
      }
      reader.readAsText(file)
    }
  }

  const applyFormat = (format: string) => {
    console.log(`Applying format: ${format}`)
    // In a real implementation, this would apply text formatting
  }

  const insertElement = (element: string) => {
    console.log(`Inserting element: ${element}`)
    // In a real implementation, this would insert elements like tables, images, etc.
  }

  const exportDocument = () => {
    console.log('Exporting document...')
    // In a real implementation, this would handle document export
  }

  const saveDocument = () => {
    console.log('Saving document...')
    // In a real implementation, this would save the document
  }

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <FileText className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">GT4 Document Pro</h2>
          <p className="text-xl text-gray-300">Create or upload a document to begin</p>
          <div className="flex items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
            >
              <Upload className="w-6 h-6 inline mr-3" />
              Upload Document
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setContent('')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
            >
              <FileText className="w-6 h-6 inline mr-3" />
              New Document
            </motion.button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`clean-document-editor flex flex-col h-full bg-gradient-to-br from-gray-900 to-black text-white ${
      godMode ? 'god-mode' : ''
    } ${
      quantumMode ? 'quantum-mode' : ''
    }`}>
      
      {/* 🔥 LEGENDARY HEADER */}
      <div className="header bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <FileText className="w-6 h-6" />
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold">GT4 DOCUMENT PRO</h1>
              <p className="text-sm text-gray-300">Professional Document Editor</p>
            </div>
            
            <div className="flex items-center gap-4 bg-black/30 rounded-lg px-3 py-1">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{wordCount} words</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{charCount} chars</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGodMode(!godMode)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                godMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
            >
              <Crown className="w-5 h-5 inline mr-2" />
              {godMode ? 'GOD MODE ON' : 'GOD MODE'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuantumMode(!quantumMode)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                quantumMode 
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
            >
              <Zap className="w-5 h-5 inline mr-2" />
              {quantumMode ? 'QUANTUM ON' : 'QUANTUM'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAiMode(!aiMode)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                aiMode 
                  ? 'bg-gradient-to-r from-pink-400 to-violet-400 text-black' 
                  : 'bg-gradient-to-r from-pink-500 to-violet-500'
              }`}
            >
              <Brain className="w-5 h-5 inline mr-2" />
              {aiMode ? 'AI ON' : 'AI ASSISTANT'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveDocument}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Save className="w-5 h-5 inline mr-2" />
              Save
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportDocument}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Download className="w-5 h-5 inline mr-2" />
              Export
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🛠️ FORMATTING TOOLBAR */}
      <div className="toolbar bg-gradient-to-r from-gray-900 to-black p-4 border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">FORMAT:</span>
              {tools.map(tool => (
                <motion.button
                  key={tool.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => applyFormat(tool.id)}
                  className={`p-2 rounded-lg transition-all ${
                    selectedTool === tool.id 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  title={tool.name}
                >
                  <tool.icon className={`w-4 h-4 ${tool.color}`} />
                </motion.button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">ALIGN:</span>
              {alignmentTools.map(tool => (
                <motion.button
                  key={tool.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTextAlign(tool.id)}
                  className={`p-2 rounded-lg transition-all ${
                    textAlign === tool.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  title={tool.name}
                >
                  <tool.icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">LISTS:</span>
              {listTools.map(tool => (
                <motion.button
                  key={tool.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => applyFormat(tool.id)}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
                  title={tool.name}
                >
                  <tool.icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">Font:</span>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
              >
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Size:</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload
            </motion.button>
          </div>
        </div>
      </div>

      {/* 📝 DOCUMENT EDITOR */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto h-full">
            <div className="w-full h-full bg-white rounded-lg shadow-2xl relative overflow-hidden">
              <textarea
                ref={editorRef}
                value={content}
                onChange={handleContentChange}
                placeholder="Start typing your document here..."
                className="w-full h-full p-8 text-gray-900 bg-transparent resize-none outline-none"
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: fontFamily,
                  textAlign: textAlign as any,
                  lineHeight: '1.6'
                }}
              />
              
              {/* GOD MODE AURA */}
              {godMode && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 animate-pulse pointer-events-none" />
              )}
              
              {/* QUANTUM PARTICLES */}
              {quantumMode && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full"
                      animate={{
                        x: [0, Math.random() * 600],
                        y: [0, Math.random() * 400],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📊 STATUS BAR */}
      <div className="status-bar bg-gradient-to-r from-black via-blue-900 to-black text-white p-3 border-t border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">DOCUMENT</span>
            </div>
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-green-400" />
              <span className="text-sm">{wordCount} words</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{charCount} characters</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm">Auto-saved</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
              <span className="text-sm font-bold">DOCUMENT PRO</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">AI READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default CleanDocumentEditor