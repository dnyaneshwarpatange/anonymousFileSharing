import { HomeIcon } from '@heroicons/react/solid'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import DownloadPage from './DownloadPage'       

const StartHere = () => {
  return (
    <div className={`min-h-screen bg-background dark:bg-darkBackground font-sans`}>
    <Router>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </main>
    </Router>
  </div>
  )
}

export default StartHere