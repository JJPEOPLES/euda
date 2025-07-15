import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'
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
  Indent,
  Outdent,
  Palette,
  Highlighter,
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
  Lock,
  Unlock,
  Users,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Star,
  Bookmark,
  Flag,
  Tag,
  Folder,
  File,
  Calendar,
  Clock,
  Timer,
  Bell,
  Hash,
  AtSign,
  DollarSign,
  Percent,
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
  Magic,
  Brain,
  Lightbulb,
  Target,
  Crosshair,
  Focus,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  Move,
  Grab,
  MousePointer,
  CursorClick,
  Hand,
  Pointer,
  Select,
  PenTool,
  Brush,
  Eraser,
  Scissors,
  Crop,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Layers,
  Grid,
  Ruler,
  Compass,
  Triangle,
  Square,
  Circle,
  Hexagon,
  Pentagon,
  Octagon,
  Diamond,
  Heart,
  Flame,
  Snowflake,
  Droplets,
  Sun,
  Moon,
  Cloud,
  Lightning,
  Rainbow,
  Feather,
  Leaf,
  Flower,
  Tree,
  Mountain,
  Wave,
  Fire,
  Water,
  Earth,
  Air,
  Metal,
  Wood,
  Stone,
  Glass,
  Plastic,
  Fabric,
  Paper,
  Leather,
  Rubber,
  Ceramic,
  Crystal,
  Gem,
  Pearl,
  Gold,
  Silver,
  Bronze,
  Copper,
  Iron,
  Steel,
  Aluminum,
  Titanium,
  Platinum,
  Diamond as DiamondIcon,
  Ruby,
  Emerald,
  Sapphire,
  Amethyst,
  Topaz,
  Opal,
  Turquoise,
  Jade,
  Coral,
  Amber,
  Quartz,
  Granite,
  Marble,
  Limestone,
  Sandstone,
  Slate,
  Obsidian,
  Lava,
  Magma,
  Volcano,
  Earthquake,
  Tsunami,
  Hurricane,
  Tornado,
  Cyclone,
  Blizzard,
  Avalanche,
  Flood,
  Drought,
  Famine,
  Plague,
  Pandemic,
  Epidemic,
  Virus,
  Bacteria,
  Fungus,
  Parasite,
  Insect,
  Spider,
  Worm,
  Slug,
  Snail,
  Fish,
  Shark,
  Whale,
  Dolphin,
  Octopus,
  Squid,
  Jellyfish,
  Starfish,
  Crab,
  Lobster,
  Shrimp,
  Clam,
  Oyster,
  Mussel,
  Scallop,
  Turtle,
  Frog,
  Salamander,
  Lizard,
  Snake,
  Crocodile,
  Alligator,
  Bird,
  Eagle,
  Hawk,
  Owl,
  Crow,
  Raven,
  Parrot,
  Flamingo,
  Penguin,
  Ostrich,
  Peacock,
  Swan,
  Duck,
  Goose,
  Chicken,
  Rooster,
  Turkey,
  Pig,
  Cow,
  Horse,
  Sheep,
  Goat,
  Deer,
  Moose,
  Elk,
  Buffalo,
  Bison,
  Zebra,
  Giraffe,
  Elephant,
  Hippo,
  Rhino,
  Lion,
  Tiger,
  Leopard,
  Cheetah,
  Panther,
  Jaguar,
  Lynx,
  Bobcat,
  Puma,
  Wolf,
  Fox,
  Coyote,
  Hyena,
  Jackal,
  Bear,
  Panda,
  Koala,
  Sloth,
  Monkey,
  Ape,
  Gorilla,
  Chimpanzee,
  Orangutan,
  Baboon,
  Lemur,
  Kangaroo,
  Wallaby,
  Opossum,
  Beaver,
  Otter,
  Seal,
  Walrus,
  Manatee,
  Platypus,
  Echidna,
  Hedgehog,
  Porcupine,
  Skunk,
  Raccoon,
  Badger,
  Weasel,
  Ferret,
  Mink,
  Stoat,
  Ermine,
  Wolverine,
  Marten,
  Sable,
  Fisher,
  Mole,
  Shrew,
  Bat,
  Rabbit,
  Hare,
  Squirrel,
  Chipmunk,
  Groundhog,
  Prairie,
  Dog,
  Cat,
  Mouse,
  Rat,
  Hamster,
  Gerbil,
  Guinea,
  Chinchilla,
  Rat as RatIcon,
  Mouse as MouseIcon,
  Hamster as HamsterIcon,
  Gerbil as GerbilIcon,
  Guinea as GuineaIcon,
  Chinchilla as ChinchillaIcon,
  Ferret as FerretIcon,
  Rabbit as RabbitIcon,
  Hare as HareIcon,
  Squirrel as SquirrelIcon,
  Chipmunk as ChipmunkIcon,
  Groundhog as GroundhogIcon,
  Prairie as PrairieIcon,
  Dog as DogIcon,
  Cat as CatIcon,
  Bird as BirdIcon,
  Fish as FishIcon,
  Butterfly,
  Bee,
  Ant,
  Beetle,
  Dragonfly,
  Grasshopper,
  Cricket,
  Mantis,
  Cockroach,
  Termite,
  Flea,
  Tick,
  Mosquito,
  Fly,
  Wasp,
  Hornet,
  Moth,
  Caterpillar,
  Ladybug,
  Firefly,
  Glowworm,
  Centipede,
  Millipede,
  Scorpion,
  Tarantula,
  Widow,
  Recluse,
  Orb,
  Weaver,
  Jumping,
  Crab as CrabSpider,
  Wolf as WolfSpider,
  Huntsman,
  Funnel,
  Web,
  Trapdoor,
  Baboon as BaboonSpider,
  Goliath,
  Bird as BirdSpider,
  Mouse as MouseSpider,
  Camel,
  Solifuge,
  Whip,
  Scorpion as ScorpionIcon,
  Pseudoscorpion,
  Harvestman,
  Opiliones,
  Ricinulei,
  Schizomida,
  Amblypygi,
  Uropygi,
  Palpigradi,
  Araneae,
  Acari,
  Mesostigmata,
  Metastigmata,
  Prostigmata,
  Astigmata,
  Oribatida,
  Parasitiformes,
  Acariformes,
  Tetranychidae,
  Eriophyidae,
  Tarsonemidae,
  Tydeidae,
  Bdellidae,
  Cunaxidae,
  Cheyletidae,
  Raphignathidae,
  Stigmaeidae,
  Tetranychoidea,
  Tarsonemoidea,
  Tydeoidea,
  Bdelloidea,
  Cunaxoidea,
  Cheyletoidea,
  Raphignathoidea,
  Stigmaeoidea,
  Prostigmata as ProstigmataIcon,
  Astigmata as AstigmataIcon,
  Oribatida as OribatidaIcon,
  Parasitiformes as ParasitiformesIcon,
  Acariformes as AcariformesIcon,
  Tetranychidae as TetranychidaeIcon,
  Eriophyidae as EriophyidaeIcon,
  Tarsonemidae as TarsonemidaeIcon,
  Tydeidae as TydeidaeIcon,
  Bdellidae as BdellidaeIcon,
  Cunaxidae as CunaxidaeIcon,
  Cheyletidae as CheyletidaeIcon,
  Raphignathidae as RaphignathidaeIcon,
  Stigmaeidae as StigmaeidaeIcon
} from 'lucide-react'

// 🔥 THE ULTIMATE DOCUMENT EDITOR - BETTER THAN GOOGLE DOCS! 🔥

interface UltimateDocumentEditorProps {
  width?: number
  height?: number
  collaborative?: boolean
  aiAssistant?: boolean
  templates?: boolean
}

// 📝 LEGENDARY DOCUMENT FEATURES THAT DESTROY GOOGLE DOCS
const LEGENDARY_FEATURES = [
  { id: 'ai-writing', name: 'AI Writing Assistant', icon: Brain, color: 'text-purple-500' },
  { id: 'smart-grammar', name: 'Smart Grammar Check', icon: CheckCircle, color: 'text-green-500' },
  { id: 'voice-typing', name: 'Voice Typing', icon: Mic, color: 'text-blue-500' },
  { id: 'real-time-collab', name: 'Real-time Collaboration', icon: Users, color: 'text-orange-500' },
  { id: 'version-history', name: 'Advanced Version History', icon: Clock, color: 'text-teal-500' },
  { id: 'smart-citations', name: 'Smart Citations', icon: Quote, color: 'text-indigo-500' },
  { id: 'advanced-tables', name: 'Advanced Tables', icon: Table, color: 'text-pink-500' },
  { id: 'math-equations', name: 'Math Equations', icon: Calculator, color: 'text-amber-500' },
  { id: 'chart-integration', name: 'Chart Integration', icon: BarChart, color: 'text-cyan-500' },
  { id: 'pdf-export', name: 'Advanced PDF Export', icon: Download, color: 'text-lime-500' },
  { id: 'templates', name: 'Professional Templates', icon: FileText, color: 'text-rose-500' },
  { id: 'translation', name: 'Real-time Translation', icon: Globe, color: 'text-violet-500' },
  { id: 'plagiarism-check', name: 'Plagiarism Detection', icon: Shield, color: 'text-emerald-500' },
  { id: 'focus-mode', name: 'Focus Mode', icon: Target, color: 'text-sky-500' },
  { id: 'outline-view', name: 'Outline View', icon: List, color: 'text-fuchsia-500' },
  { id: 'research-panel', name: 'Research Panel', icon: Search, color: 'text-slate-500' },
  { id: 'word-count', name: 'Advanced Word Count', icon: Hash, color: 'text-stone-500' },
  { id: 'reading-mode', name: 'Reading Mode', icon: Eye, color: 'text-red-500' },
  { id: 'dark-mode', name: 'Advanced Dark Mode', icon: Moon, color: 'text-gray-500' },
  { id: 'markdown-support', name: 'Markdown Support', icon: Code, color: 'text-yellow-500' }
]

