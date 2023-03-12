import React, { useState, useEffect } from 'react';
import './vocabulary.css';
import { RiCloseFill, RiAddLine, RiDeleteBin6Line} from 'react-icons/ri';

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

    const handleWordDelete = (id) => {
      fetch(`/${language}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) =>  {
        if (res.status === 204) {
          const index = words.findIndex((word) => word.id === id);
          if (index !== -1) {
            const newWords = [...words];
            newWords.splice(index, 1);
            setWords(newWords);
          }
        } else {
          throw new Error('Failed to delete word');
        }
      })
      .catch((err) => console.error(err)); 
    }
     

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
    {words.map((word, index) => {
      const matchingWord = words2.find((w) => w.id === word.id);
      if (!matchingWord) {
        return null; // skip rendering word 
      }
      return (
        <li key={index}>
          <div className="word">
            <input type="text" value={word.word} onChange={(e) => handleWordUpdate(e.target.value, matchingWord.word, word.id)} />
          </div>
          <div className="dash">-</div>
          <div className="matching-word">
            <input type="text" value={matchingWord.word} onChange={(e) => handleWordUpdate(word.word, e.target.value, matchingWord.id)} />
          </div>
          <div className="deleteLine">
            <RiDeleteBin6Line color="grey" size={25} onClick={() => handleWordDelete(word.id)} />
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