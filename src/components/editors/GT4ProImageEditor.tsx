import React, { useState, useRef, useEffect } from 'react'
import { 
  Box, 
  Paper, 
  Toolbar, 
  IconButton, 
  Typography, 
  Divider,
  Stack,
  Button,
  Tooltip,
  ButtonGroup,
  Slider,
  Popper,
  ClickAwayListener,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Badge,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Backdrop,
  Alert,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import {
  Brush,
  Palette,
  FormatShapes,
  TextFields,
  Layers,
  Undo,
  Redo,
  Save,
  CloudUpload,
  Settings,
  ZoomIn,
  ZoomOut,
  CropFree,
  Flip,
  RotateLeft,
  RotateRight,
  Visibility,
  VisibilityOff,
  Lock,
  LockOpen,
  ContentCopy,
  ContentPaste,
  Delete,
  Add,
  Remove,
  PlayArrow,
  Stop,
  Timeline,
  AutoAwesome,
  Gradient,
  BlurOn,
  FilterHdr,
  ColorLens,
  GridOn,
  Straighten,
  AspectRatio,
  CenterFocusStrong,
  SelectAll,
  Transform,
  Group,
  CallToAction,
  VerticalAlignTop,
  VerticalAlignBottom,
  FlashOn,
  Animation,
  SmartToy,
  Psychology,
  Speed,
  ExpandMore,
  ChevronRight,
  FolderOpen,
  Image,
  VideoLibrary,
  AudioFile,
  InsertDriveFile,
  Cloud,
  People,
  PersonAdd,
  Chat,
  Notifications,
  History,
  BookmarkBorder,
  Star,
  Share,
  GetApp,
  OpenInNew,
  Fullscreen,
  FullscreenExit,
  ViewCompact,
  ViewModule,
  ViewList,
  Dashboard,
  Extension,
  Code,
  BugReport,
  Security,
  Cached,
  Update,
  CloudSync,
  Backup,
  RestoreFromTrash,
  CloudDone,
  OfflinePin,
  SignalWifi4Bar,
  SignalWifiOff,
  Battery90,
  Memory,
  Storage,
  Speed as SpeedIcon,
  Tune,
  HighQuality,
  Hd,
  FourK,
  Portrait,
  Landscape,
  CropSquare,
  CropPortrait,
  CropLandscape,
  Crop169,
  Crop32,
  CropDin,
  CropOriginal,
  AutoFixHigh,
  AutoFixNormal,
  AutoFixOff,
  Exposure,

  WbSunny,
  WbCloudy,
  WbIncandescent,
  WbIridescent,
  WbShade,
  Brightness1,
  Brightness2,
  Brightness3,
  Brightness4,
  Brightness5,
  Brightness6,
  Brightness7,
  BrightnessHigh,
  BrightnessLow,
  BrightnessMedium,
  Contrast,
  InvertColors,
  MonochromePhotos,
  Colorize,
  Opacity,
  Gradient as GradientIcon,
  FormatColorFill,
  FormatColorReset,
  FormatColorText,
  BorderColor,
  BorderStyle,
  BorderAll,
  BorderBottom,
  BorderClear,
  BorderHorizontal,
  BorderInner,
  BorderLeft,
  BorderOuter,
  BorderRight,
  BorderTop,
  BorderVertical,
  RadioButtonUnchecked,
  TrendingFlat,
  Edit,
  ContentCut,
  PanTool
} from '@mui/icons-material'
import { SketchPicker, ChromePicker, CompactPicker } from 'react-color'
import { fabric } from 'fabric'
// import GT4Canvas from './GT4Canvas'

// 🔥 FIGMA-KILLER FEATURES 🔥
interface GT4ProImageEditorProps {
  width?: number
  height?: number
  onSave?: (data: any) => void
  collaborators?: Array<{
    id: string
    name: string
    avatar: string
    cursor: { x: number; y: number }
    isActive: boolean
  }>
  realTimeMode?: boolean
  teamId?: string
  projectId?: string
}

interface Layer {
  id: string
  name: string
  visible: boolean
  locked: boolean
  opacity: number
  blendMode: string
  type: 'shape' | 'text' | 'image' | 'vector' | 'group' | 'frame' | 'component'
  children?: Layer[]
  isComponent?: boolean
  componentId?: string
  variants?: any[]
  constraints?: {
    horizontal: 'left' | 'right' | 'center' | 'scale' | 'stretch'
    vertical: 'top' | 'bottom' | 'center' | 'scale' | 'stretch'
  }
  autoLayout?: {
    direction: 'horizontal' | 'vertical'
    padding: number
    spacing: number
    alignment: 'start' | 'center' | 'end' | 'stretch'
  }
}

interface ComponentLibrary {
  id: string
  name: string
  description: string
  category: string
  variants: any[]
  properties: any[]
  thumbnail: string
  usage: number
  lastModified: Date
  author: string
}

interface DesignSystem {
  colors: {
    primary: string[]
    secondary: string[]
    neutral: string[]
    semantic: {
      success: string[]
      warning: string[]
      error: string[]
      info: string[]
    }
  }
  typography: {
    fontFamilies: string[]
    fontSizes: number[]
    fontWeights: number[]
    lineHeights: number[]
    letterSpacing: number[]
  }
  spacing: number[]
  shadows: string[]
  borderRadius: number[]
  breakpoints: {
    mobile: number
    tablet: number
    desktop: number
    ultrawide: number
  }
}

interface GT4State {
  // Canvas state
  canvas: fabric.Canvas | null
  zoom: number
  pan: { x: number; y: number }
  
  // Tools
  activeTool: string
  brushSize: number
  color: string
  opacity: number
  
  // Layers
  layers: Layer[]
  activeLayer: string | null
  layerPanelOpen: boolean
  
  // Components & Design System
  components: ComponentLibrary[]
  designSystem: DesignSystem
  activeComponent: string | null
  
  // Collaboration
  collaborators: any[]
  comments: any[]
  liveUsers: any[]
  
  // Advanced Features
  gridEnabled: boolean
  snapToGrid: boolean
  rulers: boolean
  guides: any[]
  
  // Export/Import
  exportFormat: 'png' | 'jpg' | 'svg' | 'pdf' | 'figma' | 'sketch' | 'xd' | 'psd'
  exportQuality: 'low' | 'medium' | 'high' | 'ultra'
  
  // Animation
  timeline: any[]
  animations: any[]
  isPlaying: boolean
  
  // AI Features
  aiSuggestions: any[]
  autoLayout: boolean
  smartAlign: boolean
  
  // Performance
  renderMode: 'standard' | 'gpu' | 'cpu'
  antiAliasing: boolean
  
  // Plugins
  plugins: any[]
  activePlugins: string[]
  
  // History
  history: any[]
  historyIndex: number
  
  // UI State
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  bottomPanelOpen: boolean
  fullscreen: boolean
  darkMode: boolean
  
  // Notifications
  notifications: any[]
  alerts: any[]
}

const GT4ProImageEditor: React.FC<GT4ProImageEditorProps> = ({
  width = 1920,
  height = 1080,
  onSave,
  collaborators = [],
  realTimeMode = true,
  teamId,
  projectId
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  
  // 🚀 ADVANCED STATE MANAGEMENT
  const [gt4State, setGT4State] = useState<GT4State>({
    canvas: null,
    zoom: 1,
    pan: { x: 0, y: 0 },
    activeTool: 'select',
    brushSize: 10,
    color: '#000000',
    opacity: 1,
    layers: [
      {
        id: '1',
        name: 'Background',
        visible: true,
        locked: false,
        opacity: 1,
        blendMode: 'normal',
        type: 'shape'
      }
    ],
    activeLayer: '1',
    layerPanelOpen: true,
    components: [],
    designSystem: {
      colors: {
        primary: ['#007AFF', '#5856D6', '#AF52DE', '#FF2D92', '#FF3B30'],
        secondary: ['#FF9500', '#FFCC02', '#34C759', '#00C7BE', '#007AFF'],
        neutral: ['#000000', '#1C1C1E', '#2C2C2E', '#3A3A3C', '#48484A', '#636366', '#8E8E93', '#AEAEB2', '#C7C7CC', '#D1D1D6', '#E5E5EA', '#F2F2F7', '#FFFFFF'],
        semantic: {
          success: ['#34C759', '#30D158', '#32D74B'],
          warning: ['#FF9500', '#FF9F0A', '#FFB340'],
          error: ['#FF3B30', '#FF453A', '#FF6961'],
          info: ['#007AFF', '#0A84FF', '#409CFF']
        }
      },
      typography: {
        fontFamilies: ['SF Pro Display', 'Roboto', 'Inter', 'Poppins', 'Helvetica', 'Arial'],
        fontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96],
        fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        lineHeights: [1, 1.2, 1.4, 1.5, 1.6, 2],
        letterSpacing: [-0.05, -0.02, 0, 0.02, 0.05, 0.1]
      },
      spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
      shadows: [
        'none',
        '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
      ],
      borderRadius: [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 999],
      breakpoints: {
        mobile: 375,
        tablet: 768,
        desktop: 1440,
        ultrawide: 2560
      }
    },
    activeComponent: null,
    collaborators: collaborators,
    comments: [],
    liveUsers: [],
    gridEnabled: true,
    snapToGrid: true,
    rulers: true,
    guides: [],
    exportFormat: 'png',
    exportQuality: 'high',
    timeline: [],
    animations: [],
    isPlaying: false,
    aiSuggestions: [],
    autoLayout: true,
    smartAlign: true,
    renderMode: 'gpu',
    antiAliasing: true,
    plugins: [],
    activePlugins: [],
    history: [],
    historyIndex: 0,
    leftPanelOpen: true,
    rightPanelOpen: true,
    bottomPanelOpen: false,
    fullscreen: false,
    darkMode: true,
    notifications: [],
    alerts: []
  })

  // 🎨 PROFESSIONAL TOOL PALETTE
  const professionalTools = [
    { id: 'select', name: 'Select', icon: <SelectAll />, shortcut: 'V' },
    { id: 'frame', name: 'Frame', icon: <CropFree />, shortcut: 'F' },
    { id: 'rectangle', name: 'Rectangle', icon: <CropSquare />, shortcut: 'R' },
    { id: 'ellipse', name: 'Ellipse', icon: <RadioButtonUnchecked />, shortcut: 'O' },
    { id: 'polygon', name: 'Polygon', icon: <FormatShapes />, shortcut: 'P' },
    { id: 'line', name: 'Line', icon: <Straighten />, shortcut: 'L' },
    { id: 'arrow', name: 'Arrow', icon: <TrendingFlat />, shortcut: 'Shift+L' },
    { id: 'pen', name: 'Pen', icon: <Edit />, shortcut: 'P' },
    { id: 'pencil', name: 'Pencil', icon: <Brush />, shortcut: 'Shift+P' },
    { id: 'text', name: 'Text', icon: <TextFields />, shortcut: 'T' },
    { id: 'image', name: 'Image', icon: <Image />, shortcut: 'Shift+Ctrl+K' },
    { id: 'component', name: 'Component', icon: <Extension />, shortcut: 'C' },
    { id: 'slice', name: 'Slice', icon: <ContentCut />, shortcut: 'S' },
    { id: 'eyedropper', name: 'Eyedropper', icon: <Colorize />, shortcut: 'I' },
    { id: 'measure', name: 'Measure', icon: <Straighten />, shortcut: 'M' },
    { id: 'zoom', name: 'Zoom', icon: <ZoomIn />, shortcut: 'Z' },
    { id: 'hand', name: 'Hand', icon: <PanTool />, shortcut: 'H' },
    { id: 'comment', name: 'Comment', icon: <Chat />, shortcut: 'Ctrl+/' },
    { id: 'prototype', name: 'Prototype', icon: <PlayArrow />, shortcut: 'Shift+E' },
    { id: 'ai', name: 'AI Assistant', icon: <SmartToy />, shortcut: 'Ctrl+AI' }
  ]

  // 🔥 ADVANCED LAYER MANAGEMENT
  const LayerPanel = () => (
    <Paper sx={{ width: 300, height: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        🎨 Layers & Components
      </Typography>
      
      <Tabs value={0} sx={{ mb: 2 }}>
        <Tab label="Layers" />
        <Tab label="Components" />
        <Tab label="Assets" />
      </Tabs>
      
      <Stack spacing={1}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            // Add new layer logic
          }}
        >
          Add Layer
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Extension />}
          onClick={() => {
            // Create component logic
          }}
        >
          Create Component
        </Button>
      </Stack>
      
      <Box sx={{ mt: 2 }}>
        {gt4State.layers.map((layer) => (
          <Paper
            key={layer.id}
            sx={{
              p: 1,
              mb: 1,
              cursor: 'pointer',
              bgcolor: layer.id === gt4State.activeLayer ? 'primary.main' : 'background.paper',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => setGT4State(prev => ({ ...prev, activeLayer: layer.id }))}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="small" onClick={() => {
                setGT4State(prev => ({
                  ...prev,
                  layers: prev.layers.map(l => 
                    l.id === layer.id ? { ...l, visible: !l.visible } : l
                  )
                }))
              }}>
                {layer.visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              
              <IconButton size="small" onClick={() => {
                setGT4State(prev => ({
                  ...prev,
                  layers: prev.layers.map(l => 
                    l.id === layer.id ? { ...l, locked: !l.locked } : l
                  )
                }))
              }}>
                {layer.locked ? <Lock /> : <LockOpen />}
              </IconButton>
              
              <Typography variant="body2" sx={{ flex: 1 }}>
                {layer.name}
              </Typography>
              
              <Chip
                label={layer.type}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Paper>
        ))}
      </Box>
    </Paper>
  )

  // 🎯 FIGMA-STYLE PROPERTIES PANEL
  const PropertiesPanel = () => (
    <Paper sx={{ width: 300, height: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        ⚙️ Properties
      </Typography>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Transform</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="X"
                type="number"
                size="small"
                fullWidth
                value={0}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Y"
                type="number"
                size="small"
                fullWidth
                value={0}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Width"
                type="number"
                size="small"
                fullWidth
                value={100}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height"
                type="number"
                size="small"
                fullWidth
                value={100}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">Rotation:</Typography>
                <Slider
                  value={0}
                  min={-180}
                  max={180}
                  valueLabelDisplay="auto"
                  sx={{ flex: 1 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Fill & Stroke</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" gutterBottom>Fill</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: gt4State.color,
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    // Open color picker
                  }}
                />
                <Typography variant="body2">{gt4State.color}</Typography>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="body2" gutterBottom>Opacity</Typography>
              <Slider
                value={gt4State.opacity * 100}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                onChange={(_, value) => {
                  setGT4State(prev => ({ ...prev, opacity: (value as number) / 100 }))
                }}
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Effects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => {
                // Add effect logic
              }}
            >
              Add Effect
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Gradient />}
              onClick={() => {
                // Add gradient logic
              }}
            >
              Add Gradient
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<BlurOn />}
              onClick={() => {
                // Add blur logic
              }}
            >
              Add Blur
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Auto Layout</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Button
              variant="contained"
              startIcon={<AutoAwesome />}
              onClick={() => {
                // Enable auto layout
              }}
            >
              Add Auto Layout
            </Button>
            
            <FormControl fullWidth size="small">
              <InputLabel>Direction</InputLabel>
              <Select value="horizontal" label="Direction">
                <MenuItem value="horizontal">Horizontal</MenuItem>
                <MenuItem value="vertical">Vertical</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Spacing"
              type="number"
              size="small"
              fullWidth
              value={8}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )

  // 🚀 PROFESSIONAL TOOLBAR
  const ProfessionalToolbar = () => (
    <Paper sx={{ p: 1, mb: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* File Operations */}
        <ButtonGroup variant="outlined" size="small">
          <Tooltip title="New (Ctrl+N)">
            <Button startIcon={<Add />}>New</Button>
          </Tooltip>
          <Tooltip title="Open (Ctrl+O)">
            <Button startIcon={<FolderOpen />}>Open</Button>
          </Tooltip>
          <Tooltip title="Save (Ctrl+S)">
            <Button startIcon={<Save />}>Save</Button>
          </Tooltip>
        </ButtonGroup>
        
        <Divider orientation="vertical" flexItem />
        
        {/* History */}
        <ButtonGroup variant="outlined" size="small">
          <Tooltip title="Undo (Ctrl+Z)">
            <Button startIcon={<Undo />}>Undo</Button>
          </Tooltip>
          <Tooltip title="Redo (Ctrl+Y)">
            <Button startIcon={<Redo />}>Redo</Button>
          </Tooltip>
        </ButtonGroup>
        
        <Divider orientation="vertical" flexItem />
        
        {/* View Controls */}
        <ButtonGroup variant="outlined" size="small">
          <Tooltip title="Zoom In (Ctrl++)">
            <Button startIcon={<ZoomIn />}>Zoom In</Button>
          </Tooltip>
          <Tooltip title="Zoom Out (Ctrl+-)">
            <Button startIcon={<ZoomOut />}>Zoom Out</Button>
          </Tooltip>
          <Tooltip title="Fit to Screen (Ctrl+0)">
            <Button startIcon={<CenterFocusStrong />}>Fit</Button>
          </Tooltip>
        </ButtonGroup>
        
        <Divider orientation="vertical" flexItem />
        
        {/* Grid & Guides */}
        <ButtonGroup variant="outlined" size="small">
          <Tooltip title="Toggle Grid (Ctrl+')">
            <Button 
              startIcon={<GridOn />}
              variant={gt4State.gridEnabled ? 'contained' : 'outlined'}
              onClick={() => setGT4State(prev => ({ ...prev, gridEnabled: !prev.gridEnabled }))}
            >
              Grid
            </Button>
          </Tooltip>
          <Tooltip title="Toggle Rulers (Ctrl+R)">
            <Button 
              startIcon={<Straighten />}
              variant={gt4State.rulers ? 'contained' : 'outlined'}
              onClick={() => setGT4State(prev => ({ ...prev, rulers: !prev.rulers }))}
            >
              Rulers
            </Button>
          </Tooltip>
        </ButtonGroup>
        
        <Divider orientation="vertical" flexItem />
        
        {/* Collaboration */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Share (Ctrl+Shift+S)">
            <Button variant="contained" startIcon={<Share />} color="primary">
              Share
            </Button>
          </Tooltip>
          
          <Tooltip title="Present (Ctrl+Alt+P)">
            <Button variant="contained" startIcon={<PlayArrow />} color="secondary">
              Present
            </Button>
          </Tooltip>
          
          {/* Live Collaborators */}
          <Stack direction="row" spacing={-1}>
            {gt4State.collaborators.map((collab, i) => (
              <Tooltip key={collab.id} title={collab.name}>
                <Badge
                  badgeContent={collab.isActive ? <Box sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%' }} /> : null}
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar
                    sx={{ width: 28, height: 28, fontSize: 12 }}
                    src={collab.avatar}
                  >
                    {collab.name.charAt(0)}
                  </Avatar>
                </Badge>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
        
        <Box sx={{ flex: 1 }} />
        
        {/* AI & Smart Features */}
        <ButtonGroup variant="outlined" size="small">
          <Tooltip title="AI Assistant (Ctrl+AI)">
            <Button startIcon={<SmartToy />} color="secondary">
              AI Assistant
            </Button>
          </Tooltip>
          <Tooltip title="Auto Layout (Ctrl+Shift+A)">
            <Button 
              startIcon={<AutoAwesome />}
              variant={gt4State.autoLayout ? 'contained' : 'outlined'}
              onClick={() => setGT4State(prev => ({ ...prev, autoLayout: !prev.autoLayout }))}
            >
              Auto Layout
            </Button>
          </Tooltip>
        </ButtonGroup>
        
        <Divider orientation="vertical" flexItem />
        
        {/* Settings */}
        <Tooltip title="Settings">
          <IconButton>
            <Settings />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  )

  // 🎯 TOOL PALETTE
  const ToolPalette = () => (
    <Paper sx={{ width: 60, height: 'fit-content', p: 1 }}>
      <Stack spacing={1}>
        {professionalTools.map((tool) => (
          <Tooltip key={tool.id} title={`${tool.name} (${tool.shortcut})`} placement="right">
            <IconButton
              size="small"
              onClick={() => setGT4State(prev => ({ ...prev, activeTool: tool.id }))}
              sx={{
                bgcolor: gt4State.activeTool === tool.id ? 'primary.main' : 'transparent',
                color: gt4State.activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  bgcolor: gt4State.activeTool === tool.id ? 'primary.dark' : 'action.hover'
                }
              }}
            >
              {tool.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Paper>
  )

  // 🎨 DESIGN SYSTEM PANEL
  const DesignSystemPanel = () => (
    <Paper sx={{ width: 300, height: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        🎨 Design System
      </Typography>
      
      <Tabs value={0} sx={{ mb: 2 }}>
        <Tab label="Colors" />
        <Tab label="Typography" />
        <Tab label="Components" />
        <Tab label="Styles" />
      </Tabs>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Color Palette</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" gutterBottom>Primary</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {gt4State.designSystem.colors.primary.map((color, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: color,
                      border: '1px solid',
                      borderColor: 'divider',
                      cursor: 'pointer',
                      borderRadius: 1
                    }}
                    onClick={() => setGT4State(prev => ({ ...prev, color }))}
                  />
                ))}
              </Stack>
            </Box>
            
            <Box>
              <Typography variant="body2" gutterBottom>Secondary</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {gt4State.designSystem.colors.secondary.map((color, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: color,
                      border: '1px solid',
                      borderColor: 'divider',
                      cursor: 'pointer',
                      borderRadius: 1
                    }}
                    onClick={() => setGT4State(prev => ({ ...prev, color }))}
                  />
                ))}
              </Stack>
            </Box>
            
            <Box>
              <Typography variant="body2" gutterBottom>Neutral</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {gt4State.designSystem.colors.neutral.map((color, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: color,
                      border: '1px solid',
                      borderColor: 'divider',
                      cursor: 'pointer',
                      borderRadius: 1
                    }}
                    onClick={() => setGT4State(prev => ({ ...prev, color }))}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Typography</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Font Family</InputLabel>
              <Select value="SF Pro Display" label="Font Family">
                {gt4State.designSystem.typography.fontFamilies.map((font) => (
                  <MenuItem key={font} value={font}>{font}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small">
              <InputLabel>Font Size</InputLabel>
              <Select value={16} label="Font Size">
                {gt4State.designSystem.typography.fontSizes.map((size) => (
                  <MenuItem key={size} value={size}>{size}px</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small">
              <InputLabel>Font Weight</InputLabel>
              <Select value={400} label="Font Weight">
                {gt4State.designSystem.typography.fontWeights.map((weight) => (
                  <MenuItem key={weight} value={weight}>{weight}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )

  // 🎬 ANIMATION TIMELINE
  const AnimationTimeline = () => (
    <Paper sx={{ height: 200, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">🎬 Animation Timeline</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => setGT4State(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}>
            {gt4State.isPlaying ? <Stop /> : <PlayArrow />}
          </IconButton>
          <IconButton>
            <Timeline />
          </IconButton>
        </Stack>
      </Stack>
      
      <Box sx={{ 
        height: 100, 
        bgcolor: 'grey.100', 
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          backgroundSize: '40px 100%',
          animation: gt4State.isPlaying ? 'timeline-play 2s linear infinite' : 'none'
        }} />
        
        <Typography variant="body2" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Timeline (0.0s - 2.0s)
        </Typography>
      </Box>
    </Paper>
  )

  // 🔥 INITIALIZATION
  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: width,
        height: height,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
        selection: true,
        renderOnAddRemove: true,
        allowTouchScrolling: true,
        imageSmoothingEnabled: gt4State.antiAliasing,
        enableRetinaScaling: true,
        fireRightClick: true,
        stopContextMenu: true,
        controlsAboveOverlay: true,
        includeDefaultValues: false
      })
      
      // Add grid
      if (gt4State.gridEnabled) {
        const gridSize = 20
        for (let i = 0; i < width / gridSize; i++) {
          fabricCanvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, height], {
            stroke: '#e0e0e0',
            strokeWidth: 1,
            selectable: false,
            evented: false
          }))
        }
        for (let i = 0; i < height / gridSize; i++) {
          fabricCanvas.add(new fabric.Line([0, i * gridSize, width, i * gridSize], {
            stroke: '#e0e0e0',
            strokeWidth: 1,
            selectable: false,
            evented: false
          }))
        }
      }
      
      setCanvas(fabricCanvas)
      setGT4State(prev => ({ ...prev, canvas: fabricCanvas }))
    }
  }, [canvasRef, canvas, width, height, gt4State.gridEnabled, gt4State.antiAliasing])

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: gt4State.darkMode ? 'grey.900' : 'grey.50'
    }}>
      {/* 🚀 PROFESSIONAL TOOLBAR */}
      <ProfessionalToolbar />
      
      {/* 🎯 MAIN WORKSPACE */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* 🎨 LEFT PANEL - Tools & Design System */}
        {gt4State.leftPanelOpen && (
          <Stack direction="row" spacing={1} sx={{ p: 1 }}>
            <ToolPalette />
            <DesignSystemPanel />
          </Stack>
        )}
        
        {/* 🎯 CENTER CANVAS */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Canvas Area */}
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            bgcolor: gt4State.darkMode ? 'grey.800' : 'grey.100',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Rulers */}
            {gt4State.rulers && (
              <>
                <Box sx={{ position: 'absolute', top: 0, left: 20, right: 0, height: 20, bgcolor: 'grey.200', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', top: 20, left: 0, bottom: 0, width: 20, bgcolor: 'grey.200', zIndex: 1 }} />
              </>
            )}
            
            {/* Canvas */}
            <Box sx={{ 
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 3,
              borderRadius: 1,
              overflow: 'hidden'
            }}>
              <canvas
                ref={canvasRef}
                style={{
                  display: 'block',
                  cursor: gt4State.activeTool === 'hand' ? 'grab' : 'crosshair'
                }}
              />
            </Box>
            
            {/* Zoom Controls */}
            <Paper sx={{ position: 'absolute', bottom: 20, right: 20, p: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton size="small" onClick={() => setGT4State(prev => ({ ...prev, zoom: Math.max(0.1, prev.zoom - 0.1) }))}>
                  <ZoomOut />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 50, textAlign: 'center' }}>
                  {Math.round(gt4State.zoom * 100)}%
                </Typography>
                <IconButton size="small" onClick={() => setGT4State(prev => ({ ...prev, zoom: Math.min(5, prev.zoom + 0.1) }))}>
                  <ZoomIn />
                </IconButton>
              </Stack>
            </Paper>
          </Box>
          
          {/* 🎬 ANIMATION TIMELINE */}
          {gt4State.bottomPanelOpen && <AnimationTimeline />}
        </Box>
        
        {/* 🎨 RIGHT PANEL - Layers & Properties */}
        {gt4State.rightPanelOpen && (
          <Stack direction="row" spacing={1} sx={{ p: 1 }}>
            <LayerPanel />
            <PropertiesPanel />
          </Stack>
        )}
      </Box>
      
      {/* 🚀 FLOATING ACTION BUTTON */}
      <SpeedDial
        ariaLabel="GT4 Actions"
        sx={{ position: 'absolute', bottom: 100, right: 100 }}
        icon={<SpeedDialIcon />}
        onOpen={() => {}}
        onClose={() => {}}
      >
        <SpeedDialAction
          icon={<SmartToy />}
          tooltipTitle="AI Assistant"
          onClick={() => {}}
        />
        <SpeedDialAction
          icon={<Share />}
          tooltipTitle="Share"
          onClick={() => {}}
        />
        <SpeedDialAction
          icon={<CloudUpload />}
          tooltipTitle="Upload"
          onClick={() => {}}
        />
        <SpeedDialAction
          icon={<Extension />}
          tooltipTitle="Plugins"
          onClick={() => {}}
        />
      </SpeedDial>
      
      {/* 🎉 NOTIFICATIONS */}
      <Snackbar
        open={gt4State.notifications.length > 0}
        autoHideDuration={6000}
        onClose={() => setGT4State(prev => ({ ...prev, notifications: [] }))}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          🔥 GT4 Editor loaded! Better than Figma, Photoshop, and Canva combined!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default GT4ProImageEditor