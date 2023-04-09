import React, { useState, useEffect } from 'react';
import './vocabulary.css';
import { createBrowserHistory } from 'history';
import { RiCloseFill, RiAddLine, RiDeleteBin6Line} from 'react-icons/ri';

const Vocabulary = ({ showVocabulary, setShowVocabulary, language, language2 }) => {
  const [words, setWords] = useState([]);
  const [words2, setWords2] = useState([]);
  const [displayInput, setDisplayInput] = useState(false);
  const [newWord, setNewWord] = useState('');
  const history = createBrowserHistory();

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

  const handleClose = () => {
    setShowVocabulary(false);
    setDisplayInput(false);
    history.push(`/`);
  };

  const handleAddWord = () => {
    setDisplayInput(true);
  };

  const handleWordInputChange = (event) => {
    setNewWord(event.target.value);
  };

  const handleWordSubmit = async () => {
    try {
      const res = await fetch(`/${language}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: newWord })
      });
      const data = await res.json();
      if (data.message === 'Success') {
        const newWordObj = { word: newWord, id: words.length + 1 };
        setWords([...words, newWordObj]);
        setWords2([...words2,{word:'', id: words2.length + 1}]);
        setDisplayInput(false);
        setNewWord('');
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleWordUpdate = (newWord, matchingWord, id) => {
    // check if newWord or matchingWord is empty and update state accordingly
    if (newWord === '' && matchingWord === '') {
      handleWordDelete(id);
      return;
    }
    fetch(`/${language}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: newWord })
    })
    .then((res) => res.json())
    .then((data) => {
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

  const handleWordDelete = async (id) => {
    try {
      const res = await fetch(`/${language}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.status === 204 || res.status === 200) {
        
        const newWords = words.filter((word) => word.id !== id);
        const newWords2 = words2.filter((word) => word.id !== id);
        setWords(newWords);
        setWords2(newWords2);
    }
  } catch (err) {
    console.error(err);
  }
};

const addWordsToDatabase = async () => {
  try {
    const languageCode = {
      "russian": "ru",
      "polish": "pl"
    }
    const languageCoded = languageCode[language];
    const language2Coded = languageCode[language2];
    const wordsToUpdate = [];
    for (const [index, word] of words.entries()) {
      if (words2[index].word === '') {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${word.word}&langpair=${languageCoded}|${language2Coded}`);
        const data = await response.json();
        console.log('Response data:', data.responseData);
        const newWord = data.responseData.translatedText;
        wordsToUpdate.push({ index, word: newWord });
      }
    }
    for (const wordToUpdate of wordsToUpdate) {
      const { index, word } = wordToUpdate;
      words2[index].word = word;
      if (!words.some(w => w.word === word)) {
        const res = await fetch(`/${language}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word })
        });
        const resData = await res.json();
        if (resData.message === 'Success') {
          const newWordObj = { word, id: words.length + 1 };
          setWords([...words, newWordObj]);
        }
      }
    }
    setWords2([...words2]);
  } catch (error) {
    console.error(error);
  }
}
     

  if (!showVocabulary) {
    return null;
  }

return (
  <div className="langarts__vocabulary">
    <div className="langarts__vocabulary__header">
      <h2>Vocabulary</h2>
      <div className="langarts__vocabulary__header-close">
        <RiCloseFill color="grey" size={35} onClick={() => handleClose()} />
      </div>
    </div>
    <div className="langarts__vocabulary__add">
      {!displayInput ? (
        <RiAddLine color="grey" size={35} onClick={handleAddWord} />
      ) : (
        <div>
          <input type="text" value={newWord} onChange={handleWordInputChange} />
          <button onClick={handleWordSubmit}>Approve</button>
          <button onClick={addWordsToDatabase}>Add new words</button>
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