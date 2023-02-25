import React from 'react';
import './paragraphsModal.css';
import { RiCloseFill} from 'react-icons/ri';

const ParagraphsModal = ({ showParagraphsModal, setShowParagraphsModal }) => {
  if (!showParagraphsModal) {
    return null;
  }

  return (
    <div className="langarts__paragraphsModal">
      <div className="langarts__paragraphsModal__header">
        <h2>Paragraphs Tab</h2>
        <div className="langarts__paragraphsModal__header-close">
        <RiCloseFill color="grey" size={35} onClick={() => setShowParagraphsModal(false)}/>
        </div>
      </div>

        <div className="langarts__paragraphsModal__content">
          
        </div>
    </div>
  );
};

export default ParagraphsModal;