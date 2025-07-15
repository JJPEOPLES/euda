import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { 
  Brush, 
  Eraser, 
  Type, 
  Square, 
  Circle, 
  Undo, 
  Redo, 
  Save, 
  Upload, 
  Download, 
  Trash2, 
  Layers, 
  Palette, 
  Settings, 
  ZoomIn, 
  ZoomOut,
  MousePointer,
  RotateCcw,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Plus,
  Minus,
  Heart
} from 'lucide-react';

// Import GT4 Canvas component
import GT4Canvas from '../../GT4/Canvas';

interface Layer {
  id: number;
  name: string;
  visible: boolean;
  locked: boolean;
}

const GT4ImageEditor = () => {
  const { theme } = useStore();
  const canvasRef = useRef<any>(null);
  
  // Tool state
  const [selectedTool, setSelectedTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(10);
  const [brushOpacity, setBrushOpacity] = useState(100);
  const [brushColor, setBrushColor] = useState('#000000');
  
  // Layer state
  const [layers, setLayers] = useState<Layer[]>([
    { id: 1, name: 'Background', visible: true, locked: false }
  ]);
  const [currentLayer, setCurrentLayer] = useState(1);
  
  // UI state
  const [showLayers, setShowLayers] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [zoom, setZoom] = useState(100);

  // Handle brush size change
  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    if (canvasRef.current) {
      canvasRef.current.setBrushSize(size);
    }
  };

  // Handle brush opacity change
  const handleBrushOpacityChange = (opacity: number) => {
    setBrushOpacity(opacity);
    if (canvasRef.current) {
      canvasRef.current.setBrushOpacity(opacity / 100);
    }
  };

  // Handle color change
  const handleColorChange = (color: string) => {
    setBrushColor(color);
    if (canvasRef.current) {
      canvasRef.current.setBrushColor(color);
    }
  };

  // Handle layer operations
  const handleAddLayer = () => {
    const newLayerId = layers.length + 1;
    const newLayer = {
      id: newLayerId,
      name: `Layer ${newLayerId}`,
      visible: true,
      locked: false
    };
    setLayers([...layers, newLayer]);
    setCurrentLayer(newLayerId);
  };

  const handleLayerVisibilityChange = (layerId: number, visible: boolean) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible } : layer
    ));
  };

  const handleLayerLockChange = (layerId: number, locked: boolean) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, locked } : layer
    ));
  };

  const handleLayerDelete = (layerId: number) => {
    if (layers.length > 1) {
      const newLayers = layers.filter(layer => layer.id !== layerId);
      setLayers(newLayers);
      if (currentLayer === layerId) {
        setCurrentLayer(newLayers[0].id);
      }
    }
  };

  // Canvas operations
  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      canvasRef.current.saveImage();
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 500));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const tools = [
    { id: 'select', icon: MousePointer, name: 'Select' },
    { id: 'brush', icon: Brush, name: 'Brush' },
    { id: 'eraser', icon: Eraser, name: 'Eraser' },
    { id: 'text', icon: Type, name: 'Text' },
    { id: 'rectangle', icon: Square, name: 'Rectangle' },
    { id: 'circle', icon: Circle, name: 'Circle' }
  ];

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
    '#808080', '#000080', '#008000', '#800000', '#FFB6C1', '#87CEEB'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col bg-white dark:bg-gray-900"
    >
      {/* Header with GT4 branding */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 fill-current" />
          <div>
            <h1 className="text-lg font-bold">GT4 Drawing Engine</h1>
            <p className="text-sm opacity-90">Powered by gt4.k2lang.org</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open('https://gt4.k2lang.org', '_blank')}
            className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm"
          >
            Visit GT4
          </button>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
            className="hidden"
          />
          
          <button
            onClick={handleSave}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Save Image"
          >
            <Save className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSave}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Download Image"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleRedo}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleClear}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`p-2 rounded-lg transition-colors ${
              showLayers ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title="Layers"
          >
            <Layers className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`p-2 rounded-lg transition-colors ${
              showColorPicker ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title="Color Picker"
          >
            <Palette className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${
              showSettings ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <span className="text-sm font-medium min-w-[50px] text-center">
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center py-4 gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-3 rounded-lg transition-colors ${
                  selectedTool === tool.id
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title={tool.name}
              >
                <tool.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative">
          {/* Settings Panel */}
          {showSettings && (
            <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-4">Canvas Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Width</label>
                  <input
                    type="number"
                    value={canvasWidth}
                    onChange={(e) => setCanvasWidth(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height</label>
                  <input
                    type="number"
                    value={canvasHeight}
                    onChange={(e) => setCanvasHeight(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Color Picker Panel */}
          {showColorPicker && (
            <div className="absolute top-4 left-20 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-4">Colors</h3>
              <div className="grid grid-cols-6 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${
                      brushColor === color ? 'border-gray-400' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Custom Color</label>
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          )}

          {/* Tool Settings */}
          <div className="absolute bottom-4 left-20 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Size:</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={brushSize}
                  onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {brushSize}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Opacity:</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={brushOpacity}
                  onChange={(e) => handleBrushOpacityChange(parseInt(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {brushOpacity}%
                </span>
              </div>
            </div>
          </div>

          {/* GT4 Canvas */}
          <div className="flex items-center justify-center h-full p-4 bg-gray-100 dark:bg-gray-800">
            <div 
              className="bg-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center'
              }}
            >
              <GT4Canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                tool={selectedTool}
                brushSize={brushSize}
                brushOpacity={brushOpacity}
                brushColor={brushColor}
                currentLayer={currentLayer}
                layers={layers}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Layers */}
        {showLayers && (
          <div className="w-64 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Layers</h3>
                <button
                  onClick={handleAddLayer}
                  className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Add Layer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentLayer === layer.id
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                    onClick={() => setCurrentLayer(layer.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{layer.name}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLayerVisibilityChange(layer.id, !layer.visible);
                          }}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                        >
                          {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLayerLockChange(layer.id, !layer.locked);
                          }}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          title={layer.locked ? 'Unlock Layer' : 'Lock Layer'}
                        >
                          {layer.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </button>
                        
                        {layers.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLayerDelete(layer.id);
                            }}
                            className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-900 transition-colors text-red-600"
                            title="Delete Layer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GT4ImageEditor;