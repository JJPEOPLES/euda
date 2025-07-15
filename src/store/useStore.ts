import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type EditorType = 'text' | 'image' | 'video' | 'audio' | 'document'

interface FileState {
  id: string
  path?: string
  name: string
  content: string
  isModified: boolean
  type: EditorType
  size?: number
  lastModified?: Date
}

interface AppState {
  // Current editor
  activeEditor: EditorType
  
  // File management
  currentFile: FileState | null
  openFiles: FileState[]
  recentFiles: string[]
  
  // UI state
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  isLoading: boolean
  
  // Actions
  setActiveEditor: (editor: EditorType) => void
  setCurrentFile: (file: FileState | null) => void
  updateFileContent: (content: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  addRecentFile: (path: string) => void
  newFile: (type: EditorType) => void
  openFile: (file: FileState) => void
  closeFile: (fileId: string) => void
  markFileModified: (fileId: string, modified: boolean) => void
  setLoading: (loading: boolean) => void
  saveFile: (fileId: string, content: string) => void
}

const generateFileId = () => Math.random().toString(36).substr(2, 9)

const createNewFile = (type: EditorType): FileState => ({
  id: generateFileId(),
  name: `Untitled.${getDefaultExtension(type)}`,
  content: getDefaultContent(type),
  isModified: false,
  type,
  lastModified: new Date(),
})

const getDefaultExtension = (type: EditorType): string => {
  switch (type) {
    case 'text': return 'txt'
    case 'image': return 'png'
    case 'video': return 'mp4'
    case 'audio': return 'mp3'
    case 'document': return 'doc'
    default: return 'txt'
  }
}

const getDefaultContent = (type: EditorType): string => {
  switch (type) {
    case 'text': return '// Welcome to Euda Text Editor\n// Start typing your code or text here...\n\n'
    case 'document': return '<h1>Welcome to Euda Document Editor</h1><p>Start writing your document here...</p>'
    default: return ''
  }
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeEditor: 'text',
      
      currentFile: null,
      openFiles: [],
      recentFiles: [],
      sidebarOpen: true,
      theme: 'light',
      isLoading: false,
      
      setActiveEditor: (editor) => set({ activeEditor: editor }),
      
      setCurrentFile: (file) => set({ currentFile: file }),
      
      updateFileContent: (content) => {
        const state = get()
        if (state.currentFile) {
          const updatedFile = {
            ...state.currentFile,
            content,
            isModified: true,
            lastModified: new Date(),
          }
          
          set((state) => ({
            currentFile: updatedFile,
            openFiles: state.openFiles.map(f => 
              f.id === updatedFile.id ? updatedFile : f
            ),
          }))
        }
      },
      
      setTheme: (theme) => {
        set({ theme })
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      addRecentFile: (path) => set((state) => ({
        recentFiles: [path, ...state.recentFiles.filter(f => f !== path)].slice(0, 10)
      })),
      
      newFile: (type) => {
        const newFile = createNewFile(type)
        set((state) => ({
          currentFile: newFile,
          activeEditor: type,
          openFiles: [...state.openFiles, newFile],
        }))
      },
      
      openFile: (file) => {
        set((state) => {
          const existingFile = state.openFiles.find(f => f.id === file.id)
          if (existingFile) {
            return { currentFile: existingFile, activeEditor: file.type }
          }
          
          return {
            currentFile: file,
            activeEditor: file.type,
            openFiles: [...state.openFiles, file],
          }
        })
      },
      
      closeFile: (fileId) => {
        set((state) => {
          const newOpenFiles = state.openFiles.filter(f => f.id !== fileId)
          const newCurrentFile = state.currentFile?.id === fileId 
            ? (newOpenFiles.length > 0 ? newOpenFiles[0] : null)
            : state.currentFile
          
          return {
            openFiles: newOpenFiles,
            currentFile: newCurrentFile,
          }
        })
      },
      
      markFileModified: (fileId, modified) => {
        set((state) => ({
          openFiles: state.openFiles.map(f => 
            f.id === fileId ? { ...f, isModified: modified } : f
          ),
          currentFile: state.currentFile?.id === fileId 
            ? { ...state.currentFile, isModified: modified }
            : state.currentFile,
        }))
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      saveFile: (fileId, content) => {
        set((state) => {
          const updatedFiles = state.openFiles.map(f => 
            f.id === fileId 
              ? { ...f, content, isModified: false, lastModified: new Date() }
              : f
          )
          
          const updatedCurrentFile = state.currentFile?.id === fileId 
            ? { ...state.currentFile, content, isModified: false, lastModified: new Date() }
            : state.currentFile
          
          return {
            openFiles: updatedFiles,
            currentFile: updatedCurrentFile,
          }
        })
      },
    }),
    {
      name: 'euda-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        recentFiles: state.recentFiles,
      }),
    }
  )
)