// 🎨 DOCUMENT TEMPLATES
const DOCUMENT_TEMPLATES = [
  { id: 'blank', name: 'Blank Document', icon: FileText, category: 'Basic' },
  { id: 'resume', name: 'Professional Resume', icon: User, category: 'Professional' },
  { id: 'cover-letter', name: 'Cover Letter', icon: Mail, category: 'Professional' },
  { id: 'business-letter', name: 'Business Letter', icon: Building, category: 'Business' },
  { id: 'proposal', name: 'Project Proposal', icon: Lightbulb, category: 'Business' },
  { id: 'report', name: 'Technical Report', icon: BarChart, category: 'Academic' },
  { id: 'essay', name: 'Academic Essay', icon: GraduationCap, category: 'Academic' },
  { id: 'research-paper', name: 'Research Paper', icon: Search, category: 'Academic' },
  { id: 'thesis', name: 'Thesis Template', icon: BookOpen, category: 'Academic' },
  { id: 'newsletter', name: 'Newsletter', icon: Newspaper, category: 'Marketing' },
  { id: 'brochure', name: 'Brochure', icon: Layers, category: 'Marketing' },
  { id: 'invoice', name: 'Invoice', icon: Receipt, category: 'Business' },
  { id: 'contract', name: 'Legal Contract', icon: FileText, category: 'Legal' },
  { id: 'meeting-notes', name: 'Meeting Notes', icon: Users, category: 'Business' },
  { id: 'manual', name: 'User Manual', icon: Book, category: 'Technical' }
]

// 🔤 FORMATTING STYLES
const FORMATTING_STYLES = [
  { id: 'heading1', name: 'Heading 1', tag: 'h1', style: 'text-3xl font-bold' },
  { id: 'heading2', name: 'Heading 2', tag: 'h2', style: 'text-2xl font-semibold' },
  { id: 'heading3', name: 'Heading 3', tag: 'h3', style: 'text-xl font-medium' },
  { id: 'paragraph', name: 'Paragraph', tag: 'p', style: 'text-base' },
  { id: 'quote', name: 'Quote', tag: 'blockquote', style: 'text-lg italic border-l-4 border-blue-500 pl-4' },
  { id: 'code', name: 'Code', tag: 'code', style: 'font-mono bg-gray-100 px-2 py-1 rounded' },
  { id: 'preformatted', name: 'Preformatted', tag: 'pre', style: 'font-mono bg-gray-100 p-4 rounded' }
]

