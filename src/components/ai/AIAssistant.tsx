import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Sparkles, 
  Wand2, 
  Send, 
  Loader2, 
  X, 
  Copy,
  Check,
  MessageCircle,
  Code,
  FileText,
  Languages,
  Lightbulb,
  Wrench,
  BookOpen,
  AlertCircle
} from 'lucide-react'
import geminiAI from '../../services/geminiAI'

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
  onInsertText?: (text: string) => void
  currentContent?: string
  editorType?: 'text' | 'document' | 'code'
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen,
  onClose,
  onInsertText,
  currentContent = '',
  editorType = 'text'
}) => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [error, setError] = useState('')

  const quickActions = [
    { 
      id: 'improve', 
      label: 'Improve Text', 
      icon: Wand2, 
      action: () => handleQuickAction('improve'),
      description: 'Make text more clear and professional'
    },
    { 
      id: 'summarize', 
      label: 'Summarize', 
      icon: FileText, 
      action: () => handleQuickAction('summarize'),
      description: 'Create a concise summary'
    },
    { 
      id: 'explain', 
      label: 'Explain Code', 
      icon: Code, 
      action: () => handleQuickAction('explain'),
      description: 'Explain what the code does'
    },
    { 
      id: 'generate', 
      label: 'Generate Code', 
      icon: Lightbulb, 
      action: () => handleQuickAction('generate'),
      description: 'Generate code from description'
    },
    { 
      id: 'fix', 
      label: 'Fix Issues', 
      icon: Wrench, 
      action: () => handleQuickAction('fix'),
      description: 'Fix errors in code'
    },
    { 
      id: 'translate', 
      label: 'Translate', 
      icon: Languages, 
      action: () => handleQuickAction('translate'),
      description: 'Translate to different language'
    }
  ]

  const handleQuickAction = async (action: string) => {
    if (!currentContent.trim()) {
      setError('Please select some text first!')
      setResponse('')
      return
    }

    setIsLoading(true)
    setError('')
    setResponse('')
    
    try {
      // Check if AI is initialized
      if (!geminiAI.isInitialized()) {
        throw new Error('AI Service is not properly initialized. Please check your API key.')
      }

      let result = ''
      
      switch (action) {
        case 'improve':
          result = await geminiAI.improveText(currentContent)
          break
        case 'summarize':
          result = await geminiAI.generateSummary(currentContent)
          break
        case 'explain':
          result = await geminiAI.explainCode(currentContent)
          break
        case 'generate':
          result = await geminiAI.generateCode(currentContent)
          break
        case 'fix':
          result = await geminiAI.fixCode(currentContent, 'Fix any issues')
          break
        case 'translate':
          result = await geminiAI.translateText(currentContent, 'Spanish')
          break
      }
      
      setResponse(result)
    } catch (error: any) {
      console.error('AI Error:', error)
      setError(error.message || 'An unknown error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError('')
    setResponse('')
    
    try {
      // Check if AI is initialized
      if (!geminiAI.isInitialized()) {
        throw new Error('AI Service is not properly initialized. Please check your API key.')
      }

      const result = await geminiAI.generateText(prompt)
      setResponse(result)
    } catch (error: any) {
      console.error('AI Error:', error)
      setError(error.message || 'An unknown error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInsert = () => {
    if (onInsertText && response) {
      onInsertText(response)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white">GT4 AI Assistant</h2>
                  <p className="text-purple-200">Powered by Gemini AI</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <Sparkles className="w-4 h-4" />
                  <span>{geminiAI.isInitialized() ? 'AI Ready' : 'AI Error'}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-purple-500/30 bg-gray-900/50">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'chat' 
                  ? 'text-purple-400 border-b-2 border-purple-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'actions' 
                  ? 'text-purple-400 border-b-2 border-purple-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Wand2 className="w-4 h-4 inline mr-2" />
              Quick Actions
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ask me anything:
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Enter your question or request..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                            Thinking...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send
                          </>
                        )}
                      </button>
                    
                    <button
                      type="button"
                      onClick={async () => {
                        setPrompt('Hello! Can you tell me what you can do?')
                        const form = document.querySelector('form')
                        if (form) {
                          form.dispatchEvent(new Event('submit', { bubbles: true }))
                        }
                      }}
                      disabled={isLoading}
                      className="px-4 py-3 bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all"
                    >
                      Test
                    </button>
                  </div>
                    
                    <button
                      type="button"
                      onClick={async () => {
                        setPrompt('Hello! Can you tell me what you can do?')
                        const form = document.querySelector('form')
                        if (form) {
                          form.dispatchEvent(new Event('submit', { bubbles: true }))
                        }
                      }}
                      disabled={isLoading}
                      className="px-4 py-3 bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all"
                    >
                      Test
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    disabled={isLoading}
                    className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 hover:border-purple-500 transition-all text-left disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <action.icon className="w-5 h-5 text-purple-400" />
                      <span className="font-medium text-white">{action.label}</span>
                    </div>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Response */}
          {(response || isLoading || error) && (
            <div className="border-t border-purple-500/30 bg-gray-900/50 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">
                  {error ? 'Error:' : 'Response:'}
                </h3>
                {response && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy response"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    {onInsertText && (
                      <button
                        onClick={handleInsert}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm hover:shadow-lg transition-all"
                      >
                        Insert
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className={`rounded-lg p-4 max-h-60 overflow-y-auto ${
                error ? 'bg-red-900/30 border border-red-500/50' : 'bg-gray-800'
              }`}>
                {isLoading ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI is thinking...</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-gray-300 text-sm">
                    {response}
                  </pre>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AIAssistant