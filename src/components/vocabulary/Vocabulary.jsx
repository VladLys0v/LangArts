import React, { useState, useEffect } from 'react';
import './vocabulary.css';
import { RiCloseFill} from 'react-icons/ri';

const Vocabulary = ({ showVocabulary, setShowVocabulary, language, language2 }) => {
  const [words, setWords] = useState([]);
  const [words2, setWords2] = useState([]);

  useEffect(() => {
    fetch(`/${language}`)
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error(err));
  }, [language]);

  useEffect(() => {
    fetch(`/${language2}`)
      .then((res) => res.json())
      .then((data) => setWords2(data))
      .catch((err) => console.error(err));
  }, [language2]);

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
          {words.map((word) => {
            const matchingWord = words2.find((w) => w.id === word.id);
            return (
              <li key={word.id}>
                {word.word} - {matchingWord.word}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Vocabulary;