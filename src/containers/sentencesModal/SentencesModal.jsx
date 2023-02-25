import React from 'react';
import './sentencesModal.css';
import { RiCloseFill} from 'react-icons/ri';

const SentencesModal = ({ showSentencesModal, setShowSentencesModal }) => {
  if (!showSentencesModal) {
    return null;
  }

  return (
    <div className="langarts__sentencesModal">
      <div className="langarts__sentencesModal__header">
        <h2>Sentences Tab</h2>
        <div className="langarts__sentencesModal__header-close">
        <RiCloseFill color="grey" size={35} onClick={() => setShowSentencesModal(false)}/>
        </div>
      </div>

        <div className="langarts__sentencesModal__content">
          
        </div>
    </div>
  );
};

export default SentencesModal;