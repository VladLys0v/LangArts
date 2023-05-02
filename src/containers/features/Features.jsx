import React, { useState, useEffect } from 'react';
import './features.css';
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom';
import LangSwitch from'C:/Users/Vlad/Desktop/langarts/src/components/LangSwitch/LangSwitch.jsx'
import MemoryCards from '../memoryCards/MemoryCards.jsx';
import Vocabulary from 'C:/Users/Vlad/Desktop/langarts/src/components/vocabulary/Vocabulary.jsx'


const Features = () => {
  const [showMemoryCards, setShowMemoryCards] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  
  const [selectedValue1, setSelectedValue1] = useState("russian");
  const [selectedValue2, setSelectedValue2] = useState("polish");
  
  const handleSwap = () => {
    const temp = selectedValue1;
    setSelectedValue1(selectedValue2);
    setSelectedValue2(temp);
  };


  const handleWordsButtonClick = () => {
    setShowMemoryCards(true);
  };

  const history = createBrowserHistory();
  const location = useLocation(); 

  useEffect(() => {
    const storedShowVocabulary = localStorage.getItem('showVocabulary');
    if (storedShowVocabulary) {
      setShowVocabulary(JSON.parse(storedShowVocabulary));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showVocabulary', JSON.stringify(showVocabulary));
  }, [showVocabulary]);

  const handleVocabularyClick = () => {
    setShowVocabulary(true);
    history.push(`/vocabulary`);
  };

  useEffect(() => {
    if (location.pathname === '/vocabulary') {
      setShowVocabulary(true);
    }
  }, [location]);


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
          <button type="button" onClick={handleWordsButtonClick}>Memory cards</button>
        </div>
      </div>
      <MemoryCards showMemoryCards={showMemoryCards} setShowMemoryCards={setShowMemoryCards} language={selectedValue1} language2={selectedValue2} />
      <Vocabulary showVocabulary={showVocabulary} setShowVocabulary={setShowVocabulary} language={selectedValue1} language2={selectedValue2}
      selectedValue1={selectedValue1} setSelectedValue1={setSelectedValue1} selectedValue2={selectedValue2} setSelectedValue2={setSelectedValue2}/>
    </div>
  );
};

export default Features;