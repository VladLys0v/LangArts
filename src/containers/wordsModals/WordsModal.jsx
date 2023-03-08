import React, { useState, useEffect, useCallback } from 'react';
import './wordsModal.css';
import { RiCloseFill } from 'react-icons/ri';
import axios from 'axios';

const WordsModal = ({ showWordsModal, setShowWordsModal, language, language2 }) => {
  const [countdown, setCountdown] = useState(3);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${language}`);
        setWords(response.data);
      } catch (error) {
        console.error('Error fetching words: ' + error);
      }
    };

    if (showWordsModal && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showWordsModal && countdown === 0) {
      setCountdown('Start!');
      fetchWords();
    } else if (!showWordsModal) {
      setCountdown(3);
    }
  }, [showWordsModal, countdown, language]);

  const handleNextWord = useCallback(() => {
    setCurrentIndex(currentIndex + 1);
  }, [currentIndex]);

  useEffect(() => {
    if (countdown === 'Start!') {
      const timer = setTimeout(() => {
        setCountdown('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!showWordsModal) {
    return null;
  }

  return (
    <div className="langarts__wordsModal">
      <div className="langarts__wordsModal__header">
        <h2>Words Tab</h2>
        <div className="langarts__wordsModal__header-close">
          <RiCloseFill color="grey" size={35} onClick={() => setShowWordsModal(false)} />
        </div>
      </div>

      <div className="langarts__wordsModal__content">
        {words.length === 0 && <div>Loading words...</div>}
        {words.length > 0 && (
          <div>
            <div className="langarts__wordsModal__countdown">
              {countdown}
              {words[currentIndex].word}
            </div>
            {currentIndex < words.length - 1 && (
              <button onClick={handleNextWord}>Next</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsModal;