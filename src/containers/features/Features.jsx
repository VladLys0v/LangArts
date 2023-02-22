import React from 'react'
//import Feature from '../../components/feature/Feature'
import './features.css'

const Features = () => {
  return (
    <div className="langarts__features section__padding" id="langartsFeatures">
      <div className="langarts__features-heading">
        <h1 className="gradient__text">Choose the difficulty level:</h1>
        <p>Append the vocabulary</p>
      </div>
      <div className="langarts__cards_container" id="cards">
        <div className="langarts__card1">
          <button type="button">Words</button>
        </div>
        <div className="langarts__card2">
          <button type="button">Sentences</button>
        </div>
        <div className="langarts__card3">
          <button type="button">Paragraphs</button>
        </div>
      </div>
    </div>
  )
}

export default Features
