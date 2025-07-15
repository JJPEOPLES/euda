import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'
import { 
  Video,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Upload,
  Download,
  Scissors,
  Layers,
  Filter,
  Type,
  Music,
  Settings,
  Maximize,
  RotateCw,
  Crop
} from 'lucide-react'

const VideoEditor = () => {
  const { currentFile, updateFileContent } = useStore()
  const playerRef = useRef<ReactPlayer>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  
  // Timeline state
  const [timeline, setTimeline] = useState({
    start: 0,
    end: 100,
    currentTime: 0
  })

  useEffect(() => {
    if (currentFile?.content && currentFile.content.startsWith('data:video/')) {
      setVideoUrl(currentFile.content)
    }
  }, [currentFile])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file')
        return
      }
      
      // Create object URL for better performance with large files
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      
      // For file content, store file info instead of full data
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: url
      }
      updateFileContent(JSON.stringify(fileInfo))
    }
  }

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const handleSeek = (value: number) => {
    const newTime = (value / 100) * duration
    playerRef.current?.seekTo(newTime)
    setPlayed(value / 100)
  }

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setPlayed(state.played)
    setTimeline(prev => ({ ...prev, currentTime: state.playedSeconds }))
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
    setTimeline(prev => ({ ...prev, end: duration }))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const exportVideo = () => {
    // In a real implementation, this would handle video export
    if (videoUrl) {
      const link = document.createElement('a')
      link.href = videoUrl
      link.download = 'euda-video.mp4'
      link.click()
    }
  }

  const videoControls = [
    { id: 'cut', name: 'Cut', icon: Scissors },
    { id: 'layers', name: 'Layers', icon: Layers },
    { id: 'filter', name: 'Filter', icon: Filter },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'audio', name: 'Audio', icon: Music },
    { id: 'crop', name: 'Crop', icon: Crop },
    { id: 'rotate', name: 'Rotate', icon: RotateCw }
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
            {/* Video Tools */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {videoControls.map((tool) => (
                <button
                  key={tool.id}
                  className="px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title={tool.name}
                >
                  <tool.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Playback Speed */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Speed:</label>
              <select
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Video
            </button>
            <button
              onClick={exportVideo}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="video-player relative w-full max-w-4xl">
          {videoUrl ? (
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              playing={playing}
              volume={volume}
              muted={muted}
              playbackRate={playbackRate}
              width="100%"
              height="400px"
              onProgress={handleProgress}
              onDuration={handleDuration}
              controls={false}
            />
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">No video loaded</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="button-primary"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </button>
              </div>
            </div>
          )}

          {/* Video Controls Overlay */}
          {videoUrl && (
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => playerRef.current?.seekTo(Math.max(0, played - 0.1))}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => playerRef.current?.seekTo(Math.min(1, played + 0.1))}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <div className="flex-1 flex items-center gap-2">
                  <span className="text-white text-sm">
                    {formatTime(played * duration)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={played * 100}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-white text-sm">
                    {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMuted(!muted)}
                    className="text-white hover:text-primary-400 transition-colors"
                  >
                    {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20"
                  />
                  <button className="text-white hover:text-primary-400 transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Timeline</h3>
          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg h-16">
            {videoUrl && (
              <div 
                className="absolute top-0 left-0 h-full bg-primary-600 rounded-lg"
                style={{ width: `${played * 100}%` }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {videoUrl ? `${formatTime(played * duration)} / ${formatTime(duration)}` : 'No video loaded'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {videoUrl ? `Resolution: Loading...` : 'No video'}
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Duration: {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Add Track
            </button>
            <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Split
            </button>
            <button className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Merge
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default VideoEditor