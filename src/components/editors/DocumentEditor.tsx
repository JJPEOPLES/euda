import React from 'react'
import UltimateDocumentEditor from './UltimateDocumentEditor'

const DocumentEditor: React.FC = () => {
  return <UltimateDocumentEditor />
}

export default DocumentEditor
import { motion } from 'framer-motion'
import { 
  FileText,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Table,
  Download,
  Upload,
  Printer,
  Save,
  Type,
  Palette,
  Columns,
  Eye,
  Plus
} from 'lucide-react'

const DocumentEditor = () => {
  const { currentFile, updateFileContent } = useStore()
  const quillRef = useRef<ReactQuill>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
    'code-block'
  ]

  const handleChange = (content: string) => {
    updateFileContent(content)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        updateFileContent(content)
      }
      reader.readAsText(file)
    }
  }

  const exportToPDF = () => {
    if (currentFile?.content) {
      // Create a new window with the document content
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Document</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            ${currentFile.content}
          </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const exportToHTML = () => {
    if (currentFile?.content) {
      const blob = new Blob([currentFile.content], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'document.html'
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const insertTemplate = (template: string) => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      const range = quill.getSelection()
      if (range) {
        quill.insertText(range.index, template)
      }
    }
  }

  const templates = [
    { name: 'Letter', content: 'Dear [Name],\n\n[Your message here]\n\nSincerely,\n[Your name]' },
    { name: 'Report', content: '# Report Title\n\n## Executive Summary\n\n[Summary content]\n\n## Introduction\n\n[Introduction content]\n\n## Conclusion\n\n[Conclusion content]' },
    { name: 'Meeting Notes', content: '# Meeting Notes\n\n**Date:** [Date]\n**Attendees:** [Names]\n\n## Agenda\n\n1. [Item 1]\n2. [Item 2]\n\n## Action Items\n\n- [ ] [Action item 1]\n- [ ] [Action item 2]' },
    { name: 'Essay', content: '# Essay Title\n\n## Introduction\n\n[Introduction paragraph]\n\n## Body\n\n[Body paragraphs]\n\n## Conclusion\n\n[Conclusion paragraph]' }
  ]

  const quickActions = [
    { name: 'Bold', icon: Bold, action: () => quillRef.current?.getEditor().format('bold', true) },
    { name: 'Italic', icon: Italic, action: () => quillRef.current?.getEditor().format('italic', true) },
    { name: 'Underline', icon: Underline, action: () => quillRef.current?.getEditor().format('underline', true) },
    { name: 'Quote', icon: Quote, action: () => quillRef.current?.getEditor().format('blockquote', true) },
    { name: 'List', icon: List, action: () => quillRef.current?.getEditor().format('list', 'bullet') },
    { name: 'Numbered', icon: ListOrdered, action: () => quillRef.current?.getEditor().format('list', 'ordered') }
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
            {/* Quick Actions */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={action.action}
                  className="px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title={action.name}
                >
                  <action.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Templates */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Templates:</span>
              <select 
                onChange={(e) => {
                  const template = templates.find(t => t.name === e.target.value)
                  if (template) {
                    updateFileContent(template.content)
                  }
                }}
                className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value="">Select template...</option>
                {templates.map((template) => (
                  <option key={template.name} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.html,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={exportToHTML}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print/PDF
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
          <div className="document-editor h-full">
            {currentFile ? (
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={currentFile.content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: 'calc(100% - 42px)' }}
                placeholder="Start writing your document..."
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No document selected</p>
                  <button
                    onClick={() => updateFileContent('<h1>New Document</h1><p>Start writing here...</p>')}
                    className="button-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile ? `${currentFile.content.length} characters` : 'No document'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile ? `${currentFile.content.split(' ').filter(word => word.length > 0).length} words` : '0 words'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile ? `${currentFile.content.split('\n').length} lines` : '0 lines'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentFile?.isModified ? 'Modified' : 'Saved'}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Rich Text Format
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DocumentEditor