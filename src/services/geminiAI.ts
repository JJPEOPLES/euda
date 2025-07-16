import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiAIService {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    
    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length,
      envVars: import.meta.env
    })
    
    if (!apiKey) {
      console.error('Gemini API key not found in environment variables')
      console.error('Available env vars:', Object.keys(import.meta.env))
      return
    }

    try {
      
      // Try different model names in order of preference
      const modelNames = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro',
        'models/gemini-1.5-flash',
        'models/gemini-1.5-pro',
        'models/gemini-pro'
      ]
      
      for (const modelName of modelNames) {
        try {
          this.genAI = new GoogleGenerativeAI(apiKey)
      
      // Try different model names in order of preference
      const modelNames = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        modelName,
            'models/gemini-1.5-flash',
        'models/gemini-1.5-pro',
        'models/gemini-pro'
      ]
      
      for (const modelName of modelNames) {
        try {
          this.model = this.genAI.getGenerativeModel({ model: modelName })
          console.log(`Gemini AI initialized successfully with model: ${modelName}`)
          break
        } catch (modelError) {
          console.log(`Failed to initialize model ${modelName}:`, modelError)
          continue
        }
      }
      
      if (!this.model) {
        throw new Error('No available Gemini model found')
      }
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error)
    }
  }

  async generateText(prompt: string): Promise<string> {
    try {
      if (!this.model) {
        throw new Error('Gemini AI not initialized. Please check your API key.')
      }

      console.log('Sending request to Gemini AI...')
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      console.log('Received response from Gemini AI')
      return text
    } catch (error: any) {
      console.error('Error generating text:', error)
      
      // Handle specific error types
      if (error.message?.includes('API key')) {
        throw new Error('Invalid API key. Please check your Gemini API key.')
      }
      
      if (error.message?.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later.')
      }
      
      if (error.message?.includes('network') || error.name === 'NetworkError') {
        throw new Error('Network error. Please check your internet connection.')
      }
      
      throw new Error(`AI Service Error: ${error.message || 'Unknown error occurred'}`)
    }
  }

  async improveText(text: string): Promise<string> {
    const prompt = `Please improve the following text by making it more clear, concise, and professional while maintaining its original meaning:

${text}

Improved version:`

    return this.generateText(prompt)
  }

  async generateCode(description: string, language: string = 'javascript'): Promise<string> {
    const prompt = `Generate ${language} code for the following description:

${description}

Please provide clean, well-commented code:`

    return this.generateText(prompt)
  }

  async explainCode(code: string): Promise<string> {
    const prompt = `Please explain what this code does in simple terms:

\`\`\`
${code}
\`\`\`

Explanation:`

    return this.generateText(prompt)
  }

  async fixCode(code: string, error: string): Promise<string> {
    const prompt = `Fix the following code that has this error: "${error}"

Code:
\`\`\`
${code}
\`\`\`

Fixed code:`

    return this.generateText(prompt)
  }

  async generateSummary(text: string): Promise<string> {
    const prompt = `Provide a concise summary of the following text:

${text}

Summary:`

    return this.generateText(prompt)
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    const prompt = `Translate the following text to ${targetLanguage}:

${text}

Translation:`

    return this.generateText(prompt)
  }

  async generateDocumentation(code: string): Promise<string> {
    const prompt = `Generate comprehensive documentation for the following code:

\`\`\`
${code}
\`\`\`

Documentation:`

    return this.generateText(prompt)
  }

  isInitialized(): boolean {
    return !!this.model
  }

  async listAvailableModels(): Promise<void> {
    try {
      if (!this.genAI) {
        console.error('Gemini AI not initialized')
        return
      }
      
      const models = await this.genAI.listModels()
      console.log('Available Gemini models:', models)
    } catch (error) {
      console.error('Error listing models:', error)
    }
  }
}

export const geminiAI = new GeminiAIService()
export default geminiAI