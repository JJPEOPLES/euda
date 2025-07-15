import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
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
  Settings,
  Download,
  Upload,
  Scissors,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Crop,
  Palette,
  Type,
  Image,
  Music,
  Mic,
  Camera,
  Video,
  Film,
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Sparkles,
  Wand2,
  Brain,
  Target,
  Clock,
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
  Expand,
  Shrink,
  Grid,
  List,
  MoreHorizontal,
  MoreVertical,
  Folder,
  File,
  Crown,
  Shield,
  Rocket,
  Globe,
  Sun,
  Moon,
  Diamond,
  Award,
  Trophy
} from 'lucide-react'

const CleanVideoEditor = () => {
  const { currentFile, updateFile } = useStore()
  const playerRef = useRef<ReactPlayer>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [seeking, setSeeking] = useState(false)
  const [aiMode, setAiMode] = useState(false)
  const [godMode, setGodMode] = useState(false)
  const [quantumMode, setQuantumMode] = useState(false)
  
  const [timeline, setTimeline] = useState({
    tracks: [
      { id: 'video1', name: 'Video Track 1', type: 'video', clips: [] },
      { id: 'audio1', name: 'Audio Track 1', type: 'audio', clips: [] }
    ]
  })

  useEffect(() => {
    if (currentFile?.content) {
      setVideoUrl(currentFile.content)
    }
  }, [currentFile])

  const handlePlay = () => {
    setPlaying(true)
  }

  const handlePause = () => {
    setPlaying(false)
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeking(false)
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(e.target.value))
    }
  }

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played)
    }
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  const handleToggleMute = () => {
    setMuted(!muted)
  }

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      updateFile(currentFile.id, { content: url })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const addTrack = (type: 'video' | 'audio') => {
    const newTrack = {
      id: `${type}_${Date.now()}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Track`,
      type,
      clips: []
    }
    setTimeline(prev => ({
      ...prev,
      tracks: [...prev.tracks, newTrack]
    }))
  }

  const exportVideo = () => {
    console.log('Exporting video...')
    // In a real implementation, this would handle video export
  }

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-red-900 via-pink-900 to-purple-900">
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
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <Video className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">GT4 Video Pro</h2>
          <p className="text-xl text-gray-300">Upload a video to begin editing</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
          >
            <Upload className="w-6 h-6 inline mr-3" />
            Upload Video
          </motion.button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`clean-video-editor flex flex-col h-full bg-gradient-to-br from-gray-900 to-black text-white ${
      godMode ? 'god-mode' : ''
    } ${
      quantumMode ? 'quantum-mode' : ''
    }`}>
      
      {/* 🔥 LEGENDARY HEADER */}
      <div className="header bg-gradient-to-r from-red-900 via-pink-900 to-purple-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Film className="w-6 h-6" />
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold">GT4 VIDEO PRO</h1>
              <p className="text-sm text-gray-300">Professional Video Editor</p>
            </div>
            
            <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                {formatTime(played * duration)} / {formatTime(duration)}
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
              onClick={exportVideo}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Download className="w-5 h-5 inline mr-2" />
              Export
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🎬 MAIN VIDEO PLAYER */}
      <div className="flex-1 flex items-center justify-center p-6 bg-black relative">
        <div className="relative max-w-4xl w-full">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            width="100%"
            height="auto"
            playing={playing}
            volume={volume}
            muted={muted}
            playbackRate={playbackRate}
            onPlay={handlePlay}
            onPause={handlePause}
            onProgress={handleProgress}
            onDuration={handleDuration}
            controls={false}
            className="react-player"
          />
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPlaying(!playing)}
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all"
            >
              {playing ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </motion.button>
          </div>
          
          {/* GOD MODE AURA */}
          {godMode && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 animate-pulse pointer-events-none" />
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

      {/* 🎮 VIDEO CONTROLS */}
      <div className="controls bg-gradient-to-r from-gray-900 to-black p-4 border-t border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlaying(!playing)}
                className="p-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlaying(false)}
                className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
              >
                <Square className="w-6 h-6" />
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
                className="w-24 accent-red-500"
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
            >
              <Wand2 className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
            >
              <Palette className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all"
            >
              <Scissors className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Timeline Scrubber */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>
      </div>

      {/* 🎞️ TIMELINE */}
      <div className="timeline h-40 bg-gradient-to-r from-gray-900 to-black border-t border-purple-500/30">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Timeline</h3>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addTrack('video')}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <Video className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addTrack('audio')}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <Volume2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {timeline.tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center border-b border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <div className="w-32 p-3 bg-gray-800 flex items-center justify-between">
                <span className="text-sm font-medium text-white">{track.name}</span>
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    <Lock className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
              
              <div className="flex-1 h-12 bg-gradient-to-r from-transparent via-gray-700 to-transparent relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                  Drop clips here
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 STATUS BAR */}
      <div className="status-bar bg-gradient-to-r from-black via-red-900 to-black text-white p-3 border-t border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium">VIDEO</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">{Math.round(playbackRate * 100)}% speed</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
              />
              <span className="text-sm font-bold">VIDEO PRO</span>
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
        accept="video/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}

export default CleanVideoEditor