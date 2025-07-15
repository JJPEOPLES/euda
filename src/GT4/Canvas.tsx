import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react';

// Import fabric.js without type checking to avoid TypeScript errors
declare const fabric: any;

interface GT4CanvasProps {
  width: number;
  height: number;
  tool: string;
  brushSize: number;
  brushOpacity: number;
  brushColor: string;
  currentLayer: number;
  layers: Array<{
    id: number;
    name: string;
    visible: boolean;
    locked: boolean;
  }>;
}

interface HistoryItem {
  objects: any[];
  backgroundImage: any | null;
}

const GT4Canvas = forwardRef<any, GT4CanvasProps>((props, ref) => {
  const { width, height, tool, brushSize, brushOpacity, brushColor, currentLayer, layers } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<any | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize the canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      // Load fabric.js dynamically
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
      script.onload = () => {
        const canvas = new (window as any).fabric.Canvas(canvasRef.current, {
          width,
          height,
          backgroundColor: '#ffffff',
          isDrawingMode: true,
          selection: true,
          preserveObjectStacking: true
        });

        // Set up the brush
        const brush = new (window as any).fabric.PencilBrush(canvas);
        brush.width = brushSize;
        brush.color = brushColor;
        brush.opacity = brushOpacity / 100;
        canvas.freeDrawingBrush = brush;

        // Set drawing mode based on tool
        canvas.isDrawingMode = tool === 'brush' || tool === 'eraser';
        
        if (tool === 'eraser') {
          canvas.freeDrawingBrush = new (window as any).fabric.EraserBrush(canvas);
          canvas.freeDrawingBrush.width = brushSize;
        }

        // Add event listeners
        canvas.on('path:created', () => {
          saveToHistory(canvas);
        });

        canvas.on('object:added', () => {
          saveToHistory(canvas);
        });

        canvas.on('object:removed', () => {
          saveToHistory(canvas);
        });

        fabricCanvasRef.current = canvas;
        
        // Save initial state
        saveToHistory(canvas);
      };
      document.head.appendChild(script);
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  // Update canvas when props change
  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      
      // Update brush settings
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = brushSize;
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.opacity = brushOpacity / 100;
      }
      
      // Update drawing mode based on tool
      canvas.isDrawingMode = tool === 'brush' || tool === 'eraser';
      
      if (tool === 'eraser') {
        canvas.freeDrawingBrush = new (window as any).fabric.EraserBrush(canvas);
        canvas.freeDrawingBrush.width = brushSize;
      } else if (tool === 'brush') {
        canvas.freeDrawingBrush = new (window as any).fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = brushSize;
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.opacity = brushOpacity / 100;
      }
      
      // Update canvas size
      canvas.setWidth(width);
      canvas.setHeight(height);
    }
  }, [width, height, tool, brushSize, brushOpacity, brushColor]);

  // Save canvas state to history
  const saveToHistory = (canvas: any) => {
    const state = {
      objects: canvas.getObjects(),
      backgroundImage: canvas.backgroundImage
    };
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(state);
      return newHistory;
    });
    
    setHistoryIndex(prev => prev + 1);
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    setBrushSize: (size: number) => {
      if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
        fabricCanvasRef.current.freeDrawingBrush.width = size;
      }
    },
    
    setBrushOpacity: (opacity: number) => {
      if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
        fabricCanvasRef.current.freeDrawingBrush.opacity = opacity;
      }
    },
    
    setBrushColor: (color: string) => {
      if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
        fabricCanvasRef.current.freeDrawingBrush.color = color;
      }
    },
    
    clearCanvas: () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.clear();
        fabricCanvasRef.current.backgroundColor = '#ffffff';
        fabricCanvasRef.current.renderAll();
        saveToHistory(fabricCanvasRef.current);
      }
    },
    
    undo: () => {
      if (historyIndex > 0 && fabricCanvasRef.current) {
        const newIndex = historyIndex - 1;
        const state = history[newIndex];
        
        fabricCanvasRef.current.clear();
        fabricCanvasRef.current.backgroundColor = '#ffffff';
        
        if (state.backgroundImage) {
          fabricCanvasRef.current.setBackgroundImage(state.backgroundImage, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current));
        }
        
        state.objects.forEach((obj: any) => {
          fabricCanvasRef.current.add(obj);
        });
        
        fabricCanvasRef.current.renderAll();
        setHistoryIndex(newIndex);
      }
    },
    
    redo: () => {
      if (historyIndex < history.length - 1 && fabricCanvasRef.current) {
        const newIndex = historyIndex + 1;
        const state = history[newIndex];
        
        fabricCanvasRef.current.clear();
        fabricCanvasRef.current.backgroundColor = '#ffffff';
        
        if (state.backgroundImage) {
          fabricCanvasRef.current.setBackgroundImage(state.backgroundImage, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current));
        }
        
        state.objects.forEach((obj: any) => {
          fabricCanvasRef.current.add(obj);
        });
        
        fabricCanvasRef.current.renderAll();
        setHistoryIndex(newIndex);
      }
    },
    
    saveImage: () => {
      if (fabricCanvasRef.current) {
        const dataURL = fabricCanvasRef.current.toDataURL({
          format: 'png',
          quality: 1
        });
        
        const link = document.createElement('a');
        link.download = `gt4-drawing-${Date.now()}.png`;
        link.href = dataURL;
        link.click();
      }
    },
    
    resizeCanvas: (newWidth: number, newHeight: number) => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.setWidth(newWidth);
        fabricCanvasRef.current.setHeight(newHeight);
        fabricCanvasRef.current.renderAll();
      }
    }
  }));

  return (
    <div className="gt4-canvas-container">
      <canvas
        ref={canvasRef}
        className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        style={{ display: 'block' }}
      />
      
      {/* GT4 Attribution */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        Powered by GT4 Drawing Engine • Visit{' '}
        <a 
          href="https://gt4.k2lang.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          gt4.k2lang.org
        </a>
      </div>
    </div>
  );
});

GT4Canvas.displayName = 'GT4Canvas';

export default GT4Canvas;