import React, { useRef, useEffect, useState } from 'react'
import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'
import { 
  Image,
  Square,
  Circle,
  Type,
  Brush,
  Eraser,
  Undo,
  Redo,
  Download,
  Upload,
  Trash2,
  MousePointer,
  Palette,
  Filter,
  Brightness4,
  Contrast,
  Zap,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Save
} from 'lucide-react'

const ImageEditor = () => {
  const { currentFile, updateFileContent, theme } = useStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTool, setSelectedTool] = useState('select')
  const [brushSize, setBrushSize] = useState(10)
  const [brushColor, setBrushColor] = useState('#000000')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        setContext(ctx)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = brushColor
        ctx.lineWidth = brushSize
        
        // Initialize with white background
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        
        // Save initial state
        saveToHistory()
      }
    }
  }, [])

  useEffect(() => {
    if (context) {
      context.strokeStyle = brushColor
      context.lineWidth = brushSize
    }
  }, [brushColor, brushSize, context])

  const saveToHistory = () => {
    if (canvasRef.current && context) {
      const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(imageData)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const undo = () => {
    if (historyIndex > 0 && context && canvasRef.current) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      context.putImageData(history[newIndex], 0, 0)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1 && context && canvasRef.current) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      context.putImageData(history[newIndex], 0, 0)
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === 'draw' && context) {
      setIsDrawing(true)
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setLastX(x)
        setLastY(y)
        context.beginPath()
        context.moveTo(x, y)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedTool !== 'draw' || !context) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      context.lineTo(x, y)
      context.stroke()
    }
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      if (context) {
        context.closePath()
        saveToHistory()
      }
    }
  }

  const loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && canvasRef.current && context) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = canvasRef.current!
          canvas.width = Math.min(img.width, 800)
          canvas.height = Math.min(img.height, 600)
          
          const scaleX = canvas.width / img.width
          const scaleY = canvas.height / img.height
          const scale = Math.min(scaleX, scaleY)
          
          const newWidth = img.width * scale
          const newHeight = img.height * scale
          
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.drawImage(img, 0, 0, newWidth, newHeight)
          setCurrentImage(img)
          saveToHistory()
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const clearCanvas = () => {
    if (canvasRef.current && context) {
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      setCurrentImage(null)
      saveToHistory()
    }
  }

  const exportImage = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'edited-image.png'
      link.href = dataURL
      link.click()
    }
  }

  const applyFilter = (filterType: string) => {
    if (!canvasRef.current || !context) return
    
    const canvas = canvasRef.current
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    
    switch (filterType) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
          data[i] = avg
          data[i + 1] = avg
          data[i + 2] = avg
        }
        break
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189))
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168))
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131))
        }
        break
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i]
          data[i + 1] = 255 - data[i + 1]
          data[i + 2] = 255 - data[i + 2]
        }
        break
      case 'brightness':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] + 30)
          data[i + 1] = Math.min(255, data[i + 1] + 30)
          data[i + 2] = Math.min(255, data[i + 2] + 30)
        }
        break
      case 'contrast':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, ((data[i] - 128) * 1.5) + 128))
          data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] - 128) * 1.5) + 128))
          data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] - 128) * 1.5) + 128))
        }
        break
    }
    
    context.putImageData(imageData, 0, 0)
    saveToHistory()
  }

  const tools = [
    { id: 'select', icon: MousePointer, name: 'Select' },
    { id: 'draw', icon: Brush, name: 'Draw' },
    { id: 'eraser', icon: Eraser, name: 'Eraser' },
    { id: 'text', icon: Type, name: 'Text' },
    { id: 'rectangle', icon: Square, name: 'Rectangle' },
    { id: 'circle', icon: Circle, name: 'Circle' }
  ]

  const filters = [
    { id: 'grayscale', name: 'Grayscale' },
    { id: 'sepia', name: 'Sepia' },
    { id: 'invert', name: 'Invert' },
    { id: 'brightness', name: 'Brightness' },
    { id: 'contrast', name: 'Contrast' }
  ]

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000', '#800000'
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => document.getElementById('image-upload')?.click()}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Upload Image"
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={loadImage}
            className="hidden"
          />
          
          <button
            onClick={exportImage}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Download Image"
          >
            <Download className="w-5 h-5" />
          </button>
          
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2" />
          
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>
          
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>
          
          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Filters"
          >
            <Filter className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Color Picker"
          >
            <Palette className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Tool Panel */}
      <div className="flex">
        <div className="w-16 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === tool.id
                  ? 'bg-primary-600 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title={tool.name}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
        
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Settings Panel */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            {(selectedTool === 'draw' || selectedTool === 'eraser') && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Size:</span>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{brushSize}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Color:</span>
              <div
                className="w-8 h-8 rounded border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                style={{ backgroundColor: brushColor }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
            </div>
            
            {showColorPicker && (
              <div className="flex gap-1">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setBrushColor(color)
                      setShowColorPicker(false)
                    }}
                  />
                ))}
              </div>
            )}
            
            {showFilters && (
              <div className="flex gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => applyFilter(filter.id)}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-300 dark:border-gray-600 bg-white cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageEditor