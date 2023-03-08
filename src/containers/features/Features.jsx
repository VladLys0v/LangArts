import React, { useState } from 'react';
import './features.css';
import { createBrowserHistory } from 'history';

import "./langSwitch.css";
import swap from "../../assets/swap.png";


import WordsModal from '../wordsModals/WordsModal.jsx';
import SentencesModal from '../sentencesModal/SentencesModal.jsx'
import ParagraphsModal from '../paragraphsModal/ParagraphsModal.jsx'
import Vocabulary from 'C:/Users/Vlad/Desktop/langarts/src/components/vocabulary/Vocabulary.jsx'
//import LangSwitch from 'C:/Users/Vlad/Desktop/langarts/src/components/langSwitch/LangSwitch.jsx';

const Features = () => {
  const [showWordsModal, setShowWordsModal] = useState(false);
  const [showSentencesModal, setShowSentencesModal] = useState(false);
  const [showParagraphsModal, setShowParagraphsModal] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  
  const [selectedValue1, setSelectedValue1] = useState("russian");
  const [selectedValue2, setSelectedValue2] = useState("polish");
  
  const handleSwap = () => {
    const temp = selectedValue1;
    setSelectedValue1(selectedValue2);
    setSelectedValue2(temp);
  };


  const handleWordsButtonClick = () => {
    setShowWordsModal(true);
  };

  const handleSentencesButtonClick = () => {
    setShowSentencesModal(true);
  };

  const handleParagraphsButtonClick = () => {
    setShowParagraphsModal(true);
  };

  const history = createBrowserHistory();

  const handleVocabularyClick = (language) => {
    setShowVocabulary(true);
    history.push(`/${language}`);
  };


  return (
    
    <div className="langarts__features section__padding" id="langartsFeatures">
      <div className="langarts__langSwitch section__margin">


      <div className="langarts__option1">
        <select
          className="langarts__option1-select"
          id="language1"
          value={selectedValue1}
          onChange={(e) => setSelectedValue1(e.target.value)}
        >
          <option value="russian">russian</option>
          <option value="polish">polish</option>
        </select>
      </div>


      <div className="langarts__changebutton">
        <button type="button" onClick={handleSwap}>
          <img src={swap} alt="swap" />
        </button>
      </div>


      <div className="langarts__option3">
        <select
          className="langarts__option3-select"
          id="language2"
          value={selectedValue2}
          onChange={(e) => setSelectedValue2(e.target.value)}
        >
          <option value="polish">polish</option>
          <option value="russian">russian</option>
        </select>
      </div>



      </div>
      <div className="langarts__features-heading">
        <h1 className="gradient__text">Choose the difficulty level:</h1>
        <p>
        <span className="langarts__features-heading-span" onClick={() => handleVocabularyClick(selectedValue1)}>
            Append the vocabulary
          </span>
        </p>
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
      <WordsModal showWordsModal={showWordsModal} setShowWordsModal={setShowWordsModal} language={selectedValue1} language2={selectedValue2} />
      <SentencesModal showSentencesModal={showSentencesModal} setShowSentencesModal={setShowSentencesModal} />
      <ParagraphsModal showParagraphsModal={showParagraphsModal} setShowParagraphsModal={setShowParagraphsModal} />
      <Vocabulary showVocabulary={showVocabulary} setShowVocabulary={setShowVocabulary} language={selectedValue1} language2={selectedValue2}/>
    </div>
  );
};

export default Features;