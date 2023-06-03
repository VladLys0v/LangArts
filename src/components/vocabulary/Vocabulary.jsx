import React, { useState, useEffect } from 'react';
import './vocabulary.css';
import { createBrowserHistory } from 'history';
import { RiCloseFill, RiAddLine, RiDeleteBin6Line,  RiCheckboxCircleLine, RiCloseCircleLine, RiCloseLine, RiSettings4Line, RiFilter2Fill} from 'react-icons/ri';
import LangSwitch from'../../components/LangSwitch/LangSwitch.jsx'

const Vocabulary = ({
  showVocabulary,setShowVocabulary,language,language2,selectedValue1,setSelectedValue1,
  selectedValue2,setSelectedValue2,favoriteWords,setFavoriteWords}) => {
  const [words, setWords] = useState([]);
  const [words2, setWords2] = useState([]);
  const [displayInput, setDisplayInput] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = createBrowserHistory();
  const[toggleMenu, setToggleMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredWords = words.filter((word) => {
    const matchingWord = words2.find((w) => w.id === word.id);
    if (!matchingWord) {
      return false;
    }
    const wordContainsSearchInput = word.word.toLowerCase().includes(searchInput.toLowerCase());
    const matchingWordContainsSearchInput = matchingWord.word.toLowerCase().includes(searchInput.toLowerCase());
    return wordContainsSearchInput || matchingWordContainsSearchInput;
  });

  const handleSwap = () => {
    setSelectedValue1(selectedValue2);
    setSelectedValue2(selectedValue1);
  };

  useEffect(() => {
    if (showVocabulary) {
      // Disable scrolling for the body when the vocabulary is open
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling for the body when the vocabulary is closed
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showVocabulary]);

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
        setWords2([...words2, { word: '', id: words2.length + 1 }]);
        setDisplayInput(false);
        setNewWord('');
        setTimeout(() => {
          addTranslationWhereMissing();
        }, 3000);
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

const addTranslationWhereMissing = async () => {
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
        const wordId = words[index].id;
        const res = await fetch(`/${language2}/${wordId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word })
        });
        const resData = await res.json();
        if (resData.message === 'Success') {
          setWords([...words]);
        }
      }
    }
    setWords2([...words2]);
  } catch (error) {
    console.error(error);
  }
}

const addRandomWords = async (language) => {
  try {
    const languageCode = {
      "russian": "ru",
      "polish": "pl"
    };
    const languageCoded = languageCode[language];
    if (!languageCoded) {
      throw new Error(`Invalid language: ${language}`);
    }
    //https://random-word-api.herokuapp.com/word?number=10&lang=en
    //random api for english, spanish, italian, deutch
    //change the number for more words to be added
    const res = await fetch(`https://random-word-api.herokuapp.com/word?number=1&lang=en`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const wordsText = await res.text();
    const words = JSON.parse(wordsText);
    const translations = [];
    for (const word of words) {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|${languageCoded}`);
      const data = await response.json();
      console.log(data);
      if (data.responseData && data.responseData.translatedText) {
        const translatedWord = data.responseData.translatedText;
        translations.push(translatedWord);
      } else {
        console.log(`Skipping word "${word}" - response is not valid JSON`);
      }
    }
    const wordsToInsert = words.map((word, index) => {
      const translation = translations[index];
      return `${translation}`;
    });
    const res2 = await fetch(`/${language}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({word: wordsToInsert})
    });
    const resData = await res2.json();
    if (resData.message === 'Success') {
      console.log('Random words added successfully');
      setWords((prevWords) => [...prevWords, ...wordsToInsert]);
    }
  } catch (err) {
    console.error(err);
  }
};

const handleTabChange = (tab) => {
  setActiveTab(tab);
};

const populateDB = async () => {
  await addRandomWords(language);
}

  if (!showVocabulary) {
    return null;
  }

return (
  <div className="langarts__vocabulary-overlay">
  <div className="langarts__vocabulary">
  <div className="langarts__vocabulary__header">
  <div className="langarts__vocabulary__header-title">
    <h2>Vocabulary</h2>
    <div className="langarts__vocabulary__header-add">
      {!displayInput ? (
        <RiAddLine color="grey" size={35} onClick={handleAddWord} />
      ) : (
        <div>
          <input type="text" placeholder="Add new word" value={newWord} onChange={handleWordInputChange} />
          <RiCheckboxCircleLine color="grey" size={35} onClick={handleWordSubmit} />
          <RiCloseCircleLine color="grey" size={35} onClick= { ()=> setDisplayInput(false)} />
        </div>
      )}
    </div>
  </div>
  <div className="langarts__vocabulary__header-close">
    <RiCloseFill color="grey" onClick={() => handleClose()} />
  </div>
</div>
<div className="langarts__vocabulary__controls">
<div className="langarts__vocabulary__search">
 <input type="search" placeholder="Search" value={searchInput} onChange={handleSearch} />
</div>
<div className="langarts__vocabulary__content-menu">
        <RiFilter2Fill color="grey" size={30} />
      {toggleMenu 
          ? <RiCloseLine color="grey" size={30} onClick={() => setToggleMenu(false)}/>
          : <RiSettings4Line color="grey" size={30} onClick={() => setToggleMenu(true)}/>
          }
          {toggleMenu && (
        <ul>
          <li>
          <button className="addToTopic">Add to Topic</button>
          </li>
          <li>
          <button className="randomWords" onClick={populateDB}>Add Random Words</button>
          </li>
          <li>
          <button className="addToFavourite"> Add to favourite</button>
          </li>
          <li>
          <button className="changeReoccurrence">Change reoccurrence</button>
          </li>
        </ul>
        )}
      </div>
      </div>
    <div className="langarts__vocabulary__content">

    <div className="langarts__vocabulary__tabs">
    <div className="langarts__vocabulary__tab" onClick={() => handleTabChange('All')}>
      All
    </div>
    <div className="langarts__vocabulary__tab" onClick={() => handleTabChange('Favorite')}>
      Favorite
    </div>
  </div>
  {activeTab === 'All' && (
      <div className="langarts__vocabulary__content-table">
        <ul>
          {filteredWords.map((word, index) => {
              const matchingWord = words2.find((w) => w.id === word.id);
              if (!matchingWord) {
                return null; // skip rendering word
              }
            return (
              <li key={index}>
                
                <div className="word">
                  <input type="text" value={word.word} onChange={(e) => handleWordUpdate(e.target.value, matchingWord.word, word.id)} />
                </div>
            
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
  )}
   {activeTab === 'Favorite' && (
    <div className="langarts__vocabulary__content-favorite">
      <ul>
      {favoriteWords.map((word, index) => {
              const matchingWord = words2.find((w) => w.id === word.id);
              if (!matchingWord) {
                return null; // skip rendering word
              }
      return (
        <li key={index}>
          <div className="word">
            <input type="text" value={word.word} onChange={(e) => handleWordUpdate(e.target.value, word.word, word.id)} />
          </div>

          <div className="matching-word">
            <input type="text" value={matchingWord.word} onChange={(e) => handleWordUpdate(word.word, e.target.value, matchingWord.id)} />
          </div>

          <div className="deleteLine">
            <RiDeleteBin6Line color="grey" size={25} onClick={() => handleWordDelete(word.id)} />
          </div>
        </li>
        )
      })}
    </ul>
    </div>
  )}

</div>
<div className="langarts__vocabulary__content-LangSwitch">        
<LangSwitch
    selectedValue1={selectedValue1}
    setSelectedValue1={setSelectedValue1}
    selectedValue2={selectedValue2}
    setSelectedValue2={setSelectedValue2}
    onSwap={handleSwap}
/>         
</div> 
  </div>
  </div>
);
};

export default Vocabulary;