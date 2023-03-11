import React, { useState, useEffect } from 'react';
import './vocabulary.css';
import { RiCloseFill, RiAddLine } from 'react-icons/ri';

const Vocabulary = ({ showVocabulary, setShowVocabulary, language, language2 }) => {
  const [words, setWords] = useState([]);
  const [words2, setWords2] = useState([]);
  const [displayInput, setDisplayInput] = useState(false);
  const [newWord, setNewWord] = useState('');

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

  const handleAddWord = () => {
    setDisplayInput(true);
  };

  const handleWordInputChange = (event) => {
    setNewWord(event.target.value);
  };

  const handleWordSubmit = () => {
    fetch(`/${language}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: newWord })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Success') {
          setWords([...words, { word: newWord, id: words.length + 1 }]);
          setDisplayInput(false);
          setNewWord('');
        }
      })
      .catch((err) => console.error(err));
}

const handleWordUpdate = (newWord, matchingWord, id) => {
  fetch(`/${language}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word: newWord })
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log('Response data:', data);
      if (data.message === 'Success') {
        setWords(
          words.map((w) => {
            if (w.id === id) {
              return { ...w, word: newWord };
            } else {
              return w;
            }
          })
        );
      }            
    })
    .catch((err) => console.error(err));

  fetch(`/${language2}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word: matchingWord })
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log('Response data:', data);
      if (data.message === 'Success') {
        setWords2(
          words2.map((w) => {
            if (w.id === id) {
              return { ...w, word: matchingWord };
            } else {
              return w;
            }
          })
        );
      }
    })
    .catch((error) => {
      console.log('Error updating word:', error);
    });
};



  if (!showVocabulary) {
    return null;
  }
// FIX: Warning: Encountered two children with the same key
//but ignore for now, as the error requires to change IDs on unique once, 
//my guess is the key is reading only the first digit out of 2digits id numbers
return (
  <div className="langarts__vocabulary">
    <div className="langarts__vocabulary__header">
      <h2>Vocabulary</h2>
      <div className="langarts__vocabulary__header-close">
        <RiCloseFill color="grey" size={35} onClick={() => setShowVocabulary(false)} />
      </div>
    </div>
    <div className="langarts__vocabulary__add">
      {!displayInput ? (
        <RiAddLine color="grey" size={35} onClick={handleAddWord} />
      ) : (
        <div>
          <input type="text" value={newWord} onChange={handleWordInputChange} />
          <button onClick={handleWordSubmit}>Approve</button>
        </div>
      )}
    </div>
    <div className="langarts__vocabulary__content section__padding">
      <ul>
        {words.map((word) => {
          const matchingWord = words2.find((w) => w.id === word.id);
          return (
            <li key={word.id}>
              <div className="word">
                <input type="text" value={word.word} onChange={(e) => handleWordUpdate(e.target.value, matchingWord.word, word.id)} />
              </div>
              <div className="dash">-</div>
              <div className="matching-word">
                <input type="text" value={matchingWord.word} onChange={(e) => handleWordUpdate(word.word, e.target.value, matchingWord.id)} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
};

export default Vocabulary;