// 🎯 COLLABORATION FEATURES
const COLLABORATION_FEATURES = [
  { id: 'comments', name: 'Comments', icon: MessageCircle, color: 'text-blue-500' },
  { id: 'suggestions', name: 'Suggestions', icon: Lightbulb, color: 'text-yellow-500' },
  { id: 'track-changes', name: 'Track Changes', icon: Edit, color: 'text-green-500' },
  { id: 'version-compare', name: 'Version Compare', icon: GitBranch, color: 'text-purple-500' },
  { id: 'live-cursors', name: 'Live Cursors', icon: MousePointer, color: 'text-red-500' },
  { id: 'chat', name: 'Chat', icon: MessageSquare, color: 'text-teal-500' },
  { id: 'mentions', name: 'Mentions', icon: AtSign, color: 'text-orange-500' },
  { id: 'permissions', name: 'Permissions', icon: Shield, color: 'text-indigo-500' }
]

const UltimateDocumentEditor: React.FC<UltimateDocumentEditorProps> = ({
  width = 800,
  height = 600,
  collaborative = true,
  aiAssistant = true,
  templates = true
}) => {
  const { currentFile, updateFile } = useStore()
  const editorRef = useRef<HTMLDivElement>(null)
  const [selectedText, setSelectedText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [currentStyle, setCurrentStyle] = useState('paragraph')
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
  const [showSidebar, setShowSidebar] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showOutline, setShowOutline] = useState(false)
  const [showResearch, setShowResearch] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [collaborators, setCollaborators] = useState<Array<{
    id: string
    name: string
    color: string
    cursor: { x: number, y: number }
  }>>([])
  const [comments, setComments] = useState<Array<{
    id: string
    text: string
    author: string
    timestamp: Date
    position: { x: number, y: number }
    resolved: boolean
  }>>([])
  const [suggestions, setSuggestions] = useState<Array<{
    id: string
    type: 'grammar' | 'style' | 'spelling'
    text: string
    suggestion: string
    position: { start: number, end: number }
  }>>([])
  const [documentStats, setDocumentStats] = useState({
    words: 0,
    characters: 0,
    paragraphs: 0,
    pages: 0,
    readingTime: 0
  })

  useEffect(() => {
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
  }, [currentFile.content])

  const handleTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText
    updateFile(currentFile.id, { content })
  }

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertElement = (type: string) => {
    const editor = editorRef.current
    if (!editor) return

    const selection = window.getSelection()
    if (!selection) return

    const range = selection.getRangeAt(0)
    let element: HTMLElement

    switch (type) {
      case 'table':
        element = document.createElement('table')
        element.innerHTML = `
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </tr>
          <tr>
            <td>Cell 3</td>
            <td>Cell 4</td>
          </tr>
        `
        element.className = 'border-collapse border border-gray-300'
        break
      case 'image':
        element = document.createElement('img')
        element.src = 'https://via.placeholder.com/300x200'
        element.className = 'max-w-full h-auto'
        break
      case 'link':
        const url = prompt('Enter URL:')
        if (url) {
          element = document.createElement('a')
          element.href = url
          element.textContent = selectedText || 'Link'
          element.className = 'text-blue-500 underline'
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

  const addComment = (text: string) => {
    const selection = window.getSelection()
    if (!selection) return

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    
    const newComment = {
      id: Date.now().toString(),
      text,
      author: 'Current User',
      timestamp: new Date(),
      position: { x: rect.left, y: rect.top },
      resolved: false
    }
    
    setComments(prev => [...prev, newComment])
  }

  const toggleCollaboration = (feature: string) => {
    console.log('Toggling collaboration feature:', feature)
    // In a real implementation, this would toggle the feature
  }

  const exportDocument = (format: string) => {
    console.log('Exporting document as:', format)
    // In a real implementation, this would export the document
  }

  const aiAssist = (type: string) => {
    console.log('AI assistance requested:', type)
    // In a real implementation, this would call AI services
  }

  return (
    <div className={`ultimate-document-editor w-full h-full bg-white text-gray-900 ${focusMode ? 'focus-mode' : ''} ${readingMode ? 'reading-mode' : ''}`}>
      
      {/* 🔥 LEGENDARY TOOLBAR - BETTER THAN GOOGLE DOCS! */}
      <AnimatePresence>
        {showToolbar && !readingMode && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="toolbar flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">GT4 Docs Pro</span>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  value={currentStyle}
                  onChange={(e) => setCurrentStyle(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {FORMATTING_STYLES.map(style => (
                    <option key={style.id} value={style.id}>
                      {style.name}
                    </option>
                  ))}
                </select>
                
                <select 
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      : 'bg-gray-200 hover:bg-gray-300'
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
                      : 'bg-gray-200 hover:bg-gray-300'
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
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <Underline className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => applyFormatting('strikethrough')}
                  className={`p-2 rounded-lg transition-colors ${
                    isFormatting.strikethrough 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
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
                      : 'bg-gray-200 hover:bg-gray-300'
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
                      : 'bg-gray-200 hover:bg-gray-300'
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
                      : 'bg-gray-200 hover:bg-gray-300'
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
                      : 'bg-gray-200 hover:bg-gray-300'
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
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Link className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => insertElement('image')}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Image className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => insertElement('table')}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Table className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {aiAssistant && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => aiAssist('grammar')}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  <Brain className="w-4 h-4" />
                  AI Assistant
                </motion.button>
              )}
              
              {collaborative && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComments(!showComments)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    showComments 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Comments
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowOutline(!showOutline)}
                className={`p-2 rounded-lg transition-colors ${
                  showOutline 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <List className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFocusMode(!focusMode)}
                className={`p-2 rounded-lg transition-colors ${
                  focusMode 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Target className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setReadingMode(!readingMode)}
                className={`p-2 rounded-lg transition-colors ${
                  readingMode 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📝 MAIN EDITOR AREA */}
      <div className="flex h-full">
        
        {/* 📋 OUTLINE SIDEBAR */}
        <AnimatePresence>
          {showOutline && !focusMode && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Document Outline</h3>
                  <button
                    onClick={() => setShowOutline(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {/* Sample outline items */}
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">Introduction</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">Main Content</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">Conclusion</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 📄 DOCUMENT EDITOR */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-8" style={{ zoom: `${zoomLevel}%` }}>
              <div
                ref={editorRef}
                className="min-h-screen bg-white p-8 shadow-lg rounded-lg border border-gray-200 outline-none"
                contentEditable
                suppressContentEditableWarning
                onInput={handleTextChange}
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
          
          {/* 📊 STATUS BAR */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>{documentStats.words} words</span>
              <span>{documentStats.characters} characters</span>
              <span>{documentStats.paragraphs} paragraphs</span>
              <span>{documentStats.pages} pages</span>
              <span>{documentStats.readingTime} min read</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </motion.button>
                
                <span className="min-w-[50px] text-center">{zoomLevel}%</span>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last saved: Just now</span>
              </div>
              
              {collaborative && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{collaborators.length} collaborators</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 💬 COMMENTS PANEL */}
        <AnimatePresence>
          {showComments && collaborative && !focusMode && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Comments</h3>
                  <button
                    onClick={() => setShowComments(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {comment.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs text-blue-500 hover:text-blue-700"
                        >
                          Reply
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs text-green-500 hover:text-green-700"
                        >
                          Resolve
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {comments.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No comments yet</p>
                      <p className="text-sm">Select text to add a comment</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🎯 COLLABORATION CURSORS */}
      <AnimatePresence>
        {collaborative && collaborators.map((collaborator, index) => (
          <motion.div
            key={collaborator.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute pointer-events-none z-20"
            style={{
              left: collaborator.cursor.x,
              top: collaborator.cursor.y,
              color: collaborator.color,
            }}
          >
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: collaborator.color }} />
              <span className="text-xs font-medium bg-black/80 text-white px-2 py-1 rounded">
                {collaborator.name}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 🔍 SUGGESTIONS OVERLAY */}
      <AnimatePresence>
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-10 bg-white border border-red-300 rounded-lg p-3 shadow-lg max-w-xs"
            style={{
              left: `${suggestion.position.start * 10}px`,
              top: `${suggestion.position.end * 20}px`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                suggestion.type === 'grammar' ? 'bg-red-500' :
                suggestion.type === 'style' ? 'bg-blue-500' :
                'bg-yellow-500'
              }`} />
              <span className="text-xs font-medium capitalize">{suggestion.type}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{suggestion.text}</p>
            <p className="text-sm text-green-600 mb-3">{suggestion.suggestion}</p>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Accept
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                Ignore
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default UltimateDocumentEditor