import React, { useState } from 'react'
import { Footer, Topics, Features, Header } from './containers'
import { Navbar } from './components'
import './App.css'

const App = () => {
  const [showNewPicture, setShowNewPicture] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);

  const handleCTAButtonClick = () => {
    if (showNewPicture) {
      setSlideOut(!slideOut);
      setResetAnimation(true);
      setTimeout(() => {
        setShowNewPicture(false);
        setSlideOut(false);
        setResetAnimation(false);
      }, 500);
    } else {
      setShowNewPicture(true);
      setSlideOut(false);
      setTimeout(() => {
        setSlideOut(true);
      }, 50);
    }
  };

  return (
    <div className="App">
      <div className={`bg__pic ${showNewPicture ? 'slide-left' : ''} ${slideOut ? 'slide-out' : ''} ${resetAnimation ? 'reset-animation' : ''}`}> 
      <Navbar />
      <Header handleCTAButtonClick={handleCTAButtonClick} />
      </div>
      <div className="mirrorBG">
        <div className={`mirrorBG__background ${showNewPicture ? 'slide-left' : ''} ${slideOut ? 'slide-out' : ''} ${resetAnimation ? 'reset-animation' : ''}`}></div>
        <Topics />
      </div>
      <Features />
      <Footer />
    </div>
  )
}

export default App
