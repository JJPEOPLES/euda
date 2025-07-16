import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiAIService {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    
    if (!apiKey) {
      console.warn('Gemini API key not found in environment variables')
      return
    }

    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async generateText(prompt: string): Promise<string> {
    try {
      if (!this.model) {
        throw new Error('Gemini AI not initialized')
      }

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error generating text:', error)
      throw error
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
}

export const geminiAI = new GeminiAIService()
export default geminiAI