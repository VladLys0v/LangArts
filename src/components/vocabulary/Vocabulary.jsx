import React, { useState, useEffect } from 'react';
import './vocabulary.css';
import { RiCloseFill} from 'react-icons/ri';

const Vocabulary = ({ showVocabulary, setShowVocabulary }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/words')
      .then(response => response.text()) // use response.text() instead of response.json()
      .then(data => setWords(data))
      .catch(error => console.error(error));
  }, []);

  if (!showVocabulary) {
    return null;
  }

  return (
    <div className="langarts__vocabulary">
      <div className="langarts__vocabulary__header">
        <h2>Vocabulary</h2>
        <div className="langarts__vocabulary__header-close">
          <RiCloseFill color="grey" size={35} onClick={() => setShowVocabulary(false)} />
        </div>
      </div>
      <div className="langarts__vocabulary__content">
        <ul>
        <p>{words}</p>
        </ul>
      </div>
    </div>
  );
};

export default Vocabulary;