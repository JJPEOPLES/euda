 import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EditorApp from './pages/EditorApp'
import About from './pages/About'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorApp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App