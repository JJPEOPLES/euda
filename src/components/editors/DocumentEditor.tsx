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
  MoreHorizontal,
  MoreVertical,
  Sparkles,
  Zap,
  Wand2,
  Brain,
  Lightbulb,
  Target,
  Focus,
  Maximize,
  Minimize,
  Palette,
  Highlighter,
  Paintbrush,
  Eraser,
  Scissors,
  Layers,
  Grid,
  Ruler,
  Compass,
  Triangle,
  Square,
  Circle,
  Heart,
  Sun,
  Moon,
  Cloud,
  Feather,
  Leaf,
  Flower,
  Mountain,
  Wave,
  Activity,
  BarChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Globe,
  Map,
  Navigation,
  Wifi,
  Bluetooth,
  Database,
  Server,
  HardDrive,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Monitor,
  Keyboard,
  Mouse,
  Printer,
  Camera,
  Video,
  Music,
  Headphones,
  Mic,
  Speaker,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  FastForward,
  Rewind,
  Record,
  Edit,
  Edit2,
  Edit3,
  PenTool,
  Brush,
  Crop,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Move,
  Resize,
  Expand,
  Shrink,
  Maximize2,
  Minimize2,
  CornerUpLeft,
  CornerUpRight,
  CornerDownLeft,
  CornerDownRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownRight,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Sort,
  SortAsc,
  SortDesc,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Columns,
  Rows,
  Grid3x3,
  LayoutGrid,
  LayoutList,
  ViewVertical,
  ViewHorizontal,
  Wrap,
  Unwrap,
  Indent,
  Outdent,
  Space,
  Spacing,
  LineHeight,
  LetterSpacing,
  Baseline,
  Superscript,
  Subscript,
  CaseSensitive,
  CaseUpper,
  CaseLower,
  RemoveFormatting,
  FormatPainter,
  Dropper,
  Eyedropper,
  ColorPicker,
  Swatch,
  Gradient,
  Pattern,
  Texture,
  Material,
  Transparency,
  Opacity,
  Blur,
  Sharpen,
  Contrast,
  Brightness,
  Saturation,
  Hue,
  Sepia,
  Grayscale,
  Invert,
  Shadow,
  Glow,
  Outline,
  Stroke,
  Fill,
  Background,
  Foreground,
  Layer,
  Mask,
  Clip,
  Path,
  Bezier,
  Pen,
  Pencil,
  Marker,
  Highlighter2,
  Crayon,
  Spray,
  Bucket,
  Gradient2,
  Radial,
  Linear,
  Conic,
  Mesh,
  Noise,
  Distort,
  Warp,
  Twist,
  Bend,
  Skew,
  Perspective,
  Transform,
  Matrix,
  Vector,
  Scalar,
  Magnitude,
  Direction,
  Angle,
  Rotation,
  Scale,
  Translation,
  Reflection,
  Projection,
  Intersection,
  Union,
  Difference,
  Exclusion,
  Overlap,
  Merge,
  Split,
  Divide,
  Multiply,
  Add,
  Subtract,
  Modulo,
  Power,
  Root,
  Logarithm,
  Exponential,
  Trigonometry,
  Sine,
  Cosine,
  Tangent,
  Pi,
  Infinity,
  Sigma,
  Delta,
  Alpha,
  Beta,
  Gamma,
  Theta,
  Lambda,
  Mu,
  Omega,
  Phi,
  Psi,
  Chi,
  Rho,
  Tau,
  Eta,
  Epsilon,
  Zeta,
  Iota,
  Kappa,
  Nu,
  Xi,
  Omicron,
  Upsilon,
  Decimal,
  Fraction,
  Percent,
  Permille,
  Degree,
  Celsius,
  Fahrenheit,
  Kelvin,
  Meter,
  Kilometer,
  Centimeter,
  Millimeter,
  Inch,
  Foot,
  Yard,
  Mile,
  Gram,
  Kilogram,
  Pound,
  Ounce,
  Liter,
  Gallon,
  Quart,
  Pint,
  Cup,
  Tablespoon,
  Teaspoon,
  Second,
  Minute,
  Hour,
  Day,
  Week,
  Month,
  Year,
  Decade,
  Century,
  Millennium
} from 'lucide-react'

