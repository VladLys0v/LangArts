import React, { useState, useEffect } from 'react';
import './vocabulary.css';
import { RiCloseFill} from 'react-icons/ri';

const Vocabulary = ({ showVocabulary, setShowVocabulary }) => {
  const [words, setWords] = useState([]);


  useEffect(() => {
    fetch('/words')
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error(err));
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
      {words.map((word) => (
            <li key={word.id}>
            {word.word} - Polish word ID: {word.polish_word_id}
          </li>
    ))}
      </ul>
      </div>
    </div>
  );
};

export default Vocabulary;