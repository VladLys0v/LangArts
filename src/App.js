import React, { useState } from 'react'
import { Footer, Topics, Features, Header } from './containers'
import { Navbar } from './components'
import './App.css'

const App = () => {
  const [showNewPicture, setShowNewPicture] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  const handleCTAButtonClick = () => {
    setShowNewPicture(true);
    setSlideOut(true);
  };

  return (
    <div className="App">
      <div className={`bg__pic ${showNewPicture ? 'slide-left' : ''} ${slideOut ? 'slide-out' : ''}`}> 
      <Navbar />
      <Header handleCTAButtonClick={handleCTAButtonClick} />
      </div>
      <div className="mirrorBG">
    <div className={`mirrorBG__background ${showNewPicture ? 'slide-left' : ''} ${slideOut ? 'slide-out' : ''}`}></div>
    <Topics id="topics" />
  </div>
      <Features />
      <Footer />
    </div>
  )
}

export default App
