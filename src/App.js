import React, { useState } from 'react'
import { Footer, Blog, Topics, Features, Header } from './containers'
import { Navbar } from './components'
import './App.css'

const App = () => {
  const [showNewPicture, setShowNewPicture] = useState(false);

  const handleCTAButtonClick = () => {
    setShowNewPicture(true);
  };

  return (
    <div className="App">
      <div className={`gradient__pic ${showNewPicture ? 'slide-left' : ''}`}>  
      <Navbar />
      <Header handleCTAButtonClick={handleCTAButtonClick} />
      </div>
      <Topics id="topics" />
      <Features />
      <Blog />
      <Footer />
    </div>
  )
}

export default App
