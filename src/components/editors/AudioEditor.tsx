import React from 'react'
import UltimateAudioEditor from './UltimateAudioEditor'

const AudioEditor: React.FC = () => {
  return <UltimateAudioEditor />
}

export default AudioEditor
import { motion } from 'framer-motion'
import { 
  Music,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Upload,
  Download,
  Scissors,
  Copy,
  Filter,
  Mic,
  Headphones,
  Settings,
  Zap,
  Waves
} from 'lucide-react'

const AudioEditor = () => {
  const { currentFile, updateFileContent } = useStore()
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [selectedTool, setSelectedTool] = useState('select')

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#3b82f6',
        progressColor: '#1d4ed8',
        cursorColor: '#ef4444',
        barWidth: 2,
        barGap: 1,
        height: 128,

        backend: 'WebAudio',
        interact: true,

      })

      const wavesurfer = wavesurferRef.current

      wavesurfer.on('ready', () => {
        setDuration(wavesurfer.getDuration())
      })

      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime())
      })

      wavesurfer.on('interaction', () => {
        setCurrentTime(wavesurfer.getCurrentTime())
      })

      wavesurfer.on('play', () => {
        setIsPlaying(true)
      })

      wavesurfer.on('pause', () => {
        setIsPlaying(false)
      })

      wavesurfer.on('finish', () => {
        setIsPlaying(false)
      })

      return () => {
        wavesurfer.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (currentFile?.content && currentFile.content.startsWith('data:audio/')) {
      setAudioUrl(currentFile.content)
      if (wavesurferRef.current) {
        wavesurferRef.current.load(currentFile.content)
      }
    }
  }, [currentFile])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('audio/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const audioData = e.target?.result as string
        setAudioUrl(audioData)
        updateFileContent(audioData)
        if (wavesurferRef.current) {
          wavesurferRef.current.load(audioData)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
    }
  }

  const handleStop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop()
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => {
        chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const reader = new FileReader()
        reader.onload = (e) => {
          const audioData = e.target?.result as string
          setAudioUrl(audioData)
          updateFileContent(audioData)
          if (wavesurferRef.current) {
            wavesurferRef.current.load(audioData)
          }
        }
        reader.readAsDataURL(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop()
      setIsRecording(false)
      setMediaRecorder(null)
    }
  }

  const exportAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a')
      link.href = audioUrl
      link.download = 'euda-audio.wav'
      link.click()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const audioTools = [
    { id: 'select', name: 'Select', icon: '🔍' },
    { id: 'cut', name: 'Cut', icon: '✂️' },
    { id: 'copy', name: 'Copy', icon: '📋' },
    { id: 'fade', name: 'Fade', icon: '🌅' },
    { id: 'amplify', name: 'Amplify', icon: '📢' },
    { id: 'normalize', name: 'Normalize', icon: '⚖️' },
    { id: 'reverb', name: 'Reverb', icon: '🌊' },
    { id: 'compressor', name: 'Compress', icon: '🔧' }
  ]

  const effects = [
    { name: 'Reverb', active: false },
    { name: 'Echo', active: false },
    { name: 'Compressor', active: false },
    { name: 'EQ', active: false },
    { name: 'Noise Gate', active: false },
    { name: 'Limiter', active: false }
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
            {/* Audio Tools */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {audioTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title={tool.name}
                >
                  <span className="text-lg">{tool.icon}</span>
                </button>
              ))}
            </div>

            {/* Recording Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isRecording
                    ? 'bg-red-600 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isRecording ? 'Stop Recording' : 'Record'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Audio
            </button>
            <button
              onClick={exportAudio}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex-1 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Waveform</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          
          <div className="waveform-container mb-4">
            {audioUrl ? (
              <div ref={waveformRef} />
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <Waves className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">No audio loaded</p>
                </div>
              </div>
            )}
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => wavesurferRef.current?.skip(-10)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              disabled={!audioUrl}
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
              disabled={!audioUrl}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button
              onClick={handleStop}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              disabled={!audioUrl}
            >
              <Square className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => wavesurferRef.current?.skip(10)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              disabled={!audioUrl}
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 ml-4">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Effects Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Effects</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {effects.map((effect) => (
              <button
                key={effect.name}
                className={`p-3 rounded-lg border-2 transition-all ${
                  effect.active
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                }`}
              >
                <div className="text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {effect.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {audioUrl ? 'Audio loaded' : 'No audio'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Sample Rate: 44.1 kHz
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Bit Depth: 16-bit
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tool: {audioTools.find(t => t.id === selectedTool)?.name}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AudioEditor