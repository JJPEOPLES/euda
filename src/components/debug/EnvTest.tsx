import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Key } from 'lucide-react'

const EnvTest: React.FC = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  const hasApiKey = !!apiKey
  const apiKeyLength = apiKey?.length || 0

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl max-w-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-semibold">API Status</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            {hasApiKey ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span className="text-gray-300">
              API Key: {hasApiKey ? '✓ Loaded' : '✗ Missing'}
            </span>
          </div>
          
          {hasApiKey && (
            <div className="text-gray-400">
              Length: {apiKeyLength} characters
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-2">
            Environment: {import.meta.env.MODE}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EnvTest