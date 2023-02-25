import React from 'react';
import './wordsModal.css';
import { RiCloseFill} from 'react-icons/ri';

const WordsModal = ({ showWordsModal, setShowWordsModal }) => {
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
          
        </div>
    </div>
  );
};

export default WordsModal;