import React, { useState } from 'react';
import './features.css';
import { createBrowserHistory } from 'history';
import LangSwitch from'C:/Users/Vlad/Desktop/langarts/src/components/LangSwitch/LangSwitch.jsx'
import WordsModal from '../wordsModals/WordsModal.jsx';
import SentencesModal from '../sentencesModal/SentencesModal.jsx'
import ParagraphsModal from '../paragraphsModal/ParagraphsModal.jsx'
import Vocabulary from 'C:/Users/Vlad/Desktop/langarts/src/components/vocabulary/Vocabulary.jsx'


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

  const handleVocabularyClick = () => {
    setShowVocabulary(true);
    history.push(`/vocabulary`);
  };


  return (
    
    <div className="langarts__features section__padding" id="langartsFeatures">
      <div className="langarts__features-LangSwitch">
      <LangSwitch
        selectedValue1={selectedValue1}
        selectedValue2={selectedValue2}
        onSwap={handleSwap}
        onSelectValue1={(e) => setSelectedValue1(e.target.value)}
        onSelectValue2={(e) => setSelectedValue2(e.target.value)}
      />
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
      <Vocabulary showVocabulary={showVocabulary} setShowVocabulary={setShowVocabulary} language={selectedValue1} language2={selectedValue2}
      selectedValue1={selectedValue1} setSelectedValue1={setSelectedValue1} selectedValue2={selectedValue2} setSelectedValue2={setSelectedValue2}/>
    </div>
  );
};

export default Features;