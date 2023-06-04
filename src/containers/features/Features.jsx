import React, { useState, useEffect } from 'react';
import {RiCheckboxMultipleBlankFill, RiBookMarkLine} from 'react-icons/ri';
import './features.css';
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom';
import LangSwitch from'../../components/LangSwitch/LangSwitch.jsx'
import MemoryCards from '../memoryCards/MemoryCards.jsx';
import Vocabulary from '../../components/vocabulary/Vocabulary.jsx'


const Features = () => {
  const [showMemoryCards, setShowMemoryCards] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false); 
  const [selectedValue1, setSelectedValue1] = useState("russian");
  const [selectedValue2, setSelectedValue2] = useState("polish");
  const history = createBrowserHistory();
  const location = useLocation(); 
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  
  const handleSwap = () => {
    setSelectedValue1(selectedValue2);
  setSelectedValue2(selectedValue1);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    const storedShowMemoryCards = localStorage.getItem('showMemoryCards');
    if (storedShowMemoryCards) {
      setShowMemoryCards(JSON.parse(storedShowMemoryCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showMemoryCards', JSON.stringify(showMemoryCards));
  }, [showMemoryCards]);

  const handleMemoryCards = () => {
    setShowMemoryCards(true);
    history.push(`/memory-cards`);
  };

  useEffect(() => {
    if (location.pathname === '/memory-cards') {
      setShowMemoryCards(true);
    }
  }, [location]);

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
    
    <div className="langarts__features">
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
        <h1 className="gradient__text">Memory cards:</h1> 
        <div className="gears" id="one-gear" onClick={handleSettingsClick}>
        <div className="gears-container">
        <div className="gear-rotate"></div>
        </div>
        </div>
      </div>
      {showSettings && (
  <div className="langarts__features-settings">
    <h3>You have found an Easter egg</h3>
    <div className="settings-img">
    <pre>
    {`
        .-""""""-.
      .'          '.
     /   O      O   \\
    :           \`    :
    |   \\        /   |    
    :    '.     .'   :
     \\     '--'     /
      '.          .'
        '-......-'
    `}
  </pre> 
    </div>
  </div>
)}
      <div className="langarts__cards_container">
        <div className="langarts__card1">
          <button type="button" onClick={handleMemoryCards}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper-first">
              <RiCheckboxMultipleBlankFill size={24} />
              </div>
            </div>
            <span>Memory cards</span>
          </button>
        </div>
        <div className="langarts__card2">
          <button type="button" onClick={() => handleVocabularyClick(selectedValue1)}>
            <div className="svg-wrapper-2">
              <div className="svg-wrapper-second">
              <RiBookMarkLine size={24} />
              </div>
            </div>
            <span>Vocabulary</span>
          </button>
        </div>
      </div>
      <MemoryCards
        showMemoryCards={showMemoryCards}
        setShowMemoryCards={setShowMemoryCards}
        language={selectedValue1}
        language2={selectedValue2}
        favoriteWords={favoriteWords}
        setFavoriteWords={setFavoriteWords}
      />
      <Vocabulary
        showVocabulary={showVocabulary}
        setShowVocabulary={setShowVocabulary}
        language={selectedValue1}
        language2={selectedValue2}
        selectedValue1={selectedValue1}
        setSelectedValue1={setSelectedValue1}
        selectedValue2={selectedValue2}
        setSelectedValue2={setSelectedValue2}
        favoriteWords={favoriteWords}
        setFavoriteWords={setFavoriteWords}
      />
    </div>
  );
};

export default Features;