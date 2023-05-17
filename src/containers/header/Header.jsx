import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className="langarts__header section__padding" id="home">
      <div className="langarts__header-content">
        <h1 className="gradient__text">Learn New Languages with Ease</h1>
        <p>We all know how difficult it can be to start learning a new language. That's why our application makes it easy and fun to improve your language skills and vocabulary.</p>
        <button className="cta-button">More{'>'} </button>
      </div>
    </div>
  )
}

export default Header
