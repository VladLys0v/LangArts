import React, { useState, useEffect, useCallback } from 'react';
import './wordsModal.css';
import { RiCloseFill, RiCheckboxCircleLine, RiMicLine } from 'react-icons/ri';
import axios from 'axios';


const WordsModal = ({ showWordsModal, setShowWordsModal, language, language2 }) => {
  
  const [countdown, setCountdown] = useState(3);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWords, setShowWords] = useState(false);

  const [userInput, setUserInput] = useState('');
  const [matchingWord, setMatchingWord] = useState('');

  const [showCorrectMessage, setShowCorrectMessage] = useState(false)
  
  const handleSpeechRecognition = useCallback(() => {
    
    // create a new SpeechRecognition object
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // SpeechRecognition API is supported
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      // rest of the code that uses recognition object
    } else {
      // SpeechRecognition API is not supported
      console.log('SpeechRecognition is not supported in this browser');
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    // add a 'result' event listener to the recognition object
    recognition.addEventListener('result', (event) => {
      const speechToText = event.results[0][0].transcript;
      setUserInput(speechToText);
    });
  
    // add an 'end' event listener to the recognition object
    recognition.addEventListener('end', recognition.start);
  
    // start the recognition process
    recognition.start();
  
    // return the cleanup function
    return () => {
      recognition.removeEventListener('result', (event) => {
        const speechToText = event.results[0][0].transcript;
        setUserInput(speechToText);
      });
      recognition.removeEventListener('end', recognition.start);
      recognition.abort();
    };
  }, []);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${language}`);
        const filteredWords = response.data.filter((wordObj) => wordObj.word.trim() !== ''); //doesn't display empty words
        setWords(filteredWords);
          }     
        catch (error) {
        console.error('Error fetching words: ' + error);
    }
  }; 
    const fetchMatchingWords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${language2}`);
        const matchingWords = response.data.filter((wordObj) => wordObj.word.trim() !== '');
        setMatchingWord(matchingWords[currentIndex]?.word || '');
      } catch (error) {
        console.error('Error fetching matching words: ' + error);
      }
    };
    fetchMatchingWords();

//START! DOES NOT APPEAR, NEEDS TO BE FIXED
    if (showWordsModal && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showWordsModal && countdown === 0) {
      setCountdown('Start!');
      fetchWords();
      fetchMatchingWords();
    } else if (!showWordsModal) {
      setCountdown(3);
      setShowWords(false);
      setCurrentIndex(0);
      setWords([]);
      setMatchingWord('');
    }
  }, [showWordsModal, countdown, language, currentIndex, language2]);

  const handleNextWord = useCallback(() => {
    if (currentIndex + 1 < words.length) {
      setCurrentIndex(currentIndex + 1);
      setMatchingWord(words[currentIndex + 1][language2]);
      setUserInput('');
    }
  }, [currentIndex, words, language2]);

  const handlePreviousWord = useCallback(() => {
  if (currentIndex - 1 >= 0) {
    setCurrentIndex(currentIndex - 1);
    setMatchingWord(words[currentIndex - 1][language2]);
    setUserInput('');
  }
}, [currentIndex, words, language2]);

  useEffect(() => {
    if (countdown === 'Start!') {
      const timer = setTimeout(() => {
        setShowWords(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCorrectMessage = useCallback((correct) => {
    setShowCorrectMessage(correct);
    if (correct) {
      const timer = setTimeout(() => {
        setShowCorrectMessage(false);
        setUserInput('');
        setCurrentIndex(currentIndex + 1);
        setMatchingWord(words[currentIndex + 1]?.[language2] || '');
      }, 1000);
      return () => clearTimeout(timer);
    }
  },[setCurrentIndex, setMatchingWord, words, currentIndex, language2]);

  const handleSubmitAnswer = useCallback(() => {
    if (userInput === matchingWord) {
      handleCorrectMessage(true);
      setUserInput('');
    } else {
      handleCorrectMessage(false);
      setUserInput('');
    }
  }, [userInput, matchingWord, handleCorrectMessage]);

  if (!showWordsModal) {
    return null;
  }

  return (
    <div className="langarts__wordsModal">
      <div className="langarts__wordsModal__header">
        <h2>Words Tab</h2>
        <div className="langarts__wordsModal__header-close">
          <RiCloseFill color="grey" size={35} onClick={() => setShowWordsModal(false)} />
        </div>
      </div>

      <div className="langarts__wordsModal__content">
        {countdown !== 'Start!' && (
          <div className="langarts__wordsModal__countdown">{countdown}</div>
        )}
        {showWords && words.length > 0 && (
          <div>
            <div className="langarts__wordsModal__word">{words[currentIndex].word}</div>
             {currentIndex > 0 && (
              <button onClick={handlePreviousWord}>Previous</button>
            )}
            {currentIndex < words.length - 1 && (
              <button onClick={handleNextWord}>Next</button>
            )}
            <RiMicLine color="grey" size={25} onClick= {handleSpeechRecognition} />
          </div>
        )}
      </div>
      <div className="langarts__wordsModal__userPart">
        <div className="userInput">
          <p>{matchingWord}</p>
          <input id="userInput" type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        </div>
        <div className="submitIcon">
          <RiCheckboxCircleLine color="grey" size={25} onClick={() => handleSubmitAnswer()} />
          {showCorrectMessage && (
          <div className="correctIcon">
            <RiCheckboxCircleLine color="green" size={45} />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default WordsModal;