const DocumentEditor = () => {
  const { currentFile, updateFile } = useStore()
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedText, setSelectedText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [isFormatting, setIsFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
  })
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState('Inter')
  const [textColor, setTextColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [alignment, setAlignment] = useState('left')
  const [showToolbar, setShowToolbar] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [documentStats, setDocumentStats] = useState({
    words: 0,
    characters: 0,
    paragraphs: 0,
    pages: 0,
    readingTime: 0
  })

  useEffect(() => {
    if (currentFile?.content) {
      const content = currentFile.content
      const words = content.split(/\s+/).filter(word => word.length > 0).length
      const characters = content.length
      const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0).length
      const pages = Math.ceil(words / 250) // Assuming 250 words per page
      const readingTime = Math.ceil(words / 200) // Assuming 200 words per minute
      
      setDocumentStats({
        words,
        characters,
        paragraphs,
        pages,
        readingTime
      })
    }
  }, [currentFile?.content])

  const handleTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText
    updateFile(currentFile.id, { content })
  }

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    
    // Update formatting state
    setIsFormatting(prev => ({
      ...prev,
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikeThrough')
    }))
  }

  const insertElement = (type: string) => {
    const editor = editorRef.current
    if (!editor) return

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    let element: HTMLElement

    switch (type) {
      case 'table':
        element = document.createElement('table')
        element.innerHTML = `
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Cell 1</td>
            <td style="border: 1px solid #ccc; padding: 8px;">Cell 2</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">Cell 3</td>
            <td style="border: 1px solid #ccc; padding: 8px;">Cell 4</td>
          </tr>
        `
        element.style.borderCollapse = 'collapse'
        element.style.width = '100%'
        element.style.margin = '16px 0'
        break
      case 'image':
        element = document.createElement('img')
        element.src = 'https://via.placeholder.com/300x200'
        element.style.maxWidth = '100%'
        element.style.height = 'auto'
        element.style.margin = '16px 0'
        break
      case 'link':
        const url = prompt('Enter URL:')
        if (url) {
          element = document.createElement('a')
          element.href = url
          element.textContent = selectedText || 'Link'
          element.style.color = '#3b82f6'
          element.style.textDecoration = 'underline'
        } else {
          return
        }
        break
      default:
        return
    }

    range.deleteContents()
    range.insertNode(element)
    selection.removeAllRanges()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          applyFormatting('bold')
          break
        case 'i':
          e.preventDefault()
          applyFormatting('italic')
          break
        case 'u':
          e.preventDefault()
          applyFormatting('underline')
          break
        case 's':
          e.preventDefault()
          // Save document
          console.log('Document saved')
          break
      }
    }
  }

  const exportDocument = (format: string) => {
    console.log('Exporting document as:', format)
    // In a real implementation, this would export the document
  }

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No document selected</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* GT4 Pro Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">GT4 Docs Pro</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-1">
            <Hash className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {documentStats.words} words
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            <Brain className="w-4 h-4" />
            AI Assistant
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            <MessageCircle className="w-4 h-4" />
            Comments
          </motion.button>
        </div>
      </div>

      {/* Formatting Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <select 
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
              
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
                min="8"
                max="72"
              />
            </div>
            
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyFormatting('bold')}
                className={`p-2 rounded-lg transition-colors ${
                  isFormatting.bold 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Bold className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyFormatting('italic')}
                className={`p-2 rounded-lg transition-colors ${
                  isFormatting.italic 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Italic className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyFormatting('underline')}
                className={`p-2 rounded-lg transition-colors ${
                  isFormatting.underline 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Underline className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyFormatting('strikeThrough')}
                className={`p-2 rounded-lg transition-colors ${
                  isFormatting.strikethrough 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Strikethrough className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAlignment('left')
                  applyFormatting('justifyLeft')
                }}
                className={`p-2 rounded-lg transition-colors ${
                  alignment === 'left' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <AlignLeft className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAlignment('center')
                  applyFormatting('justifyCenter')
                }}
                className={`p-2 rounded-lg transition-colors ${
                  alignment === 'center' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <AlignCenter className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAlignment('right')
                  applyFormatting('justifyRight')
                }}
                className={`p-2 rounded-lg transition-colors ${
                  alignment === 'right' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <AlignRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAlignment('justify')
                  applyFormatting('justifyFull')
                }}
                className={`p-2 rounded-lg transition-colors ${
                  alignment === 'justify' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <AlignJustify className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => insertElement('link')}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Link className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => insertElement('image')}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Image className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => insertElement('table')}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Table className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </motion.button>
              
              <span className="min-w-[50px] text-center text-sm">{zoomLevel}%</span>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => exportDocument('pdf')}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </div>
      )}

      {/* Document Editor */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8" style={{ zoom: `${zoomLevel}%` }}>
          <div
            ref={editorRef}
            className="min-h-screen bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={handleTextChange}
            onKeyDown={handleKeyDown}
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: '1.6',
              color: textColor,
              backgroundColor: backgroundColor
            }}
          >
            {currentFile.content || 'Start typing your document...'}
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>{documentStats.words} words</span>
          <span>{documentStats.characters} characters</span>
          <span>{documentStats.paragraphs} paragraphs</span>
          <span>{documentStats.pages} pages</span>
          <span>{documentStats.readingTime} min read</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Last saved: Just now</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>GT4 Pro Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentEditor
import { motion } from 'framer-motion'
import { 
  FileText,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Table,
  Download,
  Upload,
  Printer,
  Save,
  Type,
  Palette,
  Columns,
  Eye,
  Plus
} from 'lucide-react'

const DocumentEditor = () => {
  const { currentFile, updateFileContent } = useStore()
  const quillRef = useRef<ReactQuill>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
    'code-block'
  ]

  const handleChange = (content: string) => {
    updateFileContent(content)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        updateFileContent(content)
      }
      reader.readAsText(file)
    }
  }

  const exportToPDF = () => {
    if (currentFile?.content) {
      // Create a new window with the document content
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Document</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            ${currentFile.content}
          </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const exportToHTML = () => {
    if (currentFile?.content) {
      const blob = new Blob([currentFile.content], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'document.html'
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const insertTemplate = (template: string) => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      const range = quill.getSelection()
      if (range) {
        quill.insertText(range.index, template)
      }
    }
  }

  const templates = [
    { name: 'Letter', content: 'Dear [Name],\n\n[Your message here]\n\nSincerely,\n[Your name]' },
    { name: 'Report', content: '# Report Title\n\n## Executive Summary\n\n[Summary content]\n\n## Introduction\n\n[Introduction content]\n\n## Conclusion\n\n[Conclusion content]' },
    { name: 'Meeting Notes', content: '# Meeting Notes\n\n**Date:** [Date]\n**Attendees:** [Names]\n\n## Agenda\n\n1. [Item 1]\n2. [Item 2]\n\n## Action Items\n\n- [ ] [Action item 1]\n- [ ] [Action item 2]' },
    { name: 'Essay', content: '# Essay Title\n\n## Introduction\n\n[Introduction paragraph]\n\n## Body\n\n[Body paragraphs]\n\n## Conclusion\n\n[Conclusion paragraph]' }
  ]

  const quickActions = [
    { name: 'Bold', icon: Bold, action: () => quillRef.current?.getEditor().format('bold', true) },
    { name: 'Italic', icon: Italic, action: () => quillRef.current?.getEditor().format('italic', true) },
    { name: 'Underline', icon: Underline, action: () => quillRef.current?.getEditor().format('underline', true) },
    { name: 'Quote', icon: Quote, action: () => quillRef.current?.getEditor().format('blockquote', true) },
    { name: 'List', icon: List, action: () => quillRef.current?.getEditor().format('list', 'bullet') },
    { name: 'Numbered', icon: ListOrdered, action: () => quillRef.current?.getEditor().format('list', 'ordered') }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-gray-100 dark:bg-gray-900"
    >
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Quick Actions */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={action.action}
                  className="px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title={action.name}
                >
                  <action.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Templates */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Templates:</span>
              <select 
                onChange={(e) => {
                  const template = templates.find(t => t.name === e.target.value)
                  if (template) {
                    updateFileContent(template.content)
                  }
                }}
                className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value="">Select template...</option>
                {templates.map((template) => (
                  <option key={template.name} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.html,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={exportToHTML}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print/PDF
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
          <div className="document-editor h-full">
            {currentFile ? (
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={currentFile.content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: 'calc(100% - 42px)' }}
                placeholder="Start writing your document..."
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No document selected</p>
                  <button
                    onClick={() => updateFileContent('<h1>New Document</h1><p>Start writing here...</p>')}
                    className="button-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile ? `${currentFile.content.length} characters` : 'No document'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile ? `${currentFile.content.split(' ').filter(word => word.length > 0).length} words` : '0 words'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile ? `${currentFile.content.split('\n').length} lines` : '0 lines'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile?.isModified ? 'Modified' : 'Saved'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Rich Text Format
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DocumentEditor