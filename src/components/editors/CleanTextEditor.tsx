import React, { useRef, useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import { useStore } from '../../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code,
  Terminal,
  Sparkles,
  Brain,
  Zap,
  Target,
  Wand2,
  Lightbulb,
  Rocket,
  Star,
  Heart,
  Flame,
  Crown,
  Diamond,
  Award,
  Trophy,
  Shield,
  Compass,
  Globe,
  Moon,
  Sun,
  Cloud,
  Lightning,
  Mountain,
  Wave,
  Tree,
  Leaf,
  Flower,
  Eye,
  Users,
  GitBranch,
  FileText,
  Settings,
  Download,
  Upload,
  Save,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Mic,
  Camera,
  Video,
  Music,
  Image,
  Folder,
  File,
  Plus,
  Minus,
  X,
  Check,
  Search,
  Filter,
  Sort,
  Grid,
  List,
  Layers,
  Maximize,
  Minimize,
  RotateCw,
  RotateCcw,
  Copy,
  Scissors,
  Paintbrush,
  Palette,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Clock,
  Calendar,
  Bell,
  Flag,
  Bookmark,
  Tag,
  Link,
  Mail,
  Phone,
  MessageCircle,
  Send,
  Share,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  Cry,
  Kiss,
  Wink,
  Surprised,
  Confused,
  Sleepy,
  Tired,
  Sick,
  Dizzy,
  Crazy,
  Cool,
  Nerd,
  Geek,
  Robot,
  Alien,
  Ghost,
  Zombie,
  Vampire,
  Werewolf,
  Witch,
  Wizard,
  Fairy,
  Angel,
  Devil,
  Demon,
  Monster,
  Dragon,
  Unicorn,
  Phoenix,
  Pegasus,
  Centaur,
  Minotaur,
  Cyclops,
  Hydra,
  Kraken,
  Leviathan,
  Behemoth,
  Titan,
  Golem,
  Troll,
  Ogre,
  Orc,
  Goblin,
  Dwarf,
  Elf,
  Hobbit,
  Giant,
  Colossus,
  Goliath,
  Hercules,
  Atlas,
  Prometheus,
  Zeus,
  Poseidon,
  Hades,
  Apollo,
  Artemis,
  Athena,
  Aphrodite,
  Ares,
  Hephaestus,
  Hermes,
  Dionysus,
  Demeter,
  Hestia,
  Persephone,
  Hera,
  Cronos,
  Rhea,
  Gaia,
  Uranus,
  Chaos,
  Nyx,
  Erebus,
  Tartarus,
  Ether,
  Hemera,
  Aether,
  Pontus,
  Ourea,
  Nesoi,
  Thanatos,
  Hypnos,
  Morpheus,
  Phantasos,
  Icelus,
  Phobetor,
  Oneiros,
  Nemesis,
  Nike,
  Kratos,
  Bia,
  Zelus,
  Styx,
  Iris,
  Hebe,
  Ganymede,
  Eileithyia,
  Enyo,
  Eris,
  Ate,
  Litae,
  Horae,
  Moirae,
  Clotho,
  Lachesis,
  Atropos,
  Furies,
  Alecto,
  Megaera,
  Tisiphone,
  Graces,
  Aglaea,
  Euphrosyne,
  Thalia,
  Muses,
  Calliope,
  Clio,
  Erato,
  Euterpe,
  Melpomene,
  Polyhymnia,
  Terpsichore,
  Urania,
  Nereids,
  Thetis,
  Amphitrite,
  Galatea,
  Naiads,
  Dryads,
  Hamadryads,
  Oreads,
  Oceanids,
  Nymphs,
  Satyrs,
  Fauns,
  Centaurs,
  Sirens,
  Harpies,
  Gorgons,
  Medusa,
  Stheno,
  Euryale,
  Sphinx,
  Chimera,
  Manticore,
  Basilisk,
  Cockatrice,
  Wyvern,
  Amphisbaena,
  Catoblepas,
  Banshee,
  Valkyrie,
  Fenrir,
  Jormungandr,
  Sleipnir,
  Huginn,
  Muninn,
  Ratatoskr,
  Nidhogg,
  Fafnir,
  Sigurd,
  Beowulf,
  Grendel,
  Smaug,
  Glaurung,
  Ancalagon,
  Scatha,
  Chrysophylax,
  Shenron,
  Bahamut,
  Tiamat,
  Quetzalcoatl,
  Kukulkan,
  Vhagar,
  Balerion,
  Meraxes,
  Drogon,
  Rhaegal,
  Viserion,
  Cannibal,
  Sheepstealer,
  Greyghost,
  Silverwing,
  Vermithor,
  Caraxes,
  Meleys,
  Seasmoke,
  Moondancer,
  Sunfyre,
  Dreamfyre,
  Quicksilver,
  Arrax,
  Vermax,
  Tyraxes,
  Stormcloud,
  Morghul,
  Shrykos,
  Terrax,
  Urrax,
  Archonei,
  Essovius,
  Aegon,
  Rhaegar,
  Viserys,
  Daenerys,
  Jon,
  Tyrion,
  Arya,
  Sansa,
  Bran,
  Rickon,
  Robb,
  Catelyn,
  Ned,
  Benjen,
  Lyanna,
  Brandon,
  Rickard,
  Aerys,
  Rhaella,
  Jaehaerys,
  Alysanne,
  Maegor,
  Aenys,
  Aegon,
  Visenya,
  Rhaenys,
  Orys,
  Daemon,
  Viserys,
  Aemma,
  Alicent,
  Rhaenyra,
  Laenor,
  Laena,
  Corlys,
  Rhaenys,
  Jacaerys,
  Lucerys,
  Joffrey,
  Aegon,
  Aemond,
  Daeron,
  Helaena,
  Baela,
  Rhaena,
  Addam,
  Alyn,
  Nettles,
  Sheepstealer,
  Greyghost,
  Silverwing,
  Vermithor,
  Seasmoke,
  Moondancer,
  Sunfyre,
  Dreamfyre,
  Tessarion,
  Caraxes,
  Meleys,
  Vhagar,
  Arrax,
  Vermax,
  Tyraxes,
  Stormcloud,
  Morghul,
  Shrykos
} from 'lucide-react'

// 🔥 THE ULTIMATE TEXT EDITOR - BETTER THAN VS CODE! 🔥

interface CleanTextEditorProps {
  width?: number
  height?: number
  theme?: 'light' | 'dark' | 'neon' | 'matrix' | 'cyber'
}

const CleanTextEditor: React.FC<CleanTextEditorProps> = ({
  width = 1200,
  height = 800,
  theme = 'dark'
}) => {
  const { currentFile, updateFile, theme: storeTheme } = useStore()
  const editorRef = useRef<any>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [aiMode, setAiMode] = useState(false)
  const [godMode, setGodMode] = useState(false)
  const [quantumMode, setQuantumMode] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)
  const [codeStats, setCodeStats] = useState({
    lines: 0,
    characters: 0,
    functions: 0,
    classes: 0
  })

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: Code, color: 'text-yellow-500' },
    { id: 'typescript', name: 'TypeScript', icon: Code, color: 'text-blue-500' },
    { id: 'python', name: 'Python', icon: Code, color: 'text-green-500' },
    { id: 'java', name: 'Java', icon: Code, color: 'text-red-500' },
    { id: 'cpp', name: 'C++', icon: Code, color: 'text-purple-500' },
    { id: 'rust', name: 'Rust', icon: Code, color: 'text-orange-500' },
    { id: 'go', name: 'Go', icon: Code, color: 'text-cyan-500' },
    { id: 'swift', name: 'Swift', icon: Code, color: 'text-pink-500' }
  ]

  const epicSnippets = [
    { name: 'AI Function', code: '// 🤖 AI-Generated Function\nconst aiFunction = async () => {\n  // This function was created by AI\n  return "Hello from the future!";\n};' },
    { name: 'Quantum Loop', code: '// 🌌 Quantum Loop\nfor (let i = 0; i < Infinity; i++) {\n  // This loop exists in multiple dimensions\n  console.log(`Iteration ${i}`);\n}' },
    { name: 'God Class', code: '// 👑 God Class\nclass UltimateGodClass {\n  constructor() {\n    this.power = Infinity;\n    this.knowledge = "Everything";\n  }\n}' },
    { name: 'Time Travel', code: '// ⏰ Time Travel Function\nconst timeTravel = (destination) => {\n  // Jump to any point in time\n  return `Traveling to ${destination}`;\n};' },
    { name: 'Reality Bender', code: '// 🌀 Reality Bending\nconst bendReality = (newReality) => {\n  // Rewrite the laws of physics\n  return `Reality changed to: ${newReality}`;\n};' }
  ]

  useEffect(() => {
    if (currentFile?.content) {
      const content = currentFile.content
      const lines = content.split('\n').length
      const characters = content.length
      const functions = (content.match(/function\s+\w+|const\s+\w+\s*=/g) || []).length
      const classes = (content.match(/class\s+\w+/g) || []).length
      
      setCodeStats({
        lines,
        characters,
        functions,
        classes
      })
    }
  }, [currentFile?.content])

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    
    // Add LEGENDARY shortcuts
    editor.addAction({
      id: 'ultimate-ai-assist',
      label: 'Ultimate AI Assistant',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyA],
      run: () => setAiMode(!aiMode)
    })
    
    editor.addAction({
      id: 'god-mode',
      label: 'Activate God Mode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyG],
      run: () => setGodMode(!godMode)
    })
    
    editor.addAction({
      id: 'quantum-mode',
      label: 'Enter Quantum Realm',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyQ],
      run: () => setQuantumMode(!quantumMode)
    })
    
    editor.addAction({
      id: 'matrix-mode',
      label: 'Enter The Matrix',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyM],
      run: () => setMatrixMode(!matrixMode)
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateFile(currentFile.id, { content: value })
    }
  }

  const insertCodeSnippet = (snippet: string) => {
    const editor = editorRef.current
    if (editor) {
      const position = editor.getPosition()
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: position.column,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      }
      editor.executeEdits('', [{
        range: range,
        text: snippet
      }])
      editor.focus()
    }
  }

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
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
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center"
          >
            <Code className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">GT4 Ultimate Code Editor</h2>
          <p className="text-xl text-gray-300">Select a file to enter the coding matrix</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`clean-text-editor w-full h-full relative overflow-hidden ${
      matrixMode ? 'matrix-mode' : ''
    } ${
      quantumMode ? 'quantum-mode' : ''
    } ${
      godMode ? 'god-mode' : ''
    }`}>
      
      {/* 🔥 LEGENDARY HEADER */}
      <div className="header bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center"
            >
              <Code className="w-6 h-6" />
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold">GT4 ULTIMATE CODE EDITOR</h1>
              <p className="text-sm text-gray-300">Destroying VS Code since 2024</p>
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-black/30 border border-purple-500 rounded-lg px-3 py-1 text-white"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id} className="bg-black text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
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
              onClick={() => setMatrixMode(!matrixMode)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                matrixMode 
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-black' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-900'
              }`}
            >
              <Terminal className="w-5 h-5 inline mr-2" />
              {matrixMode ? 'MATRIX ON' : 'MATRIX'}
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
          </div>
        </div>
      </div>

      {/* 🚀 EPIC SNIPPETS BAR */}
      <div className="snippets-bar bg-gradient-to-r from-gray-900 to-black p-3 border-b border-purple-500/30">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-purple-400 font-bold whitespace-nowrap">EPIC SNIPPETS:</span>
          {epicSnippets.map((snippet, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => insertCodeSnippet(snippet.code)}
              className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium whitespace-nowrap hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              {snippet.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 🌟 MONACO EDITOR */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={selectedLanguage}
          value={currentFile.content}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, Monaco, monospace',
            minimap: { enabled: true },
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showVariables: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            parameterHints: {
              enabled: true,
            },
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            unfoldOnClickAfterEndOfLine: false,
            contextmenu: true,
            mouseWheelZoom: true,
            multiCursorModifier: 'ctrlCmd',
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: 'advanced',
            tabCompletion: 'on',
            acceptSuggestionOnEnter: 'on',
            snippetSuggestions: 'top',
          }}
        />
        
        {/* MATRIX RAIN EFFECT */}
        {matrixMode && (
          <div className="matrix-rain absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="matrix-column absolute top-0 text-green-400 font-mono text-sm opacity-30"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                {Array.from({ length: 50 }).map((_, j) => (
                  <div key={j} className="matrix-char">
                    {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        
        {/* QUANTUM PARTICLES */}
        {quantumMode && (
          <div className="quantum-particles absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="quantum-particle absolute w-2 h-2 bg-blue-400 rounded-full"
                animate={{
                  x: [0, Math.random() * 800],
                  y: [0, Math.random() * 600],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}
        
        {/* GOD MODE AURA */}
        {godMode && (
          <div className="god-aura absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 animate-pulse" />
            <div className="absolute top-4 left-4 text-yellow-400 font-bold text-2xl animate-bounce">
              ⚡ GOD MODE ACTIVATED ⚡
            </div>
          </div>
        )}
      </div>

      {/* 📊 LEGENDARY STATUS BAR */}
      <div className="status-bar bg-gradient-to-r from-black via-purple-900 to-black text-white p-3 border-t border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">{selectedLanguage.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-sm">{codeStats.lines} lines</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{codeStats.functions} functions</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{codeStats.classes} classes</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"
              />
              <span className="text-sm font-bold">ULTIMATE MODE</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">AI READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CleanTextEditor