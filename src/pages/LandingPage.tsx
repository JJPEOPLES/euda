import React, { useState } from 'react'
import { Link }       highlights: ["Waveform editing", "Audio effects", "Mixing & mastering", "Format support"],
      comingSoon: false
    },
    {
      icon: FileText,
      title: "Rich Document Editor",
      description: "Advanced formatting, tables, images, collaboration features, and export to PDF, Word, and more.",
      color: "from-yellow-500 to-amber-500",
      highlights: ["Rich formatting", "Tables & images", "Export options", "Collaboration"],
      comingSoon: falsedom'
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
      highlights: ["Monaco Editor", "Multi-cursor editing", "Code folding", "Auto-completion"],
      comingSoon: true
    },
    {
      icon: Image,
      title: "Professional Image Editor",
      description: "Layer-based editing, filters, effects, vector graphics, and advanced photo manipulation tools.",
      color: "from-purple-500 to-pink-500",
      highlights: ["Layers & masks", "Filters & effects", "Vector tools", "Format conversion"],
      comingSoon: true
    },
    {
      icon: Video,
      title: "Powerful Video Editor",
      description: "Timeline editing, transitions, effects, multi-track audio, and export in multiple formats including 4K.",
      color: "from-red-500 to-orange-500",
      highlights: ["Timeline editing", "Transitions & effects", "Multi-track audio", "4K export"],
      comingSoon: true
    },
    {
      icon: Music,
      title: "Professional Audio Editor",
      description: "Waveform editing, effects, mixing, mastering tools, and support for all major audio formats.",
      color: "from-green-500 to-teal-500",
      highlights: ["Waveform editing", "Audio effects", "Mixing & mastering", "Format support"],
      comingSoon: false
    },
    {
      icon: FileText,
      title: "Rich Document Editor",
      description: "Advanced formatting, tables, images, collaboration features, and export to PDF, Word, and more.",
      color: "from-yellow-500 to-amber-500",
      highlights: ["Rich formatting", "Tables & images", "Export options", "Collaboration"],
      comingSoon: false
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
      title: "Open Source",
      description: "Community-driven development with transparent code",
      metric: "Always Free",
      details: "MIT licensed, contribute and customize as needed"
    }
  ]

  const comparisons = [
    {
      feature: "Text/Code Editing",
      euda: "Coming Soon",
      competitor1: "✓ Basic",
      competitor2: "✓ Advanced ($29/mo)"
    },
    {
      feature: "Image Editing",
      euda: "Coming Soon",
      competitor1: "✗ None",
      competitor2: "✓ Basic ($20/mo)"
    },
    {
      feature: "Video Editing",
      euda: "Coming Soon",
      competitor1: "✗ None",
      competitor2: "✓ Limited ($50/mo)"
    },
    {
      feature: "Audio Editing",
      euda: "✓ Professional",
      competitor1: "✗ None",
      competitor2: "✗ None"
    },
    {
      feature: "Document Editing",
      euda: "✓ Rich Features",
      competitor1: "✓ Basic",
      competitor2: "✓ Advanced ($15/mo)"
    },
    {
      feature: "Price",
      euda: "FREE",
      competitor1: "Free (Limited)",
      competitor2: "$114/month"
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
              <a href="https://github.com/euda-app" className="text-white hover:text-primary-400 transition-colors flex items-center gap-1">
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
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              The Ultimate
              <span className="gradient-text block">Free Editor</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional-grade editing suite for text, images, videos, audio, and documents. 
              Completely free, open-source, and better than expensive alternatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/editor" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Play className="w-5 h-5" />
                Launch Editor Now
              </Link>
              <a 
                href="https://github.com/euda-app" 
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

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">All-in-One Editing Suite</h2>
            <p className="text-xl text-gray-300">Five powerful editors in one beautiful interface</p>
            <div className="mt-4">
              <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium">
                Note: Only Audio and Document editors are currently functional. Text, Image, and Video editors are coming soon!
              </span>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:scale-105 transition-transform relative"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  {feature.title}
                  {feature.comingSoon && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full font-semibold">Coming Soon</span>
                  )}
                </h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {feature.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-3 h-3 text-primary-400" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">See How We Compare</h2>
            <p className="text-xl text-gray-300">Euda vs. Popular Paid Alternatives</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full glass rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left p-4 text-white font-semibold">Feature</th>
                  <th className="text-center p-4 text-white font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary-400" />
                      Euda
                    </div>
                  </th>
                  <th className="text-center p-4 text-gray-300">VS Code</th>
                  <th className="text-center p-4 text-gray-300">Adobe Creative Suite</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="p-4 text-white font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-primary-400 font-semibold">{row.euda}</td>
                    <td className="p-4 text-center text-gray-300">{row.competitor1}</td>
                    <td className="p-4 text-center text-gray-300">{row.competitor2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Euda?</h2>
            <p className="text-xl text-gray-300">Built for developers, creators, and professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center glass rounded-xl p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 mb-4">{benefit.description}</p>
                <div className="text-primary-400 font-bold text-lg mb-2">{benefit.metric}</div>
                <div className="text-sm text-gray-400">{benefit.details}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-300">The best editor should be free for everyone</p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Free Forever</h3>
              <div className="text-6xl font-bold text-white mb-4">$0</div>
              <p className="text-gray-300 mb-8">Everything included, no hidden costs</p>
              
              <ul className="text-left space-y-3 mb-8">
                {[
                  "All 5 editors included",
                  "Unlimited projects",
                  "No watermarks",
                  "Regular updates",
                  "Community support",
                  "Commercial use allowed",
                  "Open source code"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-4 h-4 text-primary-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/editor" 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Start Creating Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Creating?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who have already made the switch to Euda. 
              No registration required, no downloads needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/editor" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Play className="w-5 h-5" />
                Launch Editor
              </Link>
              <a 
                href="https://github.com/euda-app" 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/20 flex items-center gap-2 justify-center"
              >
                <ExternalLink className="w-5 h-5" />
                View Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Euda</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://github.com/euda-app" className="text-gray-300 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/euda_app" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <span className="text-gray-300 text-sm">
                © 2024 Euda. Open source and free forever.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage