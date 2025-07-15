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

const CleanTextEditor = () => {
  const { currentFile, updateFile } = useStore()
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')
  const [selectedTool, setSelectedTool] = useState('text')
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState('Monaco')
  const [theme, setTheme] = useState('dark')
  const [aiMode, setAiMode] = useState(false)
  const [godMode, setGodMode] = useState(false)
  const [quantumMode, setQuantumMode] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [lineCount, setLineCount] = useState(1)
  const [charCount, setCharCount] = useState(0)

  const tools = [
    { id: 'text', icon: Type, name: 'Text', color: 'text-blue-500' },
    { id: 'bold', icon: Bold, name: 'Bold', color: 'text-gray-700' },
    { id: 'italic', icon: Italic, name: 'Italic', color: 'text-gray-700' },
    { id: 'underline', icon: Underline, name: 'Underline', color: 'text-gray-700' },
    { id: 'code', icon: Code, name: 'Code', color: 'text-green-500' },
    { id: 'link', icon: Link, name: 'Link', color: 'text-blue-500' },
    { id: 'quote', icon: Quote, name: 'Quote', color: 'text-purple-500' },
    { id: 'list', icon: List, name: 'List', color: 'text-orange-500' },
    { id: 'search', icon: Search, name: 'Search', color: 'text-yellow-500' },
    { id: 'replace', icon: Replace, name: 'Replace', color: 'text-red-500' }
  ]

  const themes = [
    { id: 'dark', name: 'Dark', bg: 'bg-gray-900', text: 'text-white' },
    { id: 'light', name: 'Light', bg: 'bg-white', text: 'text-gray-900' },
    { id: 'monokai', name: 'Monokai', bg: 'bg-gray-800', text: 'text-green-400' },
    { id: 'dracula', name: 'Dracula', bg: 'bg-purple-900', text: 'text-purple-100' }
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
    setLineCount(content.split('\n').length)
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

  const insertText = (text: string) => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart
      const end = editorRef.current.selectionEnd
      const newContent = content.substring(0, start) + text + content.substring(end)
      setContent(newContent)
      if (currentFile) {
        updateFile(currentFile.id, { content: newContent })
      }
    }
  }

  const applyFormat = (format: string) => {
    switch (format) {
      case 'bold':
        insertText('**bold text**')
        break
      case 'italic':
        insertText('*italic text*')
        break
      case 'code':
        insertText('`code`')
        break
      case 'quote':
        insertText('> Quote')
        break
      case 'link':
        insertText('[link text](url)')
        break
      case 'list':
        insertText('- List item')
        break
      default:
        console.log(`Format: ${format}`)
    }
  }

  const exportDocument = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentFile?.name || 'document'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const saveDocument = () => {
    console.log('Saving document...')
    // In a real implementation, this would save the document
  }

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
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
          <h2 className="text-4xl font-bold text-white mb-4">GT4 Text Pro</h2>
          <p className="text-xl text-gray-300">Create or upload a text file to begin</p>
          <div className="flex items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
            >
              <Upload className="w-6 h-6 inline mr-3" />
              Upload File
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setContent('')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
            >
              <FileText className="w-6 h-6 inline mr-3" />
              New File
            </motion.button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.js,.ts,.jsx,.tsx,.css,.html,.json,.xml,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.dart,.scala,.sh,.yaml,.yml,.toml,.ini,.cfg,.conf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    )
  }

  const currentTheme = themes.find(t => t.id === theme) || themes[0]

  return (
    <div className={`clean-text-editor flex flex-col h-full bg-gradient-to-br from-gray-900 to-black text-white ${
      godMode ? 'god-mode' : ''
    } ${
      quantumMode ? 'quantum-mode' : ''
    }`}>
      
      {/* 🔥 LEGENDARY HEADER */}
      <div className="header bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Type className="w-6 h-6" />
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold">GT4 TEXT PRO</h1>
              <p className="text-sm text-gray-300">Advanced Text Editor</p>
            </div>
            
            <div className="flex items-center gap-4 bg-black/30 rounded-lg px-3 py-1">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{lineCount} lines</span>
              </div>
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{wordCount} words</span>
              </div>
              <div className="flex items-center gap-2">
                <AtSign className="w-4 h-4 text-gray-400" />
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
              <span className="text-purple-400 font-bold">TOOLS:</span>
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
              <span className="text-purple-400 font-bold">THEME:</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
              >
                {themes.map(theme => (
                  <option key={theme.id} value={theme.id}>{theme.name}</option>
                ))}
              </select>
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
                <option value="Monaco">Monaco</option>
                <option value="Consolas">Consolas</option>
                <option value="Courier New">Courier New</option>
                <option value="Fira Code">Fira Code</option>
                <option value="Source Code Pro">Source Code Pro</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Size:</span>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-16 accent-purple-500"
              />
              <span className="text-sm w-8">{fontSize}</span>
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

      {/* 📝 TEXT EDITOR */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-6xl mx-auto h-full">
            <div className={`w-full h-full ${currentTheme.bg} rounded-lg shadow-2xl relative overflow-hidden`}>
              <textarea
                ref={editorRef}
                value={content}
                onChange={handleContentChange}
                placeholder="Start typing your code or text here..."
                className={`w-full h-full p-8 ${currentTheme.text} bg-transparent resize-none outline-none font-mono`}
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: fontFamily,
                  lineHeight: '1.6',
                  tabSize: 2
                }}
                spellCheck={false}
              />
              
              {/* Line numbers overlay */}
              <div className="absolute top-0 left-0 p-8 pointer-events-none">
                <div className="text-gray-500 text-sm font-mono" style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}>
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i} className="text-right w-8">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              
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
                        x: [0, Math.random() * 800],
                        y: [0, Math.random() * 600],
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
              <span className="text-sm font-medium">TEXT</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-green-400" />
              <span className="text-sm">{lineCount} lines</span>
            </div>
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{wordCount} words</span>
            </div>
            <div className="flex items-center gap-2">
              <AtSign className="w-4 h-4 text-purple-400" />
              <span className="text-sm">{charCount} chars</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
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
              <span className="text-sm font-bold">TEXT PRO</span>
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
        accept=".txt,.md,.js,.ts,.jsx,.tsx,.css,.html,.json,.xml,.py,.java,.cpp,.c,.php,.rb,.go,.rs,.swift,.kt,.dart,.scala,.sh,.yaml,.yml,.toml,.ini,.cfg,.conf"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default CleanTextEditor