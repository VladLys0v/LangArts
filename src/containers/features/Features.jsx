import React, { useState } from 'react';
import './features.css';
import WordsModal from '../wordsModals/WordsModal.jsx';
import SentencesModal from '../sentencesModal/SentencesModal.jsx'
import ParagraphsModal from '../paragraphsModal/ParagraphsModal.jsx'

const Features = () => {
  const [showWordsModal, setShowWordsModal] = useState(false);
  const [showSentencesModal, setShowSentencesModal] = useState(false);
  const [showParagraphsModal, setShowParagraphsModal] = useState(false);

  const handleWordsButtonClick = () => {
    setShowWordsModal(true);
  };

  const handleSentencesButtonClick = () => {
    setShowSentencesModal(true);
  };

  const handleParagraphsButtonClick = () => {
    setShowParagraphsModal(true);
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
      <WordsModal showWordsModal={showWordsModal} setShowWordsModal={setShowWordsModal} />
      <SentencesModal showSentencesModal={showSentencesModal} setShowSentencesModal={setShowSentencesModal} />
      <ParagraphsModal showParagraphsModal={showParagraphsModal} setShowParagraphsModal={setShowParagraphsModal} />
    </div>
  );
};

export default Features;