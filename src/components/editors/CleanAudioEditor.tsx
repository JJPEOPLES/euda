import React, { useRef, useState, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Music,
  Settings,
  Download,
  Upload,
  Scissors,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Sliders,
  Waves,
  Activity,
  BarChart,
  TrendingUp,
  Eye,
  EyeOff,
  Sparkles,
  Wand2,
  Brain,
  Target,
  Clock,
  Timer,
  Users,
  MessageCircle,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  Info,
  Star,
  Heart,
  Flame,
  Zap,
  Save,
  Maximize,
  Minimize,
  Filter,
  Shuffle,
  Repeat,
  Repeat1,
  Crown,
  Shield,
  Rocket,
  Lightning,
  Globe,
  Sun,
  Moon,
  Diamond,
  Award,
  Trophy
} from 'lucide-react'

const CleanAudioEditor = () => {
  const { currentFile, updateFile } = useStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [selectedTool, setSelectedTool] = useState('select')
  const [waveformData, setWaveformData] = useState<number[]>([])
  const [playbackRate, setPlaybackRate] = useState(1)
  const [loop, setLoop] = useState(false)
  const [muted, setMuted] = useState(false)
  const [aiMode, setAiMode] = useState(false)
  const [godMode, setGodMode] = useState(false)
  const [quantumMode, setQuantumMode] = useState(false)

  const tools = [
    { id: 'select', icon: Target, name: 'Select', color: 'text-blue-500' },
    { id: 'cut', icon: Scissors, name: 'Cut', color: 'text-red-500' },
    { id: 'copy', icon: Copy, name: 'Copy', color: 'text-green-500' },
    { id: 'fade', icon: TrendingUp, name: 'Fade', color: 'text-purple-500' },
    { id: 'normalize', icon: BarChart, name: 'Normalize', color: 'text-orange-500' },
    { id: 'compress', icon: Sliders, name: 'Compress', color: 'text-cyan-500' },
    { id: 'reverb', icon: Waves, name: 'Reverb', color: 'text-pink-500' },
    { id: 'echo', icon: Activity, name: 'Echo', color: 'text-yellow-500' },
    { id: 'filter', icon: Filter, name: 'Filter', color: 'text-indigo-500' }
  ]

  const effects = [
    { name: 'Normalize', effect: 'normalize' },
    { name: 'Compress', effect: 'compress' },
    { name: 'Reverb', effect: 'reverb' },
    { name: 'Echo', effect: 'echo' },
    { name: 'Distortion', effect: 'distortion' },
    { name: 'Chorus', effect: 'chorus' },
    { name: 'Flanger', effect: 'flanger' },
    { name: 'Phaser', effect: 'phaser' }
  ]

  useEffect(() => {
    if (currentFile?.content) {
      setAudioUrl(currentFile.content)
    }
  }, [currentFile])

  useEffect(() => {
    // Generate sample waveform data
    const generateWaveform = () => {
      const data: number[] = []
      for (let i = 0; i < 1000; i++) {
        data.push(Math.random() * 100)
      }
      setWaveformData(data)
    }
    generateWaveform()
  }, [audioUrl])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
      updateFile(currentFile.id, { content: url })
    }
  }

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  const handleToggleMute = () => {
    setMuted(!muted)
    if (audioRef.current) {
      audioRef.current.muted = !muted
    }
  }

  const handleToggleLoop = () => {
    setLoop(!loop)
    if (audioRef.current) {
      audioRef.current.loop = !loop
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate)
    if (audioRef.current) {
      audioRef.current.playbackRate = rate
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        updateFile(currentFile.id, { content: url })
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop()
      setIsRecording(false)
      setMediaRecorder(null)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const exportAudio = () => {
    console.log('Exporting audio...')
    // In a real implementation, this would handle audio export
  }

  const applyEffect = (effect: string) => {
    console.log(`Applying effect: ${effect}`)
    // In a real implementation, this would apply audio effects
  }

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
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
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <Music className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">GT4 Audio Pro</h2>
          <p className="text-xl text-gray-300">Upload or record audio to begin</p>
          <div className="flex items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Upload Audio
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5 inline mr-2" /> : <Mic className="w-5 h-5 inline mr-2" />}
              {isRecording ? 'Stop Recording' : 'Record Audio'}
            </motion.button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`clean-audio-editor flex flex-col h-full bg-gradient-to-br from-gray-900 to-black text-white ${
      godMode ? 'god-mode' : ''
    } ${
      quantumMode ? 'quantum-mode' : ''
    }`}>
      {/* 🔥 LEGENDARY HEADER */}
      <div className="header bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Waves className="w-6 h-6" />
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold">GT4 AUDIO PRO</h1>
              <p className="text-sm text-gray-300">Professional Audio Editor</p>
            </div>
            
            <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
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
              <Lightning className="w-5 h-5 inline mr-2" />
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
              onClick={exportAudio}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Download className="w-5 h-5 inline mr-2" />
              Export
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🎛️ AUDIO TOOLS */}
      <div className="tools-bar bg-gradient-to-r from-gray-900 to-black p-4 border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">TOOLS:</span>
            {tools.map(tool => (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTool(tool.id)}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg font-medium transition-all ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isRecording ? 'Stop' : 'Record'}
            </motion.button>
            
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

      {/* 🌊 WAVEFORM DISPLAY */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="w-full h-full bg-black rounded-lg relative overflow-hidden border border-purple-500/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-32 flex items-end justify-center gap-1 px-4">
                {waveformData.map((amplitude, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-green-400 to-blue-500 rounded-t-sm"
                    style={{
                      width: '2px',
                      height: `${amplitude}%`,
                      opacity: index < (currentTime / duration) * waveformData.length ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
              
              {/* Playhead */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                style={{
                  left: `${(currentTime / duration) * 100}%`
                }}
              />
            </div>
            
            {!audioUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Waves className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-500">Upload or record audio to see waveform</p>
                </div>
              </div>
            )}
            
            {/* GOD MODE AURA */}
            {godMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 animate-pulse" />
            )}
            
            {/* QUANTUM PARTICLES */}
            {quantumMode && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      x: [0, Math.random() * 400],
                      y: [0, Math.random() * 200],
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
          </div>
        </div>
      </div>

      {/* 🎵 AUDIO CONTROLS */}
      <div className="controls bg-gradient-to-r from-gray-900 to-black p-4 border-t border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isPlaying ? handlePause : handlePlay}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStop}
                className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
              >
                <Square className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleLoop}
                className={`p-3 rounded-lg transition-all ${
                  loop 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Repeat className="w-6 h-6" />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-purple-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleMute}
                className="p-1 rounded transition-colors"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Speed:</span>
              <select
                value={playbackRate}
                onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white"
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {effects.map(effect => (
              <motion.button
                key={effect.effect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyEffect(effect.effect)}
                className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all text-sm"
              >
                {effect.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Timeline Scrubber */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>

      {/* 📊 STATUS BAR */}
      <div className="status-bar bg-gradient-to-r from-black via-purple-900 to-black text-white p-3 border-t border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">AUDIO</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{Math.round(volume * 100)}% volume</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              />
              <span className="text-sm font-bold">AUDIO PRO</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">AI READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default CleanAudioEditor