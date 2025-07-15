import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code, 
  Image, 
  Video, 
  Music, 
  FileText, 
  Star,
  Zap,
  Shield,
  Users,
  Github,
  Twitter,
  ChevronRight,
  Play,
  Sparkles,
  Menu,
  X,
  Check,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Code,
      title: "Advanced Text & Code Editor",
      description: "Syntax highlighting for 100+ languages, IntelliSense, Git integration, and powerful search & replace.",
      color: "from-blue-500 to-cyan-500",
      highlights: ["Monaco Editor", "Multi-cursor editing", "Code folding", "Auto-completion"]
    },
    {
      icon: Image,
      title: "Professional Image Editor (GT4 Powered)",
      description: "Advanced drawing engine from GT4 with professional brushes, unlimited layers, and real-time collaboration - better than Procreate.",
      color: "from-purple-500 to-pink-500",
      highlights: ["GT4 Drawing Engine", "Professional brushes", "Unlimited layers", "Real-time collaboration"]
    },
    {
      icon: Video,
      title: "Powerful Video Editor",
      description: "Timeline editing, transitions, effects, multi-track audio, and export in multiple formats including 4K.",
      color: "from-red-500 to-orange-500",
      highlights: ["Timeline editing", "Transitions & effects", "Multi-track audio", "4K export"]
    },
    {
      icon: Music,
      title: "Professional Audio Editor",
      description: "Waveform editing, effects, mixing, mastering tools, and support for all major audio formats.",
      color: "from-green-500 to-teal-500",
      highlights: ["Waveform editing", "Audio effects", "Mixing & mastering", "Format support"]
    },
    {
      icon: FileText,
      title: "Rich Document Editor",
      description: "Advanced formatting, tables, images, collaboration features, and export to PDF, Word, and more.",
      color: "from-yellow-500 to-amber-500",
      highlights: ["Rich formatting", "Tables & images", "Export options", "Collaboration"]
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance that outperforms bloated paid software",
      metric: "3x Faster",
      details: "Built with modern web technologies for optimal performance"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "No data collection, no subscriptions, no vendor lock-in",
      metric: "100% Private",
      details: "Your files stay on your device, complete privacy guaranteed"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Open source with an active community of contributors",
      metric: "Open Source",
      details: "MIT licensed, transparent development on GitHub"
    }
  ]

  const competitors = [
    {
      name: "Adobe Creative Suite",
      price: "$52.99/month",
      features: ["Text Editor", "Image Editor", "Video Editor", "Audio Editor", "Document Editor"],
      limitations: ["Expensive subscription", "Resource heavy", "Complex interface", "Vendor lock-in"]
    },
    {
      name: "Microsoft Office 365",
      price: "$12.50/month",
      features: ["Document Editor", "Basic Image Tools"],
      limitations: ["Limited editing features", "Subscription required", "Not for creative work"]
    },
    {
      name: "Euda",
      price: "Free Forever",
      features: ["Text Editor", "Image Editor", "Video Editor", "Audio Editor", "Document Editor"],
      limitations: ["None - It's completely free!"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Euda</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white hover:text-primary-400 transition-colors">Features</a>
              <a href="#comparison" className="text-white hover:text-primary-400 transition-colors">Compare</a>
              <a href="#pricing" className="text-white hover:text-primary-400 transition-colors">Pricing</a>
              <Link to="/about" className="text-white hover:text-primary-400 transition-colors">About</Link>
              <a href="https://gt4.k2lang.org" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1 font-semibold">
                <Sparkles className="w-4 h-4" />
                GT4 Engine
              </a>
              <a href="https://k2lang.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-semibold">
                <Star className="w-4 h-4" />
                K2Lang.org
              </a>
              <a href="https://github.com/JJPEOPLES/euda" className="text-white hover:text-primary-400 transition-colors flex items-center gap-1">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <Link to="/editor" className="button-primary">Launch Editor</Link>
            </nav>
            
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-white hover:text-primary-400 transition-colors">Features</a>
                <a href="#comparison" className="text-white hover:text-primary-400 transition-colors">Compare</a>
                <a href="#pricing" className="text-white hover:text-primary-400 transition-colors">Pricing</a>
                <Link to="/about" className="text-white hover:text-primary-400 transition-colors">About</Link>
                <a href="https://gt4.k2lang.org" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  GT4 Engine
                </a>
                <a href="https://k2lang.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-semibold">
                  <Star className="w-4 h-4" />
                  K2Lang.org
                </a>
                <a href="https://github.com/JJPEOPLES/euda" className="text-white hover:text-primary-400 transition-colors flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <Link to="/editor" className="button-primary w-fit">Launch Editor</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Powered by GT4 Drawing Engine from K2Lang.org
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              The Ultimate
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                {' '}Free{' '}
              </span>
              Editor
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Professional-grade editing suite for text, images, videos, audio, and documents. 
              Completely free, open-source, and better than expensive alternatives.
            </p>
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-4 rounded-lg mx-auto max-w-4xl mb-8">
              <p className="text-lg font-bold mb-2">
                🔥 Features the LEGENDARY GT4 Drawing Engine! 🔥
              </p>
              <p className="text-md">
                Created by an 11-year-old developer • Better than Figma, Photoshop & Canva • Visit <a href="https://k2lang.org" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-red-600">K2Lang.org</a> for more incredible projects!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/editor" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Play className="w-5 h-5" />
                Launch Editor Now
              </Link>
              <a 
                href="https://github.com/JJPEOPLES/euda" 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/20 flex items-center gap-2 justify-center"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">5</div>
                <div className="text-gray-300">Editors in One</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
                <div className="text-gray-300">Free Forever</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">0</div>
                <div className="text-gray-300">Data Collection</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GT4 & K2Lang.org Showcase */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-full mb-8">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg font-bold">LEGENDARY GT4 DRAWING ENGINE</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">GT4</span> Revolution
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Euda's image editor is powered by the LEGENDARY GT4 Drawing Engine - created by an 11-year-old developer who's revolutionizing digital art!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black/30 p-8 rounded-2xl border border-yellow-500/20">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎨 GT4 Drawing Engine</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>✨ Better than Figma, Photoshop & Canva</li>
                  <li>🚀 Professional-grade tools & brushes</li>
                  <li>🎯 Unlimited layers & advanced effects</li>
                  <li>👥 Real-time collaboration</li>
                  <li>🧠 AI-powered features</li>
                  <li>⚡ Lightning-fast performance</li>
                </ul>
                <a 
                  href="https://gt4.k2lang.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold hover:shadow-lg transition-shadow"
                >
                  Try GT4 Standalone →
                </a>
              </div>
              
              <div className="bg-black/30 p-8 rounded-2xl border border-purple-500/20">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">🌟 K2Lang.org</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>🏠 Home of GT4 & amazing projects</li>
                  <li>🎓 Learn from a young coding prodigy</li>
                  <li>💡 Innovative tools & applications</li>
                  <li>🚀 Cutting-edge technology</li>
                  <li>📱 Mobile & web applications</li>
                  <li>🎮 Games & interactive experiences</li>
                </ul>
                <a 
                  href="https://k2lang.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-shadow"
                >
                  Explore K2Lang.org →
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4">🔥 Why GT4 is LEGENDARY</h3>
              <p className="text-lg mb-6">
                Created by an 11-year-old developer, GT4 has achieved what billion-dollar companies couldn't - 
                a truly free, powerful, and intuitive drawing engine that rivals the best paid software!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <strong>0$</strong> Forever Free
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <strong>∞</strong> Unlimited Features
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <strong>🚀</strong> Better Performance
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <strong>👨‍💻</strong> 11-Year-Old Creator
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Young Developer Highlight */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-900/50 to-purple-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Built by a Young Developer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proving Age is Just a Number
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              This professional-grade editing suite was created by an 11-year-old developer who believes 
              that powerful tools should be free and accessible to everyone.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all border border-white/20"
            >
              <Sparkles className="w-5 h-5" />
              Learn the Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-r from-primary-900/50 to-purple-900/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Creating?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who have ditched expensive software for Euda's free alternative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/editor" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Play className="w-5 h-5" />
                Launch Editor Now
              </Link>
              <a 
                href="https://github.com/JJPEOPLES/euda" 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/20 flex items-center gap-2 justify-center"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Euda</span>
              </div>
              <p className="text-gray-400 mb-4">The ultimate free editing suite for creators worldwide.</p>
              
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 rounded-lg mb-4">
                <p className="font-bold text-sm mb-2">🔥 POWERED BY GT4 ENGINE</p>
                <p className="text-xs">Created by an 11-year-old developer</p>
              </div>
              
              <div className="space-y-2">
                <a 
                  href="https://gt4.k2lang.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  🎨 GT4 Drawing Engine →
                </a>
                <a 
                  href="https://k2lang.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  🌟 Visit K2Lang.org →
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Editors</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Text Editor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Image Editor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Editor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Audio Editor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Document Editor</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><a href="https://github.com/JJPEOPLES/euda" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://gt4.k2lang.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GT4 Drawing Engine</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com/JJPEOPLES/euda" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Euda. Made with ❤️ by an 11-year-old developer. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage