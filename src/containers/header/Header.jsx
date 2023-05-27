import React from 'react'
import './header.css'

const Header = ({handleCTAButtonClick}) => {
  return (
    <div className="langarts__header section__padding" id="home">
      <div className="langarts__header-content">
        <div className="langarts__header-text-container">
          <h1 className="gradient__text">Learn New Languages with Ease</h1>
          <p>We all know how difficult it can be to start learning a new language. That's why our application makes it easy and fun to improve your language skills and vocabulary.</p>
        </div>
        <button className="cta-button"onClick={handleCTAButtonClick}>More{'>'} </button>
      </div>
    </div>
  )
}

export default Header
