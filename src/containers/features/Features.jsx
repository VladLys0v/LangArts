import React, { useState } from 'react';
import './features.css';
import Modal from 'C:/Users/Vlad/Desktop/langarts/src/containers/Modals/Modal.jsx';

const Features = () => {
  const [showModal, setShowModal] = useState(false);

  const handleWordsButtonClick = () => {
    setShowModal(true);
  };

  const handleSentencesButtonClick = () => {
    // handle sentences button click
  };

  const handleParagraphsButtonClick = () => {
    // handle paragraphs button click
  };

  return (
    <div className="langarts__features section__padding" id="langartsFeatures">
      <div className="langarts__features-heading">
        <h1 className="gradient__text">Choose the difficulty level:</h1>
        <p>Append the vocabulary</p>
      </div>
      <div className="langarts__cards_container" id="cards">
        <div className="langarts__card1">
          <button type="button" onClick={handleWordsButtonClick}>Words</button>
        </div>
        <div className="langarts__card2">
          <button type="button" onClick={handleSentencesButtonClick}>Sentences</button>
        </div>
        <div className="langarts__card3">
          <button type="button" onClick={handleParagraphsButtonClick}>Paragraphs</button>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Features;