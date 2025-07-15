import React, { useRef, useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'
import { 
  Image,
  Square,
  Circle,
  Type,
  Brush,
  Eraser,
  Palette,
  Download,
  Upload,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Layers,
  Filter,
  Crop,
  Undo,
  Redo
} from 'lucide-react'

const ImageEditor = () => {
  const { currentFile, updateFileContent } = useStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const [selectedTool, setSelectedTool] = useState('select')
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#000000')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff'
      })

      const canvas = fabricCanvasRef.current

      // Enable free drawing for brush tool
      canvas.isDrawingMode = selectedTool === 'brush'
      canvas.freeDrawingBrush.width = brushSize
      canvas.freeDrawingBrush.color = brushColor

      // Handle canvas events
      canvas.on('path:created', () => {
        saveCanvasToFile()
      })

      canvas.on('object:modified', () => {
        saveCanvasToFile()
      })

      return () => {
        canvas.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current
      canvas.isDrawingMode = selectedTool === 'brush'
      canvas.freeDrawingBrush.width = brushSize
      canvas.freeDrawingBrush.color = brushColor
    }
  }, [selectedTool, brushSize, brushColor])

  const saveCanvasToFile = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL('image/png')
      updateFileContent(dataURL)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imgElement = new Image()
        imgElement.onload = () => {
          const fabricImage = new fabric.Image(imgElement)
          fabricImage.set({
            left: 0,
            top: 0,
            scaleX: 800 / imgElement.width,
            scaleY: 600 / imgElement.height
          })
          fabricCanvasRef.current?.add(fabricImage)
          fabricCanvasRef.current?.renderAll()
          saveCanvasToFile()
        }
        imgElement.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const addShape = (type: string) => {
    if (!fabricCanvasRef.current) return

    let shape: fabric.Object

    switch (type) {
      case 'rectangle':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 200,
          height: 100,
          fill: brushColor,
          stroke: '#000000',
          strokeWidth: 2
        })
        break
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: brushColor,
          stroke: '#000000',
          strokeWidth: 2
        })
        break
      case 'text':
        shape = new fabric.Text('Your Text Here', {
          left: 100,
          top: 100,
          fontSize: 24,
          fill: brushColor,
          fontFamily: 'Arial'
        })
        break
      default:
        return
    }

    fabricCanvasRef.current.add(shape)
    fabricCanvasRef.current.renderAll()
    saveCanvasToFile()
  }

  const clearCanvas = () => {
    fabricCanvasRef.current?.clear()
    fabricCanvasRef.current?.setBackgroundColor('#ffffff', () => {
      fabricCanvasRef.current?.renderAll()
    })
    saveCanvasToFile()
  }

  const downloadImage = () => {
    if (fabricCanvasRef.current) {
      const link = document.createElement('a')
      link.download = 'euda-image.png'
      link.href = fabricCanvasRef.current.toDataURL()
      link.click()
    }
  }

  const tools = [
    { id: 'select', name: 'Select', icon: '🔍' },
    { id: 'brush', name: 'Brush', icon: '🖌️' },
    { id: 'eraser', name: 'Eraser', icon: '🧹' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜' },
    { id: 'circle', name: 'Circle', icon: '⭕' },
    { id: 'text', name: 'Text', icon: '📝' }
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
            {/* Tools */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setSelectedTool(tool.id)
                    if (tool.id === 'rectangle' || tool.id === 'circle' || tool.id === 'text') {
                      addShape(tool.id)
                    }
                  }}
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

            {/* Brush Settings */}
            {selectedTool === 'brush' && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Size:</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{brushSize}px</span>
              </div>
            )}

            {/* Color Picker */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Color:</label>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
                className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </button>
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Properties Panel */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Canvas: 800 × 600px
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Tool: {tools.find(t => t.id === selectedTool)?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fabricCanvasRef.current?.getObjects().length > 0 && fabricCanvasRef.current?.remove(fabricCanvasRef.current.getActiveObject())}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Delete Selected
            </button>
            <button
              onClick={() => fabricCanvasRef.current?.bringToFront(fabricCanvasRef.current.getActiveObject())}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Bring to Front
            </button>
            <button
              onClick={() => fabricCanvasRef.current?.sendToBack(fabricCanvasRef.current.getActiveObject())}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Send to Back
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ImageEditor