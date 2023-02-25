import React from 'react';
import './vocabulary.css';
import { RiCloseFill} from 'react-icons/ri';

const Vocabulary = ({ showVocabulary, setShowVocabulary }) => {
    if (!showVocabulary) {
        return null;
      }

    return (
    <div className="langarts__vocabulary">
  <div className="langarts__vocabulary__header">
    <h2>Vocabulary</h2>
    <div className="langarts__vocabulary__header-close">
    <RiCloseFill color="grey" size={35} onClick={() => setShowVocabulary(false)}/>
    </div>
  </div>
    <div className="langarts__vocabulary__content">
      
    </div>
</div>

    );

};

export default Vocabulary