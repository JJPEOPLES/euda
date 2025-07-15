import React from 'react'
import CleanTextEditor from './CleanTextEditor'

const TextEditor: React.FC = () => {
  return <CleanTextEditor />
}

export default TextEditor
import { motion } from 'framer-motion'
import { 
  Type, 
  Code, 
  FileText, 
  Palette,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
  Search,
  Replace
} from 'lucide-react'

const TextEditor = () => {
  const { currentFile, updateFileContent, theme } = useStore()
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save handled by parent
    })
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      editor.getAction('actions.find').run()
    })
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
      editor.getAction('editor.action.startFindReplaceAction').run()
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateFileContent(value)
    }
  }

  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'swift': 'swift',
      'kt': 'kotlin',
      'scala': 'scala',
      'sh': 'shell',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'sass': 'sass',
      'json': 'json',
      'xml': 'xml',
      'yml': 'yaml',
      'yaml': 'yaml',
      'md': 'markdown',
      'sql': 'sql',
      'dockerfile': 'dockerfile',
    }
    
    return languageMap[ext || ''] || 'plaintext'
  }

  const insertSnippet = (snippet: string) => {
    const editor = editorRef.current
    if (editor) {
      const position = editor.getPosition()
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: position.column,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      }
      editor.executeEdits('', [{
        range: range,
        text: snippet
      }])
      editor.focus()
    }
  }

  const commonSnippets = [
    { name: 'Function', code: 'function ${1:name}(${2:params}) {\n  ${3:// body}\n}' },
    { name: 'Arrow Function', code: 'const ${1:name} = (${2:params}) => {\n  ${3:// body}\n}' },
    { name: 'Class', code: 'class ${1:ClassName} {\n  constructor(${2:params}) {\n    ${3:// constructor}\n  }\n}' },
    { name: 'If Statement', code: 'if (${1:condition}) {\n  ${2:// body}\n}' },
    { name: 'For Loop', code: 'for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n  ${3:// body}\n}' },
    { name: 'Try/Catch', code: 'try {\n  ${1:// try body}\n} catch (${2:error}) {\n  ${3:// catch body}\n}' },
  ]

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No file selected</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Editor Toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {getLanguage(currentFile.name).toUpperCase()}
              </span>
            </div>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => editorRef.current?.getAction('actions.find').run()}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                title="Find (Ctrl+F)"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => editorRef.current?.getAction('editor.action.startFindReplaceAction').run()}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                title="Replace (Ctrl+H)"
              >
                <Replace className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => editorRef.current?.getAction('editor.action.fontZoomIn').run()}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => editorRef.current?.getAction('editor.action.fontZoomOut').run()}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => editorRef.current?.getAction('editor.action.fontZoomReset').run()}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <button
              onClick={() => editorRef.current?.getAction('editor.action.quickCommand').run()}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
              title="Command Palette (Ctrl+Shift+P)"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Snippets Bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Quick Insert:
          </span>
          {commonSnippets.map((snippet) => (
            <button
              key={snippet.name}
              onClick={() => insertSnippet(snippet.code)}
              className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors whitespace-nowrap"
            >
              {snippet.name}
            </button>
          ))}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguage(currentFile.name)}
          value={currentFile.content}
          theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80, 120],
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'gutter',
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showVariables: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            parameterHints: {
              enabled: true,
            },
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            unfoldOnClickAfterEndOfLine: false,
            contextmenu: true,
            mouseWheelZoom: true,
            multiCursorModifier: 'ctrlCmd',
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: 'advanced',
            tabCompletion: 'on',
            acceptSuggestionOnEnter: 'on',
            snippetSuggestions: 'top',
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="flex items-center gap-4">
          <span>
            Language: {getLanguage(currentFile.name)}
          </span>
          <span>
            {currentFile.content.split('\n').length} lines
          </span>
          <span>
            {currentFile.content.length} characters
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            {currentFile.isModified ? 'Modified' : 'Saved'}
          </span>
          <span>
            UTF-8
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default TextEditor