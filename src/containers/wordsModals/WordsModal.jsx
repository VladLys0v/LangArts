import React, { useState, useEffect } from 'react';
import './wordsModal.css';
import { RiCloseFill} from 'react-icons/ri';

const WordsModal = ({ showWordsModal, setShowWordsModal }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(countdown => countdown - 1);
    }, 1000);

    if (countdown === 0) {
      setCountdown("Start!");
    }

    return () => clearInterval(timer);
  }, [countdown]);

  if (!showWordsModal) {
    return null;
  }

  return (
    <div className="langarts__wordsModal">
      <div className="langarts__wordsModal__header">
        <h2>Words Tab</h2>
        <div className="langarts__wordsModal__header-close">
        <RiCloseFill color="grey" size={35} onClick={() => setShowWordsModal(false)}/>
        </div>
      </div>

        <div className="langarts__wordsModal__content">
          <div className="langarts__wordsModal__countdown">{countdown}</div>
        </div>
    </div>
  );
};

export default WordsModal;